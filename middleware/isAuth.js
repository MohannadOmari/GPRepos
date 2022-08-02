module.exports = (req, res, next) => {
    if (req.session.isOrganizer) {
        next();
    }
    else {
        if (req.session.isBidder) {
            next();
        }
        else {
            return res.redirect("/user-signin");
        }
        return res.redirect("organizer-signin");
    }
}