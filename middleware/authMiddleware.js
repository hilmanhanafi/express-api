// import JWT
const jwt = require('jsonwebtoken');

// inisialisasi middleware
const authMiddleware = (req, res, next) => {
    
    // get token
    const token = req.headers['authorization'];

    // check token use if ternary
    if(!token) return res.status(403).json({
        status: false,
        message : 'Unauthorized'
    });

    // try catch
    try {
        // decode token
        const decoded = jwt.verify(token.replace('Bearer ', ''), '4a9fba458ef22babcc92723035eb1afe362a6c2dc683fc94f2d8af5adc288ffd');

        // set user id to request
        req.user = decoded;

        // next middleware
        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message : 'Invalid Token'
        })

    }

}

// export middleware    
module.exports = authMiddleware;
