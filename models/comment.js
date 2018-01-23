module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        side: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1,2]]
            }
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        reportFlg: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
    Comment.hasOne(Comment, { as: 'Parent' });

    Comment.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.User, {
            as: 'UserId',
            foreignKey: {
                allowNull: false
            }
        });

    };
    Comment.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.Page, {
            as: 'Page',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
};
