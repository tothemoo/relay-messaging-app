const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RoomMember = sequelize.define(
  "RoomMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "member"
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "chatRoomId"]
      }
    ]
  }
);

module.exports = RoomMember;