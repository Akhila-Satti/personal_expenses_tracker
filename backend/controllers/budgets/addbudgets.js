const Budget = require("../../models/Budget");
const addbudgets = async (req, res) => {
  const newD = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:"No budget data received"});
  }
  const from = new Date(newD.from);
from.setHours(0, 0, 0, 0);

const to = new Date(newD.to);
to.setHours(0, 0, 0, 0);
  const budn = {
    userId: req.id,
    bn: newD.bn.trim().toLowerCase(),
    from:from,
    to:to,
    amount: newD.amount,
  };
  if (!budn.amount || budn.amount <= 0) {
    return res.status(400).json({message:"Amount should be positive"});
  }
  if (!budn.from || !budn.to) {
    return res.status(400).json({message:"Both dates are required"});
  }

  if (new Date(budn.to) <= new Date(budn.from)) {
    return res.status(400).json({message:"To date should be after from date"});
  }
  const alreadyData = await Budget.find({
    userId: req.id,
    bn: budn.bn,
  });
  for (const d of alreadyData) {

    const existingFrom = new Date(d.from);
    const existingTo = new Date(d.to);

    const newFrom = new Date(budn.from);
    const newTo = new Date(budn.to);

    if (existingFrom <= newTo && existingTo >= newFrom) {
        return res.status(400)
            .json({message:"Already budget exists for the given period"});
    }
}

  const budget = new Budget(budn);
  await budget.save();
  res.status(201).json(budget);
};
module.exports = addbudgets;
