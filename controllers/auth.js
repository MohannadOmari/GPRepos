const Bidder = require("../models/bidder");
const Organizer = require("../models/organizer");
const jwt = require('jsonwebtoken');

// error handler
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = {firstName: '', lastName: '', email: '', phoneNumber: '', password: ''};

	// duplicate error code
	if (err.code === 11000){
		errors.email = 'The email is already registered';
		return errors;
	}

	// vaildation errors
	if (err.message.includes('Bidder validation failed' || err.message.includes('Organizer validation failed'))) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
}

const maxAge = 60 * 60 * 24;
const createToken = (id) => {
	return jwt.sign({ id }, 'cdsfafxf4vc48gf84DAS4Fd', {
		expiresIn: maxAge
	});
}

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
exports.postUserSignup = ('/', async (req, res) => {
	
	const user = req.body.user;

	try {
		const bidder = await Bidder.create(user);
		const token = createToken(bidder._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		console.log(bidder);
		res.status(201).redirect("/user-signin");
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json(errors);
	}

});

// creates Organizer and saves to the database
exports.postOrganizerSignup = ('/', async (req, res) => {
	
	const org = req.body.org;
	
	try {
		const organizer = await Organizer.create(org);
		const token = createToken(organizer._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		console.log(organizer);
		res.status(201).redirect("organizer-signin");
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json(errors);
	}

});

// bidder signin function
exports.postUserSignin = async (req, res) => {
	const user = req.body.user;

	try {
		const bidder = await Bidder.signin(user.email, user.password);
		const token = createToken(bidder._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).redirect("/");
	}
	catch (err) {
		res.status(400).redirect("/user-signin");
		
	}
};

// organizer signin function
exports.postOrganizerSignin = async (req, res) => {
	const org = req.body.org;

	try {
		const organizer = await Organizer.signin(org.email, org.password);
		const token = createToken(organizer._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).redirect("/");
	}
	catch (err) {
		res.status(400).redirect("/organizer-signin");
		
	}
};


/* exports.userLogout = ('/logout', (req,res) => {
	req.logout();
	res.redirect("/");
}); */