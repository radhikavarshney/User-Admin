const router=require("express").Router();
const User=require("../models/user.js");
const getUserId=require("../JWT/getUserId.js");
const generateToken=require("../JWT/generateToken.js");
const verifyToken=require("../middleware/verifyToken.js")
router.put("/:id",verifyToken,async(req,res)=>{
    const {name,profileImg}=req.body;
    const userId= req.params.id;
    try{
        const jwtUserId=getUserId(req);
        if(jwtUserId!== userId){
            return res.status(403).json( 'Access denied. Unauthorized user' );
        }
        const user= await User.findByIdAndUpdate(userId,{
            $set:{
                name:name,
                profileImg:profileImg
            }});
    
        return res.status(200).json({message:"User details updated successfully", user:user});
    }
    catch(e){
        return res.status(500).json(e);
    }
});

router.delete("/:id",async(req,res)=>{
    const userId=req.params.id;
    
    try{
        const jwtUserId=getUserId(req);
        if(jwtUserId!== userId){
            return res.status(403).json( 'Access denied. Unauthorized user' );
        }

        const user= await User.findByIdAndDelete(userId);

        return res.status(200).json({message:"Account has been deleted successfully."})
    }
    catch(e){
        return res.status(500).json(e);
    }
});

router.get("/:id", async(req,res)=>{
    try{
        const jwtUserId=getUserId(req);
        if(jwtUserId!== userId){
            return res.status(403).json( 'Access denied. Unauthorized user' );
        }
     const user= await User.findById(req.params.id);
     const {password,updatedAt,...other}=user._doc;
     res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;