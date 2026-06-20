let data = require("../../data");
const addbudgets=(req, res) => {
  const newD = req.body;

  if (!newD) {
    return res.status(400).send("No budget data received");
  }
  const budn = {
    id: newD.id,
    bn: newD.bn,
  };
  data.budgets.push(newD);
  data.budgetnames.push(budn);
  res.status(200).json(data.budgetnames);
}
module.exports=addbudgets;