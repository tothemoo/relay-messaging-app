const {DataTypes}=require('sequelize');

const sequelize = require('../config/database.js');

const message = sequelize.define('Message',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = message