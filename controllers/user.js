const Bidder = require("../models/bidder");
const BankAccount = require("../models/bank");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.getUserProfile = async (req, res, next) => {
	const user = await Bidder.findById(req.session.user._id);
	const bankAccount = await BankAccount.findOne({userId: user._id});
	res.render("profile/user-profile", { 
		title: "User Profile", 
		errorMessage: req.flash('error'), 
		user, bankAccount, 
		bankError: req.flash('error') 
	}); 
};

exports.postUpdateUser = async (req, res, next) => {
	const email = req.session.user.email;
	const errors = validationResult(req);
	const user = await Bidder.findOne({email: email});
	const bankAccount = await BankAccount.findOne({userId: user._id});
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/user-profile", { 
			title: "User Profile",
			errorMessage: errors.array()[0].msg,
			bankError: req.flash('error'),
			user, bankAccount
			});
	}

	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.user.password, salt);
	await Bidder.findOne({email: email})
	.then(user => {
		const newUser = req.body.user;
		user.firstName = newUser.firstName;
		user.lastName = newUser.lastName;
		user.email = newUser.email;
		user.city = newUser.city;
		user.phoneNumber = newUser.phoneNumber;
		user.password = password;
		
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

	const bankAccount = await BankAccount.findOne({ userId: req.session.user._id });
	const user = await Bidder.findById(req.session.user._id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/user-profile", { 
			title: "User Profile",
			bankError: errors.array()[0].msg,
			errorMessage: req.flash('error'), 
			user, bankAccount
			});
	}

	const bank = new BankAccount({
		userId: req.session.user._id,
		accountNumber: cardNumber,
		cardName: cardName,
		expDate: expireDate,
		ccv: ccv
	});
	
	await bank.save();
	await BankAccount.findOne({ accountNumber: cardNumber })
	.then(async account => {
		await Bidder.findByIdAndUpdate(req.session.user._id, { bankAccount: account._id });
	});
	const newUser = await Bidder.findById(req.session.user._id);
	req.session.user = newUser;
	this.getUserProfile(req, res, next);
};

exports.postAddBalance = async (req,res,next) => {
	const moneyAdded = req.body.money;
	
	await Bidder.findById(req.session.user._id)
		.then(user => {
			BankAccount.findById(user.bankAccount)
				.then(account => {
					if (account.balance - moneyAdded >= 0) {
						account.balance -= parseInt(moneyAdded);
						account.transactions.push(moneyAdded);
						account.save();
						user.wallet += parseInt(moneyAdded);
						user.save();
						req.session.user = user;
					}
				});
		});

	res.redirect("user-profile");
};