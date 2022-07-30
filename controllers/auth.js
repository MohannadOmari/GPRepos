const Bidder = require("../models/bidder");
const Organizer = require("../models/organizer");
const bcrypt = require('bcrypt');
const session = require('express-session');

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

	Bidder.findOne({email: user.email})
	.then(userDoc => {
		if (userDoc) {
			return res.redirect("/user-signin");
		}
		const bidder = new Bidder(user);
		return bidder.save();
	})
	.then(result => {
		res.redirect("/user-signin");
	})
	.catch(err => {
		console.log(err);
	});
	
});

// creates Organizer and saves to the database
exports.postOrganizerSignup = ('/', async (req, res) => {
	const org = req.body.org;

	Organizer.findOne({email: org.email})
	.then(orgDoc => {
		if (orgDoc) {
			return res.redirect("/organizer-signin");
		}
		const organizer = new Organizer(org);
		return organizer.save();
	})
	.then(result => {
		res.redirect("/organizer-signin");
	})
	.catch(err => {
		console.log(err);
	});

});

// bidder signin function
exports.postUserSignin = async (req, res) => {
	const user= req.body.user;

	Bidder.findOne({email: user.email})
		.then(userDoc => {
			if (!userDoc) {
				return res.redirect("/user-signin");
			}
			bcrypt.compare(user.password, userDoc.password)
			.then(doMatch => {
				if (doMatch) {
					req.session.isLoggedin = true;
					req.session.user = user;
					return req.session.save(err => {
						console.log(err);
						res.redirect("/");
					})
				}
				res.redirect("/user-signin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("user-signin");
			});
		})
};

// organizer signin function
exports.postOrganizerSignin = async (req, res) => {
	const org = req.body.org;

	Organizer.findOne({email: org.email})
		.then(orgDoc => {
			if (!orgDoc) {
				return res.redirect("/organizer-signin");
			}
			bcrypt.compare(org.password, orgDoc.password)
			.then(doMatch => {
				if (doMatch) {
					req.session.isLoggedin = true;
					req.session.org = org;
					return req.session.save(err => {
						console.log(err);
						res.redirect("/");
					})
				}
				res.redirect("/organizer-signin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("/organizer-signin");
			});
		})

};


/* exports.postUserLogout = ('/logout', (req,res) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/");
	})
}); */