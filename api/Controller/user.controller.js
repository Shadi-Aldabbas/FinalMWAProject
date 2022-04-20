// const mongoose = require("mongoose");
// const User = mongoose.model(process.env.USER_MODEL);

// const getUser = (req, res) => {

//     const email = req.query.email;
//     const password = req.query.password;

//     User.findOne({email: new RegExp('^'+email+'$', "i"),password: new RegExp('^'+password+'$', "i")}).exec()
//     .then((user) => {
//         res.status(200).json(user);
//     }).catch((err) => {
//         res.status(404).json("user not found",err);
//     })
// };



// module.exports = {
//     getUser
// };
