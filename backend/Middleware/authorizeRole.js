// middleware/authorizeRole.js
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
            }
            req.user = decoded; // Attach user info to the request
            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = authorizeRole;
