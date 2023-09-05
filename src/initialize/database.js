const { sequelize, user, room } = require("../models");
const { hash } = require("../services/bcrypt-service");

const creteDB = async () => {
  const hasedPassword = await hash("123456");
  await sequelize.sync({ force: true });
  await user.bulkCreate([
    {
      username: "Tor",
      password: hasedPassword,
      name: "Tor",
      gender: 1,
      learningStatus: 1,
    },
    {
      username: "Boom",
      password: hasedPassword,
      name: "Boom",
      gender: 2,
      learningStatus: 2,
    },
    {
      username: "Boong",
      password: hasedPassword,
      name: "Boong",
      gender: 1,
      learningStatus: 3,
    },
    {
      username: "Snook",
      password: hasedPassword,
      name: "Snook",
      gender: 2,
      learningStatus: 3,
    },
  ]);

  const roomPosition = [];
  const maxPosition = 50;

  for (let i = 1; i <= maxPosition; i++) {
    roomPosition.push({ positionId: i });
  }

  await room.bulkCreate(roomPosition);
};

try {
  creteDB();
} catch (error) {
  console.log(error);
}
