const roomServices = require("../services/room-services");

exports.checkin = async (req, res, next) => {
  try {
    const { userId, tableId } = req.body;
    await roomServices.checkin(userId, tableId);

    res.status(200).json(`${userId} check in at ${tableId}`);
  } catch (err) {
    next(err);
  }
};
