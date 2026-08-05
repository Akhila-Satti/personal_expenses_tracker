const Expense = require("../../models/Expense");
const latestexpenses = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(24, 0, 0, 0);
  if (!req.id) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }
  const todayExpenses = await Expense.find({
    userId: req.id,
    spentOn: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });
  return res.status(200).json(todayExpenses);
};
module.exports = latestexpenses;
