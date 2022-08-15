const Bidder = require("../models/bidder");
const BankAccount = require("../models/bank");
const { validationResult } = require("express-validator");

exports.getUserProfile = async (req, res, next) => {
	const user = await Bidder.findById(req.session.user._id);
	const hasBankAccount = await BankAccount.findOne({userId: user._id});
	res.render("profile/user-profile", { title: "User Profile", errorMessage: req.flash('error'), user, hasBankAccount}); // must query car from database , cars won 
};

exports.postUpdateUser = async (req, res, next) => {
	const email = req.session.user.email;
	const errors = validationResult(req);
	user = await Bidder.findOne({email: email});
	hasBankAccount = await BankAccount.findOne({userId: user._id});
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/user-profile", { 
			title: "User Profile",
			errorMessage: errors.array()[0].msg,
			user, hasBankAccount
			});
	}

	await Bidder.findOne({email: email})
	.then(user => {
		const newUser = req.body.user;
		user.firstName = newUser.firstName;
		user.lastName = newUser.lastName;
		user.email = newUser.email;
		user.city = newUser.city;
		user.phoneNumber = newUser.phoneNumber;
		user.password = newUser.password;
		
		req.session.user = user;
		user.save();
		return res.redirect("/user-profile");
	})
	.catch(err => {console.log(err)})
};

exports.postAddBankAccount = async (req,res,next) => {
	const cardNumber = req.body.cardNumber;
	const cardName = req.body.cardName;
	const expireMM = req.body.expireMM;
	const expireYY = req.body.expireYY;
	const expireDate = expireMM.concat("/", expireYY);
	const ccv = req.body.CCV;

	const bankAccount = new BankAccount({
		userId: req.session.user._id,
		accountNumber: cardNumber,
		cardName: cardName,
		expDate: expireDate,
		ccv: ccv
	});
	
	await bankAccount.save();
	await Bidder.findById(req.session.user._id)
		.then(user => {
			BankAccount.findOne({accountNumber: cardNumber})
				.then(account => {
					user.bankAccount = account._id;
				})
			user.save();
			req.session.user = user;
		});
	
	res.redirect("user-profile");
};

exports.postAddBalance = async (req,res,next) => {
	const moneyAdded = req.body.money;
	
	await Bidder.findById(req.session.user._id)
		.then(user => {
			BankAccount.findById(user.bankAccount)
				.then(account => {
					if (account.balance - moneyAdded >= 0) {
						account.balance -= parseInt(moneyAdded);
						account.save();
						user.wallet += parseInt(moneyAdded);
						user.save();
						req.session.user = user;
					}
				});
		});

	res.redirect("user-profile");
};