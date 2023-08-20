module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "room",
    {
      positionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      helpStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        // '0:no need help  1: need help'
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  room.associate = (models) => {
    room.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };

  return room;
};
