const Budget=require('../../models/Budget')
const Expense=require('../../models/Expense')
const mongoose=require("mongoose")
const deletebudgets= async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.deleteId)) {
      return res.status(400).send("Invalid Budget ID");
  }
  
  const deleteId=req.params.deleteId;
   const data=await Budget.findById(deleteId);
  if(!data){
    return res.status(404).json({
      message:"no data found"
    })
  }
  if(req.id!==data.userId.toString()){
    return res.status(403).json({
      message:"unauthorized user"
    })
  }
  await Expense.deleteMany({
    budgetId:deleteId
  })
 
  
  await data.deleteOne();
  res.status(200).json({
    message:"Deleted Successfully"
  });
}
module.exports=deletebudgets;