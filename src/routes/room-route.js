const express = require("express");

const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/", roomController.getData);
router.post("/enter", roomController.enter);
router.post("/sos/:userId", roomController.createSOS);
router.delete("/sos/:userId", roomController.cancelSOS);
router.post("/remark/:userId", roomController.creteRemark);

module.exports = router;
