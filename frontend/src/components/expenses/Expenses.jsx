import { useState } from "react";
import "../../css/Expenses.css";
import AddExpense from './Add';
import DisplayExpense from './Display';
function Expenses(props) {
  const [addExpense, setAddExpense] = useState(true);
  const [display, setDisplay] = useState(false);
  return (
    <>
      <div id="expensespanel">
        <div id="expensehandlers">
          <button
            className="expensesbtn"
            onClick={() => {
              setAddExpense(true);
              setDisplay(false);
            }}
          >
            Add Expense
          </button>

          <button
            className="expensesbtn"
            onClick={() => {
              setDisplay(true);
              setAddExpense(false);
            }}
          >
            Display Expense
          </button>
        </div>
        <div id="res">
          {addExpense && (
            <AddExpense
              expensedata={props.expensedata}
              setExpenseData={props.setExpenseData}
              budgetnames={props.budgetnames}
              budgetdata={props.budgetdata}
              setBudgetData={props.setBudgetData}
            />
          )}
          {display && (
            <DisplayExpense
              expensedata={props.expensedata}
              setExpenseData={props.setExpenseData}
              budgetnames={props.budgetnames}
              budgetdata={props.budgetdata}
              setBudgetData={props.setBudgetData}
            />
          )}
        </div>
      </div>
    </>
  );
}






export default Expenses;
