const router=require("express").Router();
const verify=require('../routes/verifyToken');

router.get('/',verify,(req,res)=>{
    res.json({
        post:{
            title:" Token verifyied",
            description:"Token here......."
        }
    })
})

module.exports=router;