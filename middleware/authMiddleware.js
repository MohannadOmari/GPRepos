const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt token exists and is verified
    if (token) {
        jwt.verify(token, 'cdsfafxf4vc48gf84DAS4Fd', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect("user-signin");
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect("user-signin");
    }
}

module.exports = { requireAuth };