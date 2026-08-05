const Expense = require("../../models/Expense");
const latestexpenses = async (req, res) => {
  const startOfDay = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
});
  startOfDay.setHours(0, 0, 0, 0);
const endOfDay = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
});
today.setHours(0,0,0,0)
  endOfDay.setHours(24, 0, 0, 0);
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
