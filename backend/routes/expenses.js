const express = require("express");
const router = express.Router({mergeParams:true});

const addexpenses = require("../controllers/expenses/addexpenses");
const editexpenses = require("../controllers/expenses/editexpenses");
const deleteexpenses = require("../controllers/expenses/deleteexpenses");
const authorisation=require('../middleware/authorizeUser')
const displayAllexpenses=require("../controllers/expenses/displayAllexpenses")
const getById=require('../controllers/expenses/getById')
router.get("/expenses",authorisation,displayAllexpenses);
router.get("/expenses/:expenseId",authorisation,getById);
router.post("/expenses/:budgetId",authorisation, addexpenses);
router.patch("/expenses/:budgetId/:expenseId", authorisation,editexpenses);
router.delete("/expenses/:budgetId/:deleteId",authorisation, deleteexpenses);
module.exports = router;
