const Bidder = require("../models/bidder");
const Organizer = require("../models/organizer");

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
// creates Bidder and saves him to the database
exports.postAddUser = ('./user-signup', (req, res, next) => {
	const user = req.body.user;

	var bidder = new Bidder (user);
	bidder.save()
	.then(result => {console.log("Created Bidder");
	res.redirect("/")})
	.catch(err => {console.log(err);});

});

// creates Organizer and saves to the database
/*--------- needs fixing/saves to bidder not organizer --------*/
/* exports.postAddOrganizer = ('/organizer-signup', (req, res, next) => {
	const org = req.body.org;

	var organizer = new Organizer (org);
	organizer.save()
	.then(result => {console.log("Created Organizer");
	res.redirect("/")})
	.catch(err => {console.log('hello');});

}); */