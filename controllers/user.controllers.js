const bcryptjs=require('bcryptjs')
const userService =require('../services/users.services')
const dayjs = require("dayjs");

exports.register= (req,res,next)=>{
    console.log('register')
    const {password} =req.body;
    const salt =bcryptjs.genSaltSync(10);
    console.log('pass',bcryptjs.hashSync(password,salt))
    req.body.password=bcryptjs.hashSync(password,salt)
    userService.register(req,(error,result)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:"Sucess",
            data:result
        });
    }) 
}
 

exports.login= (req,res,next)=>{
    console.log('login')
    const {cif_no,ac_no,password} =req.body;
    console.log(cif_no,ac_no,password)
      userService.login({cif_no,ac_no,password},(error,result)=>{
        if(error){
            return next(error); 
        }
        console. log('token',result) 
        res.cookie('token',result.token, {
            secure: false,
            httpOnly: true,
            expires: dayjs().add(1, "days").toDate(),
          });
        return res.status(200).send({
            message:result.message,
            token:result.token,
            status:result.status,
            ac_no:result.ac_no

        });
    })
}
exports.logout=(req,res,next)=>{
    console.log('logout')
    res.clearCookie("token")
    return res.status(200).send({
        message:'logout sucess ',
        status:true
    });

}
exports.userProfil=(req,res,next)=>{
    console.log('userprofil')
    return res.status(200).json({message:"Authorized User!"})
}
