module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        // '0:undefined 1:male 2:female'
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        // '0:inactive 1: red 2:yellow 3:green'
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tableId:{
        type: DataTypes.INTEGER,
      }
    },
    {
      underscored: true,
    }
  );

  return user;
};
