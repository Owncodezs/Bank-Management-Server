const express =require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors');
const bodyparser=require('body-parser')
const methodoverride=require('method-override')
const errors =require('./middlewares/errors')
require('./config/config')
const pool=require('./database/dbcon')
const auth = require("./middlewares/auth");
//
const app=express()
//mysql
pool.getConnection((err, result) => {
    if (err) console.log(err.message)
    
    else console.log('sucess')
})
//use


app.use(cors())
app.use(methodoverride('_method'))  
// use body-parser set json
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cookieParser()); 
app.use("/auth",require("./routes/authrouter"))
app.use("/profil",auth.verifyToken,require("./routes/profilrouter"))
app.use(errors.errorHandler);

const port=process.env.PORT ||4000;
 
app.listen( port ,()=>console.log(`server is running on port ${port}`));

