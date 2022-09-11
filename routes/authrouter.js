const userController =require('../controllers/user.controllers')
const auth = require("../middlewares/auth");
const express =require('express');
const router=express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/logout",auth.verifyToken,userController.logout);
router.post("/check",auth.verifiedSession);

module.exports=router;
  