const pool=require('../database/dbcon')
function execute (sql,result){
    result.query(sql, (errs, rows, fields) => {
        if (errs) this.callback(errs); 
        })
}
 
async function transfers(req,callback){
    const {from_ac,to_ac,amount} =req.body;
    pool.getConnection((err, result) => {
        if (err) callback(err.message)
        else {
            var sql = `SELECT * FROM account WHERE ac_no=${from_ac}`;
            result.query(sql, (err, row, field) => {
                if (err) callback(err);
                if(row.length != 0){
                    if(row[0]['balance']>=amount){
                        // from (-)
                        row[0]['balance']-amount;
                        execute (`UPDATE account SET balance=${row[0]['balance']-amount} WHERE ac_no=${from_ac}`,result);
                        execute (`INSERT INTO statement (ac_no,credit,balance,particulars)VALUES(${from_ac},${amount},${row[0]['balance']-amount},'NIFTY out' )`,result)
                        var sql = `SELECT * FROM account WHERE ac_no=${to_ac}`;
                        result.query(sql, (errs, rows, fields) => {
                            if (errs) callback(err);
                            else if(rows.length != 0){
                                rows[0]['balance']+amount;
                                console.log('amount is transfer')
                                execute (`UPDATE account SET balance=${rows[0]['balance']+amount} WHERE ac_no=${to_ac}`,result);
                                execute (`INSERT INTO statement (ac_no,debit,balance,particulars)VALUES(${to_ac},${amount},${rows[0]['balance']+amount},'NIFTY in' )`,result)
                                return callback(null,{message:"amount is transfer",status:true})
                            }})

                    }
                    else{
                        return callback(null,{message:"insufficient balance",status:false})
                    }
                }
                else
                return callback(null,{message:"no accound found",status:false})
            })  
            
        }
    }) 
}
async function checkblance(req,callback){
    const user_acno =req.user_acno;
    pool.getConnection((err,result)=>{
        if (err) callback(err)
        else{
            var sql = `SELECT * FROM account NATURAL JOIN cif WHERE ac_no=${user_acno}`;
            result.query(sql, (err, row, field) => {
                if (err) callback(err);
                console.log(row[0])
                return callback(null,{message:"sucess",status:true,row })

            });
        }
    })
}
async function statement(req,callback){
    const user_acno =req.user_acno;
    pool.getConnection((err,result)=>{
        if (err) callback(err)
        else{
            var sql = `SELECT * FROM statement WHERE ac_no=${user_acno}`;
            result.query(sql, (err, row, field) => {
                if (err) callback(err);
                // console.log('hi',row)
                return callback(null,{message:"sucess",status:true,row })

            });
        }
    })
}
async function addpayer(req,callback){
    const {payer_name,payer_acno}=req.body;
    const user_acno =req.user_acno;
    console.log('user_acno',user_acno)
    pool.getConnection((err,result)=>{
        if (err) callback(err)
        else{
            console.log(user_acno,payer_name,payer_acno)
            var sql = `INSERT INTO payer (ac_no,payer_name,payer_acno) VALUES( ${user_acno},'${payer_name}',${payer_acno})`;
            result.query(sql, (err, row, field) => {
                if (err) callback(err);
                return callback(null,{message:"sucess",status:true})
            });
        }
    })
}
async function viewpayer(req,callback){
    const user_acno =req.user_acno;
    console.log('hi',user_acno)
    pool.getConnection((err,result)=>{
        if (err) callback(err)
        else{
            var sql = `SELECT payer_acno,payer_name FROM payer WHERE ac_no=${user_acno}`;
            result.query(sql, (err, row, field) => {
                if (err) callback(err);
                // console.log(row)
                return callback(null,{message:"sucess",status:true,row })

            });
        }
    })
}
module.exports={
    transfers,
    checkblance,
    statement,
    addpayer,
    viewpayer
}