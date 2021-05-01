const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}


Comment.init(
   

        {

          comments: {
            type: DataTypes.STRING,
            allowNull: false
          },
          post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: {
            type: DataTypes.STRING,
            allowNull: false
          },
          
            
          
        },



      
    

    

    {
      sequelize
    }
  );
  
  module.exports = Comment;
