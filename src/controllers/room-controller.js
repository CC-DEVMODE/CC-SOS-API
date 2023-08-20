const roomServices = require("../services/room-services");

exports.getData = async (req, res, next) => {
  try {
    const data = await roomServices.getData();
    res.status(201).json({ result: data });
  } catch (error) {
    next(error);
  }
};

exports.enter = async (req, res, next) => {
  try {
    const { userId, positionId } = req.body;
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
    res.status(201).json({ result: "success" });
  } catch (err) {
    next(err);
  }
};

exports.createSOS = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await roomServices.createSOS(userId);
    res.status(201).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.cancelSOS = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await roomServices.createSOS(userId);
    res.status(201).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};
