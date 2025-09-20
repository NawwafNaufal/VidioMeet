const logger = require("../../log/Winston");
const Room = require("../../Models/room");

module.exports = (io) => {
io.on("connection", (socket) => {
    socket.userData = {
        id: socket.id,
        name: `Guest-${socket.id.substring(0, 5)}`,
        email: `guest_${socket.id}@vidiomeet.dev`
    };

    const user = socket.userData;
    logger.info(`Video chat user connected: ${socket.id} (${user.email})`);

    socket.on("join", async (roomId) => {
        try {
        socket.join(roomId);

        await Room.findOneAndUpdate(
        { roomId },
        {
            $push: {
            participants: {
                socketId: socket.id,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    },
                },
            },
        },
        { upsert: true, new: true }
        );

        const roomData = await Room.findOne({ roomId });
        const existingPeers = roomData.participants
            .filter((p) => p.socketId !== socket.id)
            .map((p) => p.socketId);

        socket.emit("existing-peers", existingPeers);
        socket.to(roomId).emit("new-peer", socket.id);

        logger.info(
            `${user.name} (${socket.id}) joined room ${roomId}. Total: ${roomData.participants.length}`
        );
        } catch (err) {
        logger.error("Join room error:", err);
        socket.emit("error", { message: "Could not join room" });
        }
    });

    socket.on("signal", (data) => {
    io.to(data.to).emit("signal", {
        from: socket.id,
        sdp: data.sdp,
        candidate: data.candidate,
        });
    });

    socket.on("disconnecting", async () => {
        const rooms = [...socket.rooms].filter((r) => r !== socket.id);

    for (const roomId of rooms) {
        await Room.findOneAndUpdate(
        { roomId },
        { $pull: { participants: { socketId: socket.id } } }
        );

        socket.to(roomId).emit("peer-disconnected", socket.id);

        const roomData = await Room.findOne({ roomId });
        logger.info(
            `${user.name} left ${roomId}. Remaining: ${roomData?.participants.length || 0}`
            );
        }
    });

    socket.on("disconnect", () => {
        logger.info(`Video chat user disconnected: ${socket.id}`);
        });
    });
};
