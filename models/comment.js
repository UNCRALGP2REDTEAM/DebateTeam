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
        parentID: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    });

    Comment.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.Page, {
            foreignKey: {
                allowNull: false
            }
        });

    };
    Comment.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
};
