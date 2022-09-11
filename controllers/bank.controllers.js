
const bankService =require('../services/bank.services')


exports.transfer= (req,res,next)=>{
    console.log('transfer')
    bankService.transfers(req,(error,result)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message:result.message,
            status:result.status
        }); 
    }) 

}
exports.checkblance=(req,res,next)=>{
    console.log("check balance")
    bankService.checkblance(req,(error,result)=>{
        if(error){
            return next(error);
        }
        else{
            return res.status(200).send({
                message:result.message,
                status:result.status,
                data:result.row
            })
        }
    })

} 
exports.statement=(req,res,next)=>{
    console.log("check statement")
    bankService.statement(req,(error,result)=>{
        if(error){
            return next(error);
        }
        else{
            return res.status(200).send({
                message:result.message,
                status:result.status,
                data:result.row
            })
        }
    })

}
exports.addpayer=(req,res,next)=>{
    console.log("addpayer")
    bankService.addpayer(req,(error,result)=>{
        if(error){
            return next(error);
        }
        else{
            return res.status(200).send({
                message:result.message,
                status:result.status,
            })
        }
    })

}
exports.viewpayer=(req,res,next)=>{
    console.log("view payer")
    bankService.viewpayer(req,(error,result)=>{
        if(error){
            return next(error);
        }
        else{
            return res.status(200).send({
                message:result.message,
                status:result.status,
                data:result.row
            })
        }
    })

}