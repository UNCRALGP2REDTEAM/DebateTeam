module.exports = function (sequelize, DataTypes) {
    var Page = sequelize.define("Page", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1]}
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {len: [1]}
        },
        side_1: DataTypes.STRING,
        side_2: DataTypes.STRING,
    });
    Page.associate = function (models) {
        Page.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };
    Page.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Page.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Page;
};