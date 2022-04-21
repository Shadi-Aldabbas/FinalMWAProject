const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const util = require("util");
const User = mongoose.model(process.env.USER_MODEL);


const CREATED_STATUS_CODE = process.env.CREATED_STATUS_CODE;
const BAD_REQUEST_STATUS_CODE = process.env.BAD_REQUEST_STATUS_CODE;
const SERVER_ERROR_STATUS_CODE = process.env.SERVER_ERROR_STATUS_CODE;

const SALT_ROUND = parseInt(process.env.SALT_ROUND, 10);
const INCORRECT_BODY_MSG = process.env.INCORRECT_BODY_MSG;

const bcryptHashPromise = util.promisify(bcrypt.hash, { context: bcrypt })
const bcryptGenSaltPromise = util.promisify(bcrypt.genSalt, { context: bcrypt })


const register = async (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        bcryptGenSaltPromise(SALT_ROUND)
            .then((salt) => {
                bcryptHashPromise(req.body.password, salt)
                    .then((hashedPass) => {
                        const newUser = {
                            name: req.body.name,
                            username: req.body.username,
                            password: hashedPass,
                        }
                        User.create(newUser)
                            .then((createdUser) => res.status(CREATED_STATUS_CODE).json(createdUser))
                            .catch((err) => res.status(SERVER_ERROR_STATUS_CODE).json(err.message))
                    })
                    .catch((err) =>  res.status(SERVER_ERROR_STATUS_CODE).json(err.message))
            })
            .catch((err) =>  res.status(SERVER_ERROR_STATUS_CODE).json(err.message));
    } else {
        res.status(BAD_REQUEST_STATUS_CODE).json(INCORRECT_BODY_MSG)
    }
};

module.exports = {
    register
};
