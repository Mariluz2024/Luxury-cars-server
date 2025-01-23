const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_llave_secreta';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
