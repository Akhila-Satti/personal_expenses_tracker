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
  setBudgetData(budgetdata.filter((i) => i.id !== id));
  setBudgetNames(budgetnames.filter((i) => i.id != id));
  setExpenseData(expensedata.filter((i)=>i.bid!=id));
}
export default DeleteBudget;