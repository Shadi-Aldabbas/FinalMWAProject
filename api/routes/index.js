const actorRoutes = require("./actors");
const userRoutes = require("./users");
const loginRoutes = require("./login");
const express = require("express");

const router = express.Router();
router.use("/actors",actorRoutes);
router.use("/users",userRoutes);
router.use("/login",loginRoutes);



module.exports = router;
