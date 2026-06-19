function DeleteExpense(bid,id,expensedata, setExpenseData, name,budgetname,amount,budgetdata,setBudgetData) {
  setExpenseData(expensedata.filter((item) => item.id !== id));
  const updatedBudgets = budgetdata.map((b) => {
      if (b.id === bid) {
        // Return a completely new object copy with safe math overrides
        return {
          ...b,
          spent: (b.spent || 0) - amount,
          remaining: (b.remaining || b.amount) +amount,
        };
      }
      return b; // Return un-targeted elements as they were
    });
    setBudgetData(updatedBudgets);
}
export default DeleteExpense;