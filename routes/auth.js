const router=require("express").Router();
const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken=require("../JWT/generateToken.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage }).single('profileImg'); // Specify the field name for file upload

// SIGN UP with file upload using Multer
router.post("/signup", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        profileImg: req.file ? req.file.path : "", 
        password: hashedPass,
        role: req.body.role
      });

      const user = await newUser.save();

      const token = generateToken(user._id, user.email, user.role);
      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(500).json(e);
    }
  });
});


//LOGIN
router.post("/login", async(req,res)=>{
    const{ emailOrPhone, password}= req.body;
    try{
        const user=await User.findOne({
            $or:[{email:emailOrPhone},{phoneNo:emailOrPhone}]
        });

        if(!user) {
             return res.status(404).json("user not found");
        }

        const validPassword= await bcrypt.compare(password,user.password);

        if(!validPassword){
             return res.status(404).json("password not found");
        }

        const token = generateToken(user._id, user.email, user.role);

        return res.status(200).json({user,token});
    }
    catch(e){
        console.log(e)
        return res.status(500).json(e);
    }
});

module.exports=router;