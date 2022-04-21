const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");


router.route("")
.post(userController.register);


module.exports = router;
