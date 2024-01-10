const jwt=require("jsonwebtoken");

const getUserId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
    return decoded.userId;
};

module.exports=getUserId;