const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      post_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
