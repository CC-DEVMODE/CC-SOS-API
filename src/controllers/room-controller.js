const roomServices = require("../services/room-services");

exports.getData = async (req, res, next) => {
  try {
    const data = await roomServices.getData();
    res.status(201).json({ result: data });
  } catch (error) {
    next(error);
  }
};

exports.studentEnter = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const { positionId } = req.body;
    const userId = req.user.id;
    const checkPosition = await roomServices.checkPosition(positionId);
    if (!checkPosition) {
      res.status(404).json({ result: "The position is none" });
      return;
    }
    if (checkPosition.userId) {
      if (checkPosition.userId == userId) {
        res.status(200).json({
          result: "You are using the position.",
        });
      } else {
        res.status(403).json({
          result: `The position is used by ${checkPosition.user.name} `,
        });
      }
      return;
    }
    await roomServices.leavePosition(userId);
    await roomServices.getPosition(userId, positionId);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json({ result: "success" });
  } catch (err) {
    next(err);
  }
};

exports.taEnter = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const userId = req.user.id;
    const currentRoom = await roomServices.getData();
    const lastId = currentRoom[currentRoom.length - 1].positionId;
    await roomServices.createPosition(userId, lastId + 1);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json("success");
  } catch (err) {
    next(err);
  }
};

exports.studentLogOut = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const userId = req.user.id;
    await roomServices.leavePosition(userId);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json("success");
  } catch (err) {
    next(err);
  }
};

exports.taLogOut = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const userId = req.user.id;
    await roomServices.taLogOut(userId);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json("success");
  } catch (err) {
    next(err);
  }
};

exports.createSOS = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const { userId } = req.params;
    await roomServices.createSOS(userId);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.cancelSOS = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const { userId } = req.params;
    await roomServices.cancelSOS(userId);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.creteRemark = async (req, res, next) => {
  try {
    const io = req.app.get("socketio");
    const { userId } = req.params;
    const { content } = req.body;
    await roomServices.createRemark(userId, content);
    const data = await roomServices.getData();
    io.emit("toWeb", { result: data });
    res.status(201).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getRemark = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const rs = await roomServices.getRemark(userId);
    res.status(201).json(rs);
  } catch (error) {
    next(error);
  }
};
