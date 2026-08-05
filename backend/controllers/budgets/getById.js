const Budget = require("../../models/Budget");

const getById= async (req, res) => {
  const data = await Budget.findById(req.params.budgetId);
  if (!data) {
    return res.status(404).json({
      message: "Budget not found",
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
