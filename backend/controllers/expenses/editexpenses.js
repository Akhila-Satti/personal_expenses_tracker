let data = require("../../data");
const editexpenses=(req, res) => {
  
  const newExpense = req.body.newd;
  const oldbid=req.body.oldbid;
  const expenseamount=req.body.expenseamount;
  
  data.expenses = data.expenses.map((i) => {
    if (i.id === Number(req.params.expenseId)) {
      return newExpense;
    }
    return i;
  });
   data.budgets= data.budgets.map((b) => {
      if (newExpense.bid === oldbid) {
        if (b.id === newExpense.bid) {
          return {
            ...b,
            spent: (b.spent || 0) + newExpense.amount - expenseamount,
            remaining:
              (b.remaining || b.amount) - newExpense.amount + expenseamount,
          };
        }
      }
      if (newExpense.bid !== oldbid) {
        if (b.id === newExpense.bid) {
          return {
            ...b,
            spent: (b.spent || 0) + newExpense.amount,
            remaining: (b.remaining || b.amount) - newExpense.amount,
          };
        }
        if (b.id === oldbid) {
          return {
            ...b,
            spent: (b.spent || 0) - expenseamount,
            remaining: (b.remaining || b.amount) +expenseamount,
          };
        }
      }
      return b; // Return un-targeted elements as they were
    });
  res.status(200).json(data.expenses);
}
module.exports=editexpenses;