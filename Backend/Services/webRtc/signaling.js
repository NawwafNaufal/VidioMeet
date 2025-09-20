// Backend/Services/SignalingService.js - FIXED VERSION
module.exports = (io) => {
    const rooms = {}; // Track rooms and their participants
  
    io.on("connection", (socket) => {
      console.log("✅ User connected:", socket.id);
  
      // join room
      socket.on("join", (roomId) => {
        socket.join(roomId);
  
        // Initialize room if doesn't exist
        if (!rooms[roomId]) {
          rooms[roomId] = new Set();
        }
  
        // Get existing peers in the room
        const existingPeers = Array.from(rooms[roomId]);
        
        // Send existing peers to the new user
        socket.emit("existing-peers", existingPeers);
  
        // Notify existing users about new peer
        socket.to(roomId).emit("new-peer", socket.id);
  
        // Add new peer to room
        rooms[roomId].add(socket.id);
  
        console.log(`${socket.id} joined ${roomId}. Room has ${rooms[roomId].size} participants`);
      });
  
      // forward SDP/ICE
      socket.on("signal", (data) => {
        io.to(data.to).emit("signal", {
          from: socket.id,
          sdp: data.sdp,
          candidate: data.candidate
        });
      });
  
      // handle disconnect
      socket.on("disconnecting", () => {
        const socketRooms = [...socket.rooms].filter(r => r !== socket.id);
        
        socketRooms.forEach(roomId => {
          // Remove from room tracking
          if (rooms[roomId]) {
            rooms[roomId].delete(socket.id);
            
            // Clean up empty rooms
            if (rooms[roomId].size === 0) {
              delete rooms[roomId];
            }
          }
          
          // Notify others in the room
          socket.to(roomId).emit("peer-disconnected", socket.id);
          console.log(`${socket.id} left ${roomId}. Room has ${rooms[roomId]?.size || 0} participants`);
        });
      });
  
      socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
      });
    });
  };