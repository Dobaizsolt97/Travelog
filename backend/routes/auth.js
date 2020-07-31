const express = require("express");
const router = express.Router();

//importing the menthods
const { signup, signin, signout } = require("../controllers/auth");
//Routes
//SIGN UP
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
