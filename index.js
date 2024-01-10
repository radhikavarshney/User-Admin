const express=require("express");
const dotenv=require("dotenv");
const mongoose= require("mongoose");
const auth=require("./routes/auth.js")
const user=require("./routes/user.js")
const admin=require("./routes/admin.js");
const app=express();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Specify the destination folder for storing files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage });

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB says HI!!");
}).catch((err)=>{
  console.log(err);
})

app.use(express.json());
app.use('/api/r1',auth);
app.use("/api/r2",user);
app.use("/api/r3",admin);

app.listen(3000,()=>{
    console.log("backend is running on 3000");
})