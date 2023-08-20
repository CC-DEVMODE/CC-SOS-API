const { room, user, remark } = require("../models");

exports.getData = () =>
  room.findAll({
    include: {
      model: user,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: remark,
      },
    },
  });

exports.checkPosition = (positionId) =>
  room.findOne({
    where: {
      positionId,
    },
    include: {
      model: user,
      attributes: ["id", "name"],
    },
  });

exports.getPosition = (userId, positionId) =>
  room.update(
    { userId },
    {
      where: {
        positionId,
      },
    }
  );

exports.leavePosition = (userId) =>
  room.update(
    { userId: null },
    {
      where: {
        userId,
      },
    }
  );

exports.createSOS = (userId) =>
  room.update({ helpStatus: 1 }, { where: { userId } });

exports.cancelSOS = (userId) =>
  room.update({ helpStatus: 0 }, { where: { userId } });

exports.createRemark = (userId, content) =>
  remark.create({
    userId,
    content,
  });
