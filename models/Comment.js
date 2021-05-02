const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,

  comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // comment: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
