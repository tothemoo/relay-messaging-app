require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js')

//routes
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');


//models & associations
const {user,message,chatRoom}=require('./models/associations.js');


const app = express();
const PORT = process.env.PORT || 8000

//middleware
app.use(cors({
    origin:process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)



app.get('/',(req,res)=>{
    res.send("Relay Api is running")
})

const startServer = async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database tables synchronized successfully");

        console.log("MySQL database connected successfully");
        
        app.listen(PORT,()=>{
            console.log(`server is running on port: ${PORT}`)
        })
    }
    catch(error){
        console.error("Unable to connect to the database:",error)
    }
}

startServer()