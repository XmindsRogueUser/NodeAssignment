module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define(
      "teacher",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        employeeNumber: { type: DataTypes.STRING, allowNull: false },
        subject: { type: DataTypes.STRING },
        age: { type: DataTypes.INTEGER },
      },
      {
        tableName: "teacher",
        timestamps: true,
      }
    );
    return Teacher;
  };
  