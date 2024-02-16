module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
        "profile",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            studentId: { type: DataTypes.BIGINT, allowNull: false },
            profileName: { type: DataTypes.STRING, allowNull: false },
            bio: { type: DataTypes.STRING, allowNull: false },
            profileImage: { type: DataTypes.STRING },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "ACTIVE"
            },
        },
        {
            tableName: "profile",
            timestamps: false,
        }
    );
    return Profile;
};
