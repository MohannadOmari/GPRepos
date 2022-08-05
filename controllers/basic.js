exports.getHome = (req, res, next) => {
	res.render("basic/home", { title: "Bidha Auction"});
};

exports.getContactUs = (req, res, next) => {
	res.render("basic/contact-us", { title: "contact us"});
};

exports.getAboutUs = (req, res, next) => {
	res.render("basic/About-us", { title: "About us" }); 
};

exports.getWishlist = (req, res, next) => {
	res.render("basic/Wishlist", { title: "Wishlist" });
};

