let data = require("../../data");
const deletebudgets= (req, res) => {
  const budId = Number(req.params.deleteId);
  data.budgets = data.budgets.filter((i) => i.id != budId);
 data. budgetnames=data.budgetnames.filter((i)=>i.id!=budId);
  data.expenses=data.expenses.filter((i)=>i.bid!=budId);
  res.status(200).json(data.budgetnames);
}
module.exports=deletebudgets;