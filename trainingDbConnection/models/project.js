module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        "project",
        {
            projectId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            projectName: { type: DataTypes.STRING, allowNull: false }
        },
        {
            tableName: "project",
            timestamps: true,
        }
    );
    return Project;
};