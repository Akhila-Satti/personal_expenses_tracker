const Expense = require("../../models/Expense");
const moment = require("moment-timezone");
const latestexpenses = async (req, res) => {
  

const startOfDay = moment()
  .tz("Asia/Kolkata")
  .startOf("day")
  .toDate();

const endOfDay = moment()
  .tz("Asia/Kolkata")
  .endOf("day")
  .toDate();
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
