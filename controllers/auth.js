const Bidder = require("../models/bidder");

exports.getSignup = (req, res, next) => {
	res.render("auth/user-signup", { title: "Sign Up" });
};

exports.getSignin = (req, res, next) => {
	res.render("auth/user-signin", { title: "Sign In" });
};
// JSON => JavaScript Object Notation
exports.postAddUser = (req, res, next) => {

	const user = req.body.user;
	const verification = 0;

	const bidder = new Bidder (user);
	
	console.log("**********");
	bidder.save()
	.then(result => {console.log("Created Bidder");
	res.redirect("/auction")})
	.catch(err => {console.log(err);});
};


exports.postAddOrganizer = (req, res, next) => {

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const username = req.body.username;
	const phoneNumber = req.body.phoneNumber;
	const password = req.body.password;
	const wallet = req.body.wallet;
	const verification = 0;

	const Organizer = new Organizer ({

		firstName: firstName,
		lastName: lastName,
		email: email,
		username: username,
		phoneNumber: phoneNumber,
		password: password, //not encrypted yet will come back later
		wallet: wallet,
		//verification: verification
	});

	Organizer.save()
	.then(result => {console.log("Created Organizer");
	res.redirect(/*put signin page here*/)})
	.catch(err => {console.log(err);});
};
