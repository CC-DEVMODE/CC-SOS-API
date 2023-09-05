module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
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
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        // '0: undefine 1: student 2:TA'
        allowNull: false,
        validator: {
          notEmpty: true,
        },
      },
      learningStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        // '0:inactive 1: red 2:yellow 3:green'
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      aboutMe: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.room, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
    user.hasMany(models.remark, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
    user.hasMany(models.remark, {
      foreignKey: {
        name: "recorderId",
      },
      onDelete: "RESTRICT",
    });
  };

  return user;
};
