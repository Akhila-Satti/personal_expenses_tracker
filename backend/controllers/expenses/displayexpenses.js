const Expense = require("../../models/Expense");
const Budget=require('../../models/Budget');
const mongoose=require("mongoose");
const displayexpenses = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.budgetId)) {
      return res.status(400).send("Invalid Budget ID");
  }
  
  const budget = await Budget.findById(req.params.budgetId);
   if (!budget) {
        return res.status(404).send("No such budget exists");
    }
  if (req.id !== budget.userId.toString()) {
    return res.status(403).send("Unauthorized");
  }
  const expenses = await Expense.find({
    budgetId: req.params.budgetId,
  });
  if (expenses.length === 0) {
    return res.status(200).send("No expenses to display");
  }

  res.status(200).json(expenses);
};
module.exports = displayexpenses;
