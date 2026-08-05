const Budget = require("../../models/Budget");
const Expense=require('../../models/Expense');
const mongoose=require("mongoose")
const editbudgets = async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.updateId)) {
      return res.status(400).json({message:"Invalid Budget ID"});
  }
  const updateData = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "no updation field sent",
    });
  }

  const data = await Budget.findById(req.params.updateId);
  if (!data) {
    return res.status(404).json({
      message: "No data to update",
    });
  }
  if (req.id !== data.userId.toString()) {
    return res.status(403).json({
      message: "unauthorised user",
    });
  }
  const expenses=await Expense.find({
    budgetId:req.params.updateId,
  })
  let fromdata=null;
  if(updateData.from){
    fromdata=new Date(updateData.from);
    fromdata.setHours(0,0,0,0);
  }
  let todata=null;
  if(updateData.to){
    todata=new Date(updateData.to);
    todata.setHours(0,0,0,0);
  }
  const updation = {
    bn: (updateData.bn ?? data.bn).trim().toLowerCase(),
    from: (fromdata??data.from),
    to: todata ?? data.to,
    amount: updateData.amount ?? data.amount,
  };
  

  if (!updation.amount || updation.amount <= 0 ) {
    return res.status(400).json({message:"Amount should be positive"});
  }
  if (!updation.from || !updation.to) {
    return res.status(400).json({message:"Both dates are required"});
  }

  if (new Date(updation.to) <= new Date(updation.from)) {
    return res.status(400).json({message:"To date should be after from date"});
  }
  const alreadyData = await Budget.find({
    userId: req.id,
    bn: updation.bn,
  });
  for (const d of alreadyData) {
    if (d._id.toString() === req.params.updateId) continue;
    const existingFrom = new Date(d.from);
    const existingTo = new Date(d.to);

    const newFrom = new Date(updation.from);
    const newTo = new Date(updation.to);

    if (existingFrom <= newTo && existingTo >= newFrom) {
      return res.status(400).json({message:"Already budget exists for the given period"});
    }
  }
  let spent=0;
  for(const d of expenses){
    if(new Date(d.spentOn)>new Date(updation.to)|| new Date(d.spentOn)<new Date(updation.from)){
      return res.status(400).json({message:"the budget timeline is bypassing the expenses spent dates"});
    }
    spent=spent+d.amount;
  }

  if(updation.amount<spent){
    return res.status(400).json({message:"the amount allocated is less than the spent amount"});
  }
  await data.updateOne(updation);

  res.status(200).json({
    message: "updated Successfully",
  });
};
module.exports = editbudgets;
