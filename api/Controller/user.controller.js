const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model(process.env.USER_MODEL);


const SUCCESS_STATUS_CODE = process.env.SUCCESS_STATUS_CODE;
const CREATED_STATUS_CODE = process.env.CREATED_STATUS_CODE;
const NO_CONTENT_STATUS_CODE = process.env.NO_CONTENT_STATUS_CODE;
const BAD_REQUEST_STATUS_CODE = process.env.BAD_REQUEST_STATUS_CODE;
const NOT_FOUND_STATUS_CODE = process.env.NOT_FOUND_STATUS_CODE;
const SERVER_ERROR_STATUS_CODE = process.env.SERVER_ERROR_STATUS_CODE;

const NOT_FOUND_MSG = process.env.NOT_FOUND_MSG;
const QUERYSTRING_SHOULD_BE_NUMBER_MSG = process.env.QUERYSTRING_SHOULD_BE_NUMBER_MSG;
const CANNOT_EXCEED_COUNT_MSG = process.env.CANNOT_EXCEED_COUNT_MSG;
const SALT_ROUND = process.env.SALT_ROUND;
const INCORRECT_BODY_MSG = process.env.INCORRECT_BODY_MSG;


const addOne = (req, res) => {

    if (req.body && req.body.username && req.body.password) {
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUND)),
        }
        User.create(newUser)
            .then((createdUser) => res.status(CREATED_STATUS_CODE).json(createdUser))
            .catch((err) => res.status(SERVER_ERROR_STATUS_CODE).json(err.message))
    } else{
        res.status(BAD_REQUEST_STATUS_CODE).json(INCORRECT_BODY_MSG)
    }
};

 genSalt = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUND, (err, salt) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt: salt,
            password: password
          });
        }
      });
    });
  }

module.exports = {
    addOne
};
