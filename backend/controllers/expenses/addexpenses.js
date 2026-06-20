let data = require("../../data");
const addexpenses=(req, res) => {
  const newE = req.body;
  if(!newE){
    return res.status(404).send("No data added")
  }
  data.expenses.push(newE);
  data.budgets = data.budgets.map((b) => {
    if (b.id === newE.bid) {
      // Return a completely new object copy with safe math overrides
      return {
        ...b,
        spent: (b.spent || 0) + newE.amount,
        remaining: (b.remaining || b.amount) - newE.amount,
      };
    }
    return b; // Return un-targeted elements as they were
  });
  res.status(200).json(data.expenses);
}
module.exports=addexpenses;