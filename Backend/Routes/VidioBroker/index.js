const express = require("express");
const router = express.Router();
const MeetController = require("../../Controllers/VidioBroker/mett");

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "VideoChat API running" });
});

// Room management
router.post("/room", MeetController.createRoom);
router.get("/room/:id", MeetController.getRoom);

module.exports = router;
