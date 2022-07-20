exports.getHome = (req, res, next) => {
	res.render("basic/home", { title: "Bidha Auction" });
};

exports.getContactUs = (req, res, next) => {
	res.render("basic/contact-us", { title: "contact us" });
};
