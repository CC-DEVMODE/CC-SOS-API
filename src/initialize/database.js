const { sequelize, user, room } = require("../models");

const creteDB = async () => {
  await sequelize.sync({ force: true });
  await user.bulkCreate([
    {
      name: "Tor",
      gender: 1,
      learningStatus: 1,
    },
    {
      name: "Boom",
      gender: 2,
      learningStatus: 2,
    },
    {
      name: "Boong",
      gender: 1,
      learningStatus: 3,
    },
    {
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
