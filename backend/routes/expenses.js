const express = require("express");
const router = express.Router();

const displayexpenses = require("../controllers/expenses/displayexpenses");
const addexpenses = require("../controllers/expenses/addexpenses");
const editexpenses = require("../controllers/expenses/editexpenses");
const deleteexpenses = require("../controllers/expenses/deleteexpenses");



router.get("/", displayexpenses);
router.post("/", addexpenses);
router.put("/:expenseId", editexpenses);
router.delete("/:deleteId", deleteexpenses);



module.exports = router;
