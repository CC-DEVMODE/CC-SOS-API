const express = require("express");

const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/", roomController.getData);
router.post("/student/enter", roomController.studentEnter);
router.post("/ta/enter", roomController.taEnter);
router.delete("/ta/logout", roomController.taLogOut);
router.delete("/student/logout", roomController.studentLogOut);
router.post("/sos/:userId", roomController.createSOS);
router.delete("/sos/:userId", roomController.cancelSOS);
router.post("/remark/:userId", roomController.creteRemark);
router.get("/remark/:userId", roomController.getRemark);

module.exports = router;
