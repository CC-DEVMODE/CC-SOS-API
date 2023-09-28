const { room, user, remark } = require("../models");
const { Op } = require("sequelize");

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

exports.taLogOut = (userId) =>
  room.destroy({
    where: {
      userId,
      positionId: { [Op.gt]: 50 },
    },
  });

exports.createPosition = (userId, positionId) =>
  room.create({ positionId, userId });

exports.createSOS = (userId) =>
  room.update({ helpStatus: 1 }, { where: { userId } });

exports.cancelSOS = (userId) =>
  room.update({ helpStatus: 0 }, { where: { userId } });

exports.createRemark = (userId, content) =>
  remark.create({
    userId,
    content,
  });

exports.getRemark = (userId) =>
  remark.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
