const express = require("express");
const router = express.Router({mergeParams:true});

const authorisation=require("../middleware/authorizeUser")
const displaybudgets = require("../controllers/budgets/displaybudgets");
const deletebudgets = require("../controllers/budgets/deletebudgets");
const editbudgets = require("../controllers/budgets/editbudgets");
const getById=require("../controllers/budgets/getById");
const addbudgets=require('../controllers/budgets/addbudgets');
router.post("/", authorisation,addbudgets);
router.get("/",authorisation,displaybudgets );
router.get("/:budgetId",authorisation,getById);
router.delete("/:deleteId",authorisation,deletebudgets);
router.patch("/:updateId", authorisation,editbudgets);

module.exports = router;
