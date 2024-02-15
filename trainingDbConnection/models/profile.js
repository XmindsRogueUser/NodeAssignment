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
        employeeId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        profileName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        rollNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profileImage: {
          type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ACTIVE'
          },
      },
      {
        tableName: "profile",
        timestamps: true,
      }
    );
    return Profile;
  };
  