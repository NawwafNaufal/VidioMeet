const express = require("express");
const router = express.Router();
const MeetController = require("../../Controllers/VidioBroker/room");
const validateJwt = require("../../Middleware/Auth/jwtValidate")

router.get("/health",validateJwt, (req, res) => {
  res.json({ status: "ok", message: "VideoChat API running" });
});

router.post("/room",validateJwt,MeetController.createRoom);
router.get("/room/:id",validateJwt,MeetController.getRoom);

module.exports = router;
