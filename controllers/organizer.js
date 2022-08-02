exports.getOrganizerProfile = (req, res, next) => {
	res.render("profile/organizer-profile", { title: "organizer Profile", isAuthenticated: true, isOrganizer: req.session.isOrganizer, isBidder: false });
};
