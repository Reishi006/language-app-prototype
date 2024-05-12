const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);

    if (!token) return res.status(401).send('Nieautoryzowany');

    try {
        const userVerify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.user = userVerify;
        next();
    } catch (error) {
        res.status(401).send('Nieprawidłowy token');
    }


}

module.exports = checkAuth;