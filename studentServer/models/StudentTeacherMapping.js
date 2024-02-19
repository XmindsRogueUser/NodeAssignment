module.exports = (sequelize, DataTypes) => {
  const StudentTeacherMapping = sequelize.define(
    "studentTeacherMapping",
    {
      studentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "student_teacher_mapping",
      timestamps: true,
    }
  );
  return StudentTeacherMapping;
};
