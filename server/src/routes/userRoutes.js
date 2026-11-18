const express = require("express");

const router = express.Router();

const {protect}=require("../middleware/authMiddleware.js")
const{getAllUsers, getProfile}=require("../controllers/userController.js")

router.get("/",getAllUsers)
router.get("/userprofile",protect,getProfile)

module.exports = router