const logger = require("../../log/Winston")

module.exports = (io) => {
    const rooms = {}; 
    const socketRooms = {}; 

io.on("connection", (socket) => {
    console.log("Video chat user connected:", socket.id);

    socket.on("join", (roomId) => {
    socket.join(roomId);

    if (!socketRooms[roomId]) {
        socketRooms[roomId] = new Set();
    }

    const existingPeers = Array.from(socketRooms[roomId]);
    
    socket.emit("existing-peers", existingPeers);

    socket.to(roomId).emit("new-peer", socket.id);

    socketRooms[roomId].add(socket.id);

    logger.info(`${socket.id} joined ${roomId}. Room has ${socketRooms[roomId].size} participants`);
});

    socket.on("signal", (data) => {
        io.to(data.to).emit("signal", {
            from: socket.id,
            sdp: data.sdp,
            candidate: data.candidate
    });
});

    socket.on("disconnecting", () => {
        const userRooms = [...socket.rooms].filter(r => r !== socket.id);
    
    userRooms.forEach(roomId => {
    if (socketRooms[roomId]) {
        socketRooms[roomId].delete(socket.id);
        
        if (socketRooms[roomId].size === 0) {
            delete socketRooms[roomId];
        }
    }

    socket.to(roomId).emit("peer-disconnected", socket.id);
        logger.info(`${socket.id} left ${roomId}. Room has ${socketRooms[roomId]?.size || 0} participants`);
    });
});

socket.on("disconnect", () => {
    logger.info("Video chat user disconnected:", socket.id);
    });
});
};