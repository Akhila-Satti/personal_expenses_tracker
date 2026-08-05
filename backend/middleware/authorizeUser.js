 const jwt=require("jsonwebtoken");
 const authorizeUser=(req,res,next)=>{
    if(req.headers.authorization==null) return res.status(401).json({
        message:"Not authorised"
    })
    if(req.headers.authorization.split(" ")[0]!="Bearer"){
        return res.status(401).json({
            message:"Not authorised"
        })
    }
    const token=req.headers.authorization.split(" ")[1];
    

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({
                message:"invalid Token"
            });
        }
       req.id=decoded.id;
       req.email=decoded.email;
        next();
        
    })
 }
 module.exports=authorizeUser;