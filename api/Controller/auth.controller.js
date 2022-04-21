const jwt = require("jsonwebtoken");
const util = require("util")


const UNAUTHORIZED_STATUS_CODE = process.env.UNAUTHORIZED_STATUS_CODE;
const FORBIDDEN_STATUS_CODE = process.env.FORBIDDEN_STATUS_CODE;

const UNAUTHORIZED_STATUS_MSG = process.env.UNAUTHORIZED_STATUS_MSG;
const FORBIDDEN_STATUS_MSG = process.env.FORBIDDEN_STATUS_MSG;

const JWT_PASSWORD = process.env.JWT_PASSWORD;

const jwtVerifyPromise = util.promisify(jwt.verify, {context:jwt})

const authenticate = async (req, res, next) => {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    jwtVerifyPromise(token, JWT_PASSWORD)
    .then(()=> next())
    .catch((err)=> res.status(UNAUTHORIZED_STATUS_CODE).json(UNAUTHORIZED_STATUS_MSG))
  }
  else {
    res.status(FORBIDDEN_STATUS_CODE).json(FORBIDDEN_STATUS_MSG);
  }
};

module.exports = {
  authenticate
};
