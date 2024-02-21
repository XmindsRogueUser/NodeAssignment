module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: true },
      rollNumber: { type: DataTypes.STRING, allowNull: false },
      grade: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      skillId: { type: DataTypes.BIGINT, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: "student",
      timestamps: true,
    }
  );
  return Student;
};
