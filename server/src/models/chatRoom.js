const {DataTypes}=require('sequelize');

const sequelize = require('../config/database.js');

const chatRoom = sequelize.define('ChatRoom',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

module.exports = chatRoom