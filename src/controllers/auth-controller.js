const createError = require("../utils/create-error");
const { checkPassword } = require("../services/bcrypt-service");
const { sign } = require("../services/token-service");

const authServices = require("../services/auth-service");

exports.login = async (req, res, next) => {
  try {
    const input = req.body;

    const user = await authServices.getUserByUsername(input.username);
    if (!user) {
      createError("invalid credential", 400);
    }

    const correctedPassword = await checkPassword(
      input.password,
      user.password
    );
    if (!correctedPassword) {
      createError("invalid credential", 400);
    }

    const accessToken = sign({ id: user.id, role: user.role });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
