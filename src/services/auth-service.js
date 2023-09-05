const { user } = require("../models");

exports.getUserByUsername = (username) =>
  user.findOne({
    where: { username },
  });

exports.getUserById = (id) =>
  user.findOne({ where: { id }, attributes: { exclude: ["password"] } });
