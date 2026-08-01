const express = require("express");
const router = express.Router({mergeParams:true});

const displayexpenses = require("../controllers/expenses/displayexpenses");
const addexpenses = require("../controllers/expenses/addexpenses");
const editexpenses = require("../controllers/expenses/editexpenses");
const deleteexpenses = require("../controllers/expenses/deleteexpenses");
const authorisation=require('../middleware/authorizeUser')


router.get("/", authorisation,displayexpenses);
router.post("/",authorisation, addexpenses);
router.patch("/:expenseId", authorisation,editexpenses);
router.delete("/:deleteId",authorisation, deleteexpenses);



module.exports = router;
