module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "skill",
    {
      skillId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      skillName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "skill",
      timestamps: false,
    }
  );
  return Skill;
};
