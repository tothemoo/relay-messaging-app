const { User } = require("../models/associations");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "email"]
        });

        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};

module.exports = { getAllUsers };