const User= require("../models/user.js");

const isAdmin= async (req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(user && user.role==="Admin"){
        next();
    }
    else{
        return res.status(403).json( 'Access denied. Admin role required for the operation.' );
    }
};

module.exports=isAdmin;