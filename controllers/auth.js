exports.getUserSignup = (req, res, next) => {
	res.render("auth/user-signup", { title: "Sign Up" });
};

exports.getUserSignin = (req, res, next) => {
	res.render("auth/user-signin", { title: "Sign In" });
};

exports.getOrganizerSignup = (req, res, next) => {
	res.render("auth/organizer-signup", { title: "Sign Up" });
};

exports.getOrganizerSignin = (req, res, next) => {
	res.render("auth/organizer-signin", { title: "Sign In" });
};

// JSON => JavaScript Object Notation
exports.postAddUser = (req, res, next) => {
	const user = req.body.user;

	//const bidder = new Bidder (user);
	console.log(user);
	res.redirect("/");
};
