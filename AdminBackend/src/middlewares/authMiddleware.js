const jwt = require("jsonwebtoken");


const verifyToken=(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"no token,Authorization is denied"});
        }
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            console.log(`decoded user is ${req.user}`);
            next();

        }
        catch(err){
            res.status(400).json({message:"token invalid"});
        }
    }
    else{
         return res.status(401).json({message:"no token,Authorization is denied"});
    }

};

module.exports=verifyToken;