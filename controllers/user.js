exports.getUserProfile = (req, res, next) => {

	res.render("profile/user-profile", { title: "User Profile"}); // must query car from database , cars won 

}