const jwt =require("jsonwebtoken")

function authenticaticateToken(req,res,next){
    const authHeader =req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token ==null) return res.sendStatus(401);

    jwt.verify(token,"Snipped_SceretKEY",(err,user)=>{
        if(err) return res.sendStatus(403);
        next();
    });
}
//user_acno
function generteAccessToken(username){
    return jwt.sign({user_acno:username},"Snipped_SceretKEY",{
        expiresIn :'1h',
    })
}

function verifyToken(req, res, next){
 
  const token =
    req.body.token || req.cookies["token"] || req.headers["token"]  ;

  if (!token) {
    return res.status(403).send("Please login");
  } 
  try { 
    const decoded = jwt.verify(token,"Snipped_SceretKEY");
    console.log('verify',decoded,'user',req.user)
    req.user_acno = decoded.user_acno;
    console.log('user',req.user_acno)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  console.log('verified')
  return next(); 
};
function verifiedSession(req,res){
  const token = req.body["token"] ;
    // req.body.token || req.cookies["token"] || req.headers["token"]  ;
  console.log('yu',token) 
  if (!token) { 
    return res.status(200).send({message:"Please login",status:false});
  }
  try {
    const decoded = jwt.verify(token,"Snipped_SceretKEY");
    return res.status(200).send({message:` welcon back ${decoded.user_acno}` ,status:true})
  } catch (err) {
    return res.status(200).send({message:"Invalid Token",status:false});
  }
}
module.exports={authenticaticateToken,generteAccessToken,verifyToken,verifiedSession}