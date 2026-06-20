let data= require("../../data");
const deleteexpenses=(req, res) => {
 
  const deletedata = data.expenses.find((i) => i.id === Number(req.params.deleteId));
  
   data.expenses = data.expenses.filter((i) => i.id !== Number(req.params.deleteId));
  data.budgets = data.budgets.map((b) => {
    if (b.id === deletedata.bid) {
      // Return a completely new object copy with safe math overrides
      return {
        ...b,
        spent: (b.spent || 0) - deletedata.amount,
        remaining: (b.remaining || b.amount) + deletedata.amount,
      };
    }
    return b; // Return un-targeted elements as they were
  });
  res.status(200).json(data.expenses);
  
}
module.exports=deleteexpenses;