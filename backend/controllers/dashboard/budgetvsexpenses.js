const Expenses = require("../../models/Expense");
const Budgets = require("../../models/Budget");
const mongoose = require("mongoose");
const budgetvsexpenses = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.id);
 formatter.format(new Date());

  const expenses = await Budgets.aggregate([
    {
      $match: {
        userId: userId,
        from: { $lte: today },
        to: { $gte: today },
      },
    },
    {
      $lookup: {
        from: "expenses",
        localField: "_id",
        foreignField: "budgetId",
        as: "expenses",
      },
    },
    {
      $addFields: {
        spent: {
          $sum: {
            $map: {
              input: "$expenses",
              as: "expense",
              in: "$$expense.amount",
            },
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        budgetName: "$bn",
        budgetamount: "$amount",
        spent: 1,
      },
    },
  ]);

  if (expenses.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(expenses);
};
module.exports = budgetvsexpenses;
