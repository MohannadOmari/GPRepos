exports.getHome = (req, res, next) => {
	res.render("basic/home", { title: "Bidha Auction", isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder });
};

exports.getContactUs = (req, res, next) => {
	res.render("basic/contact-us", { title: "contact us", isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder });
};
