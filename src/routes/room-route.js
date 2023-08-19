const express = require("express");

const roomController = require("../controllers/room-controller");

const router = express.Router();

router.post("/checkin", roomController.checkin);

module.exports = router;
