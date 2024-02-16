module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        "company",
        {
            companyId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            companyName: { type: DataTypes.STRING, allowNull: false },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "ACTIVE",
            },
        },
        {
            tableName: "company",
            timestamps: true,
        }
    );
    return Company;
};
