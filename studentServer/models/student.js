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
      lastName: { type: DataTypes.STRING, allowNull: false },
      rollNumber: { type: DataTypes.STRING, allowNull: false },
      grade: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      skillId: {type: DataTypes.BIGINT, allowNull: false}
    },
    {
      tableName: "student",
      timestamps: true,
    }
  );
  return Student;
};
