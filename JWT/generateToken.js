const jwt=require("jsonwebtoken");


const generateToken = (userId, email, role) => {
    return jwt.sign({ userId, email, role }, process.env.JWT_TOKEN, { expiresIn: '1h' });
};

module.exports=generateToken;