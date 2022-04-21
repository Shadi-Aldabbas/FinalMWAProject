const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = mongoose.model(process.env.USER_MODEL);
const util = require("util");


const SUCCESS_STATUS_CODE = process.env.SUCCESS_STATUS_CODE;
const BAD_REQUEST_STATUS_CODE = process.env.BAD_REQUEST_STATUS_CODE;
const UNAUTHORIZED_STATUS_CODE = process.env.UNAUTHORIZED_STATUS_CODE;
const SERVER_ERROR_STATUS_CODE = process.env.SERVER_ERROR_STATUS_CODE;

const INCORRECT_BODY_MSG = process.env.INCORRECT_BODY_MSG;
const UNAUTHORIZED_STATUS_MSG = process.env.UNAUTHORIZED_STATUS_MSG;

const JWT_PASSWORD = process.env.JWT_PASSWORD;


const bcryptComparePromise = util.promisify(bcrypt.compare, {context:bcrypt})

const login = (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          bcryptComparePromise(req.body.password, user.password)
          .then(()=>{
            const token = jwt.sign({ name: user.name }, JWT_PASSWORD, { expiresIn: 3600 })
            res.status(SUCCESS_STATUS_CODE).json({ success: true, token: token });
          })
          .catch((err)=>{
            res.status(UNAUTHORIZED_STATUS_CODE).json(UNAUTHORIZED_STATUS_MSG);
          })
        } else {
          res.status(UNAUTHORIZED_STATUS_CODE).json(UNAUTHORIZED_STATUS_MSG);
        }
      })
      .catch((err) => res.status(SERVER_ERROR_STATUS_CODE).json(err.message))
  } else {
    res.status(BAD_REQUEST_STATUS_CODE).json(INCORRECT_BODY_MSG)
  }
};

module.exports = {
  login,
};
