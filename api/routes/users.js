const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");


router.route("")
.post(userController.addOne);

module.exports = router;
