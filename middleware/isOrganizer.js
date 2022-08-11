module.exports = (req, res, next) => {
    if (!req.session.isOrganizer) {
        return res.redirect("/organizer-signin");
    }
    else {
     next();
    }
}