const { v4: uuidv4 } = require("uuid");

// contoh room disimpan in-memory
const rooms = {};

exports.createRoom = (req, res, next) => {
  try {
    const roomId = uuidv4();
    rooms[roomId] = { id: roomId, participants: [] };
    res.json({ roomId });
  } catch (err) {
    next(err);
  }
};

exports.getRoom = (req, res, next) => {
  try {
    const room = rooms[req.params.id];
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    next(err);
  }
};
