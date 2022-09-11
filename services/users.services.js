const bcrypt =require('bcryptjs')
const auth = require("../middlewares/auth");
const pool=require('../database/dbcon')
// const moment = require('moment');
// var gettime = function () {
//     return moment().format("YYYY-MM-DD HH:mm:00")
// };

async function login({cif_no,ac_no,password},callback){
    // if(ac_n0)
    pool.getConnection((err, result) => {
        if (err) callback(err.message)
        else {
            var sql = `SELECT * FROM login WHERE ac_no=${ac_no}`;
            result.query(sql, (err, user, fields) => {
                if (err) callback(err)
                // console.log(Object.keys(user).length)
                if(Object.keys(user).length === 1){
                    if(cif_no===user[0]['cif_id']){
                        if(bcrypt.compareSync(password,user[0]['password'])){
                            var sql = `UPDATE login SET data=1 WHERE ac_no=${ac_no}`;
                            result.query(sql, (err, user, fields) => {
                                if (err) console.log(err)
                            });
                            const token = auth.generteAccessToken(ac_no);
                            console.log("key",token)
                            return callback(null,{
                                message:'sucess',
                                token,
                                status:true,
                                ac_no:ac_no
                            });
                 
                        }
                        else{   
                            return callback(null,{ 
                                message:"invalid passwoed!!!",
                                status:false
                            })
                        }

                    }
                    else{   
                        return callback(null,{ 
                            message:"check cif!!!",
                            status:false
                        })
                    }
                    
                }
                else{
                    return callback(null,{ 
                        message:"invalid user!!",
                        status:false
                    })
                }
                  
            })  
        }
    })
}
async function register(req,callback){
    const {cif_no,ac_no,password} =req.body;
    if(cif_no===undefined){
        return callback({message:"invalid user requst"})
    }

    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            // ${cif_id},${ac_no},'${password}'
            var sql = `INSERT INTO login(cif_id,ac_no,password) VALUES (${cif_no},${ac_no},'${password}')`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                console.log("1 record inserted");  
                return callback(null,fields)
            }) 
        }
    })
    
}

module.exports={
    login,
    register
}