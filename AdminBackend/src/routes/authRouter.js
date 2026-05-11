const express = require("express");

const router =express.Router();
const{register,login,adminRegister} =require("../controller/authController")


router.post("/register",register);
router.post("/login",login);
router.post("/adminreg",adminRegister);


module.exports = router;
