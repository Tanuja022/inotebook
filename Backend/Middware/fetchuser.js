var jwt = require('jsonwebtoken');
const JWT_SECRET="Hello GOOd";

const fetchuser=(req,res,next)=>{
    //get the user form jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(404).send({error:"please authenticate usinf a valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(404).send({error:"please authenticate usinf a valid token"})
    }
   
}

module.exports=fetchuser;
