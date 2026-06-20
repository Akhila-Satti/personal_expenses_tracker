let data= require("../../data");
const displayexpenses=(req, res) => {
  res.status(200).json(data.expenses);
}
module.exports=displayexpenses