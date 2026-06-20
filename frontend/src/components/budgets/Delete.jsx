import axios from "axios";
function DeleteBudget(
  budgetdata,
  setBudgetData,
  name,
  id,
  budgetnames,
  setBudgetNames,
  expensedata,
  setExpenseData,
) {
  axios
    .delete(`http://localhost:5000/api/budgets/${id}`)
    .then((res) => {
      setBudgetNames(res.data);
      axios.get("http://localhost:5000/api/budgets").then((res1) => {
        setBudgetData(res1.data);
      });

    })
    .catch((err) => {
      console.log(err);
    });

  
  setExpenseData(expensedata.filter((i) => i.bid != id));
}
export default DeleteBudget;
