module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employee",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      designation: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      companyId: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
      tableName: "employee",
      timestamps: true,
    }
  );
  return Employee;
};
