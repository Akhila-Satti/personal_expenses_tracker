const Budget = require("../../models/Budget");

const displaybudgets = async (req, res) => {
  const fullData = await Budget.find({
    userId: req.id,
  });

  res.status(200).json(fullData);
};
module.exports = displaybudgets;
