import { useState, useEffect } from "react";
import DeleteBudget from "./Delete";
import axios from "axios";
import EditBudget from "./Edit";
function DisplayBudget(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Budget Name</th>
          <th>Duration</th>
          <th>To</th>
          <th>From</th>
          <th>Amount</th>
          <th>Spent</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>
        <Display
          budgetdata={props.budgetdata}
          setBudgetData={props.setBudgetData}
          budgetnames={props.budgetnames}
          setBudgetNames={props.setBudgetNames}
          expensedata={props.expensedata}
          setExpenseData={props.setExpenseData}
        />
      </tbody>
    </table>
  );
}
function Display(props) {
  const [editbudget, setEditBudget] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/budgets/")
      .then((res) => {
        props.setBudgetData(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (props.budgetdata.length === 0) {
    return (
      <tr colSpan="7">
        <td>No budgets added yet.</td>
      </tr>
    );
  }

  const d = props.budgetdata.map((b) => {
    return (
      <tr key={b.id}>
        <td>{b.bn}</td>
        <td>{b.duration} days</td>
        <td>{b.to}</td>
        <td>{b.from}</td>
        <td>{b.amount}</td>
        <td>{b.spent}</td>
        <td>{b.remaining}</td>
        <td>
          <img
            className="iconbtns"
            src="./src/assets/edit.jpeg"
            alt="edit"
            onClick={() => setEditBudget(b)}
          ></img>
        </td>
        <td>
          <img
            className="iconbtns"
            src="./src/assets/delete.jpeg"
            alt="delete"
            onClick={() =>
              DeleteBudget(
                props.budgetdata,
                props.setBudgetData,
                b.bn,
                b.id,
                props.budgetnames,
                props.setBudgetNames,
                props.expensedata,
                props.setExpenseData,
              )
            }
          ></img>
        </td>
      </tr>
    );
  });
  if (editbudget == null) {
    return d;
  } else {
    return (
      <EditBudget
        spent={editbudget.spent}
        budgetid={editbudget.id}
        budgetnames={props.budgetnames}
        setBudgetNames={props.setBudgetNames}
        editbudget={editbudget}
        setEditBudget={setEditBudget}
        budgetdata={props.budgetdata}
        setBudgetData={props.setBudgetData}
        budgetnametobechanged={editbudget.bn}
      />
    );
  }
}
export default DisplayBudget;
