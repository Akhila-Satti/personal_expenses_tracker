const Expense = require("../../models/Expense");

const getById= async (req, res) => {
  const data = await Expense.findById(req.params.expenseId);
   if (!data) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }
if (data.userId.toString() !== req.id) {
  return res.status(403).json({
    message: "Unauthorized",
  });
}
  res.status(200).json(data);
};
module.exports = getById;
