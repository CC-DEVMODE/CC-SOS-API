const { sequelize, user } = require("../models");

const creteDB = async () => {
  await sequelize.sync({ force: true });
  await user.bulkCreate([
    {
      name: "Tor",
      gender: 1,
      status: 1,
    },
    {
      name: "Boom",
      gender: 2,
      status: 2,
    },
    {
      name: "Boong",
      gender: 1,
      status: 3,
    },
    {
      name: "Snook",
      gender: 2,
      status: 3,
    },
  ]);
};

try {
  creteDB();
} catch (error) {
  console.log(error);
}
