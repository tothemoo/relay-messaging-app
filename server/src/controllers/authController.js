const {User} = require("../models/associations")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res)=>{
    try{
        const {username, email, password}=req.body;

        if(username === undefined || email === undefined || password === undefined){
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //new user creation

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:newUser.id,
                username:newUser.username,
                email:newUser.email
            }
        })
    }

    catch(error){
        console.error("User creation failed",error)
    }
}

const loginUser = async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(email===undefined || password===undefined){
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){{
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
            }
        }

        //generate token
        const token =jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})

        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
        })
    }
    catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}


module.exports = {registerUser, loginUser}