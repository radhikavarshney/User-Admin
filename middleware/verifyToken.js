const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports=verifyToken;