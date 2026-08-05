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
    const start = new Date(req.query.spentDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(req.query.spentDate);
    end.setHours(23, 59, 59, 999);

    filter.spentOn = {
      $gte: start,
      $lte: end,
    };
  }

  const expenses = await Expense.find(filter);
  res.status(200).json(expenses);
};
module.exports = displayAllexpenses;
