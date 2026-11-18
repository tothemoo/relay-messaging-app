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

const getProfile =async(req,res)=>{
    try{
        const user = await User.findByPk(req.user.id,{
            attributes:["id","username","email"]
        })

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        console.error("Get profile error:", error);

        res.status(500).json({
            success:false,
            message:"Failed to fetch profile"
        })
    }
}

module.exports = { getAllUsers, getProfile };