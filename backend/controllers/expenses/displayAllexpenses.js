const Expense = require("../../models/Expense");
const Budget = require("../../models/Budget");
const mongoose = require("mongoose");
const displayAllexpenses = async (req, res) => {
  const filter = {
    userId: req.id,
  };

  if (req.query.searchBudget) {
    filter.budgetName = req.query.searchBudget.trim().toLowerCase();
  }

  if (req.query.searchExpense) {
    filter.expensename = {
      $regex: req.query.searchExpense.trim(),
      $options: "i",
    };
  }

  if (req.query.spentDate) {
    const t = new Date(req.query.spentDate);
    t.setHours(0, 0, 0, 0);
    filter.spentOn = t;
  }

  const expenses = await Expense.find(filter);
  res.status(200).json(expenses);
};
module.exports = displayAllexpenses;
