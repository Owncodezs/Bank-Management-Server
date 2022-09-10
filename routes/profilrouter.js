const bankController =require('../controllers/bank.controllers')
const auth = require("../middlewares/auth");
const express =require('express');
const router=express.Router();

router.post("/transfer",bankController.transfer)
router.post("/checkblance",bankController.checkblance)
router.post("/statement",bankController.statement)
router.post("/addpayer",bankController.addpayer)
router.post("/viewpayer",bankController.viewpayer)
module.exports=router;
   