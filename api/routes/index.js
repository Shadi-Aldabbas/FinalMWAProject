const actorRoutes = require("./actors");
const userRoutes = require("./users");
const express = require("express");

const router = express.Router();
router.use("/actors",actorRoutes);
router.use("/users",userRoutes);



module.exports = router;
