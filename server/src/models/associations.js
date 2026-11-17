const User = require("./User");
const Message = require("./Message");
const ChatRoom = require("./ChatRoom");
const RoomMember = require("./RoomMember");

User.hasMany(Message, {
    foreignKey: "userId",
    as: "messages"
});

Message.belongsTo(User, {
    foreignKey: "userId",
    as: "sender"
});

Message.belongsTo(ChatRoom, {
    foreignKey: "chatRoomId",
    as: "chatRoom"
});

ChatRoom.hasMany(Message, {
    foreignKey: "chatRoomId",
    as: "messages"
});

User.belongsToMany(ChatRoom, {
    through: RoomMember,
    foreignKey: "userId",
    otherKey: "chatRoomId",
    as: "chatRooms"
});

ChatRoom.belongsToMany(User, {
    through: RoomMember,
    foreignKey: "chatRoomId",
    otherKey: "userId",
    as: "members"
});

module.exports = {
    User,
    Message,
    ChatRoom,
    RoomMember
};