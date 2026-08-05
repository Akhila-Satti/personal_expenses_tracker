const Expense=require('../../models/Expense')
const Budget=require('../../models/Budget')
const mongoose=require("mongoose")
const addexpenses=async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.budgetId)) {
      return res.status(400).json({message:"Invalid Budget ID"});
  }
  const spentOn=new Date(req.body.spentOn);
  spentOn.setHours(0,0,0,0);
  const expensedata={
    budgetName:req.body.budgetName.trim().toLowerCase(),
    expensename:req.body.expensename.trim().toLowerCase(),
    spentOn,
    amount:req.body.amount};
  
  const targetBudget=await Budget.findById(req.params.budgetId);
  if(!targetBudget){
    return res.status(404).json({message:"no such budget exists"});
  }
  if(Object.keys(expensedata).length==0){
    return res.status(400).json({message:"No data to add"});
  }
  if(req.id!==targetBudget.userId.toString()){
    return res.status(403).json({message:"Unauthorised user"});
  }
  if(!expensedata.expensename){
    return res.status(400).json({message:"expense name should be sent"});
  }
  if(!expensedata.spentOn){
    return res.status(400).json({message:"Spent On must be sent"});
  }
  const expenses=await Expense.find({
    budgetId:req.params.budgetId
  })

 let spent=0;
   for(const d of expenses){
    if(d.expensename===expensedata.expensename && new Date(expensedata.spentOn).toISOString().split("T")[0] ===
new Date(d.spentOn).toISOString().split("T")[0]){
      return res.status(400).json({message:"Expense name must be unique within a same day"});
    }
    spent=spent+d.amount;
   }
   if(expensedata.amount>(targetBudget.amount-spent)){
    return res.status(400).json({message:"Expense amount exceeding the allocated budget"});
   }
   const expenseDate = new Date(expensedata.spentOn);
expenseDate.setHours(0, 0, 0, 0);

const fromDate = new Date(targetBudget.from);
fromDate.setHours(0, 0, 0, 0);

const toDate = new Date(targetBudget.to);
toDate.setHours(0, 0, 0, 0);

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const today = formatter.format(new Date());

if (
    expenseDate > toDate ||
    expenseDate < fromDate ||
    expenseDate > today
) {
    return res.status(400).json({
        message: "Date must be within the budget timeline and cannot be after today"
    });
}
   

  if(!expensedata.amount || expensedata.amount<=0){
    return res.status(400).json({message:"amount should be positive to add"});
  }


  const datatoadd={
    userId:req.id,
    budgetId:req.params.budgetId,
    ...expensedata
  }


  const expensetobeadded=new Expense(datatoadd);
  await expensetobeadded.save();
 
  res.status(201).json(expensetobeadded);
}
module.exports=addexpenses;