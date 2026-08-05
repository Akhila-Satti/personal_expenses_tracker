const Budget = require("../../models/Budget");

const displaybudgets = async (req, res) => {
  let filter = {
    userId: req.id,
  };
  if (req.query.search) {
    filter.bn = {
      $regex: req.query.search.trim(),
      $options: "i",
    };
  }
  const fullData = await Budget.find(filter);
  res.status(200).json(fullData);
};
module.exports = displaybudgets;
