let data = require("../../data");
const displaybudgets=(req, res) => {
  
  res.status(200).json(data.budgets);
}
module.exports=displaybudgets;