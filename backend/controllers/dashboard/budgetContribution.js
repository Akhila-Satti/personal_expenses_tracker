const Expenses = require("../../models/Expense");
const Budgets = require("../../models/Budget");
const mongoose = require("mongoose");
const budgetContribution = async (req, res) => {
  

const userId = new mongoose.Types.ObjectId(req.id);
  const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const today = formatter.format(new Date());
  const budgets = await Budgets.find({
    userId: userId,
    from: { $lte: today },
    to: { $gte: today },
  });
  if (budgets.length === 0) {
    return res.status(204).json({
      message: "No active budgets",
    });
  }
 
  const activeBudgets = budgets.map((d) => d._id);
   
  const expenses = await Expenses.aggregate([
    {
      $match: {
        userId: userId,
        budgetId: { $in: activeBudgets },
      },
    },

    {
      $group: {
        _id: "$budgetId",
        spent: { $sum: "$amount" },
      },
    },
    {
      $lookup: {
        from: "budgets",
        localField: "_id",
        foreignField: "_id",
        as: "budget",
      },
    },
    {
      $unwind: "$budget",
    },
    {
      $project: {
        _id: 0,
        budgetName: "$budget.bn",
        spent: 1,
      },
    },
  ]);

  if (expenses.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(expenses);
};
module.exports = budgetContribution;
