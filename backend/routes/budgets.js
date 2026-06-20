const express = require("express");
const router = express.Router();


const displaybudgets = require("../controllers/budgets/displaybudgets");
const deletebudgets = require("../controllers/budgets/deletebudgets");
const editbudgets = require("../controllers/budgets/editbudgets");
const addbudgets=require('../controllers/budgets/addbudgets')
router.post("/", addbudgets);
router.get("/",displaybudgets );
router.delete("/:deleteId",deletebudgets);
router.put("/:updateId", editbudgets);

module.exports = router;
