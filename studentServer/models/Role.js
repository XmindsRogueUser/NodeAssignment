module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );
  return Role;
};
