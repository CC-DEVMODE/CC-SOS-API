const bcrypt = require("bcryptjs");

exports.hash = (password) => bcrypt.hash(password, 2);

exports.checkPassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);
