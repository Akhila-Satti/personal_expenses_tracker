let data = require("../../data");
const editbudgets=(req, res) => {
 
  data.budgets = data.budgets.map((b) => {
    if (b.id === Number(req.params.updateId)) {
      
      return req.body;
    }
    return b;
  });
  const newn = {
    id: Number(req.params.updateId),
    bn: req.body.bn,
  };
  data.budgetnames=data. budgetnames.map((b) => {
    if (b.id == Number(req.params.updateId)) {
      return newn;
    } else {
      return b;
    }
  });
  data.expenses=data.expenses.map((i)=>{
    if(i.bid===Number(req.params.updateId)){
      return{
      ...i,
      budgetname:newn.bn
      };
    }
    return i;
  })
  res.status(200).json(data.budgetnames);
}
module.exports=editbudgets;