import { useState } from "react";
import EditExpenses from './Edit';
import DeleteExpense from './Delete';
function DisplayExpense(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>budget name</th>
        </tr>
      </thead>
      <tbody>
        <Display

          expensedata={props.expensedata}
          setExpenseData={props.setExpenseData}
          budgetnames={props.budgetnames}
          budgetdata={props.budgetdata}
          setBudgetData={props.setBudgetData}
        />
      </tbody>
    </table>
  );
}
function Display(props) {
  const [editExpense, setEditExpense] = useState(null);
  if (props.expensedata.length === 0) {
    return (
      <tr>
        <td colSpan="4">No data</td>
      </tr>
    );
  }
  const d = props.expensedata.map((b) => {
    return (
      <tr key={b.id}>
        <td>{b.name}</td>
        <td>{b.amount}</td>
        <td>{b.date}</td>
        <td>{b.budgetname}</td>
        <td>
          <img
            className="iconbtns"
            onClick={() => setEditExpense(b)}
            src="./src/assets/edit.jpeg"
            alt="edit expense"
          ></img>
        </td>
        <td>
          <img
            className="iconbtns"
            onClick={() =>
              DeleteExpense(b.bid,b.id,props.expensedata, props.setExpenseData, b.name,b.budgetname,b.amount,props.budgetdata,props.setBudgetData)
            }
            src="./src/assets/delete.jpeg"
            alt="delete expense"
          ></img>
        </td>
      </tr>
    );
  });
  if (editExpense == null) {
    return d;
  } else {
    return (
      <EditExpenses
        bid={editExpense.bid}
        id={editExpense.id}
        expensedata={props.expensedata}
        setExpenseData={props.setExpenseData}
        expensenametobechanged={editExpense.name}
        expenseamount={editExpense.amount}
        setEditExpense={setEditExpense}
        budgetnames={props.budgetnames}
        budgetdata={props.budgetdata}
        setBudgetData={props.setBudgetData}
      />
    );
  }
}
export default DisplayExpense;