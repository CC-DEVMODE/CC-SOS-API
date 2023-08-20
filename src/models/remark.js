module.exports = (sequelize, DataTypes) => {
  const remark = sequelize.define(
    "remark",
    {
      content: {
        type: DataTypes.STRING,
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

  remark.associate = (models) => {
    remark.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };

  return remark;
};
