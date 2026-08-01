const express = require("express");
const router = express.Router();


const login = require("../controllers/auth/login");

router.post("/",login);

module.exports = router;
