import axios from "axios";
function DeleteExpense(
  bid,
  id,
  expensedata,
  setExpenseData,
  name,
  budgetname,
  amount,
  budgetdata,
  setBudgetData,
) {
  axios
    .delete(`http://localhost:5000/api/expenses/${id}`)
    .then((res) => {
        setExpenseData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

 
}
export default DeleteExpense;
