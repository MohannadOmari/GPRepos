module.exports = (req, res, next) => {
    if (!req.session.isBidder) {
        return res.redirect("/user-signin");
    } else {
        next();
    }
};