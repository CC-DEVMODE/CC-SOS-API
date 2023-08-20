const express = require("express");

const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/", roomController.getData);
router.post("/enter", roomController.enter);
router.post("/sos", roomController.createSOS);
router.delete("/sos", roomController.cancelSOS);

module.exports = router;
