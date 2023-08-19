const { user } = require("../models");

exports.checkin = (userId, tableId) =>
  user.update(
    { tableId },
    {
      where: {
        id: userId,
      },
    }
  );
