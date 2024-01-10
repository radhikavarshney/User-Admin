const router= require("express").Router();
const User=require("../models/user.js")
const isAdmin=require("../middleware/isAdmin.js");
const jwt=require("jsonwebtoken");
const verifyToken=require("../middleware/verifyToken.js")

router.use(verifyToken);

router.put('/modifyOwn/:id', isAdmin, async(req,res)=>{
    try{
        const {name,profileImg}=req.body;
        const userId=req.params.id;

        const user= await User.findByIdAndUpdate(userId,{
            $set:{
                name:name,
                profileImg:profileImg
            }});
    
        return res.status(200).json("Admin details updated successfully")
    }
    catch(e){
        return res.status(500).json(e);
    }
})

router.put('/modifyUser/:id', isAdmin, async(req,res)=>{
    try{
        const {_id,name,profileImg}=req.body;
        // const userId=req.params.id;

        const user= await User.findByIdAndUpdate(_id,{
            $set:{
                name:name,
                profileImg:profileImg
            }});
    
        return res.status(200).json("User details updated successfully")
    }
    catch(e){
        return res.status(500).json(e);
    }
});

router.delete('/delete/:id',isAdmin, async(req,res)=>{
    const {userId}=req.body;
    if(userId){
    try{
        const user= await User.findByIdAndDelete(userId);

        return res.status(200).json("Account has been deleted successfully.")
    }
    catch(e){
        return res.status(500).json(e);
    }}
    else{
        return res.status(500).status("enter valid user id");
    }
});


router.get('/viewAllUsers/:id', isAdmin, async (req, res) => {
    try {
        const allUsers = await User.find({});
        const users = allUsers.map(user => {
            const { password, updatedAt, ...other } = user.toObject();
            return other;
        });

        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(e);
    }
});

module.exports=router