import { useState } from "react";
import "./Expenses.css";
function Expenses(props) {
  const [addExpense, setAddExpense] = useState(true);
  const [display, setDisplay] = useState(false);
  return (
    <>
      <div id="expensespanel">
        <div id="expensehandlers">
          <button className="expensesbtn"
            onClick={() => {
              setAddExpense(true);
              setDisplay(false);
            }}
          >
            Add Expense
          </button>

          <button className="expensesbtn"
            onClick={() => {
              setDisplay(true);
              setAddExpense(false);
            }}
          >
            Display Expense
          </button>
        </div>
        <div id="res">
          {addExpense && <AddExpense expensedata={props.expensedata} setExpenseData={props.setExpenseData} budgetnames={props.budgetnames}/>}
          {display && <DisplayExpense expensedata={props.expensedata} setExpenseData={props.setExpenseData} budgetnames={props.budgetnames}/>}
        </div>
      </div>
    </>
  );
}

function AddExpense(props) {
  function NewExpense(e) {
    e.preventDefault();
    const f = e.target;
    const d = {
      name: f.ExpenseName.value,
      amount: Number(f.amount.value),
      date: f.date.value,
      budgetname: f.budgetname.value,
    };
    props.setExpenseData([...props.expensedata, d]);
    f.reset();
    alert("added succesfully!");
  }

  return (
    <form onSubmit={NewExpense} id="addingexpense">
      <table>
        <thead>
          <tr>
            <th>
              <label htmlFor="ExpenseName">Expense Name</label>
            </th>
            <th>
              <label htmlFor="amount">Amount</label>
            </th>
            <th>
              <label htmlFor="date">Date</label>
            </th>
            <th>
              <label htmlFor="budgetname">BudgetName</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                id="ExpenseName"
                name="ExpenseName"
                required
              ></input>
            </td>
            <td>
              <input type="number" id="amount" name="amount" required></input>
            </td>
            <td>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              ></input>
            </td>
            <td>
              <select id="budgetname" name="budgetname" required> 
                <option value="">select a budget</option>
                {
                  props.budgetnames.map((item)=><option key={item} value={item}>{item}</option>)
                }
              </select>
            </td>
            <td>
              <button className="expensesbtn" type="submit">Add the expense</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

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
        <Display expensedata={props.expensedata} setExpenseData={props.setExpenseData} budgetnames={props.budgetnames} />
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
      <tr key={b.name}>
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
            onClick={() => DeleteExpense(props.expensedata, props.setExpenseData, b.name)}
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
        expensedata={props.expensedata}
        setExpenseData={props.setExpenseData}
        expensenametobechanged={editExpense.name}
        setEditExpense={setEditExpense}
        budgetnames={props.budgetnames}
      />
    );
  }
}
function EditExpenses(props) {
  console.log("edited");
  function ChangeExpense(e) {
    e.preventDefault();
    const f = e.target;
    const newd = {
      name: f.expensename.value,
      amount: Number(f.amt.value),
      date: f.date.value,
      budgetname: f.budgetname.value,
    };
    const newData = props.expensedata.map((d) => {
      if (d.name === props.expensenametobechanged) {
        return newd;
      } else {
        return d;
      }
    });
    props.setExpenseData(newData);
    props.setEditExpense(null);
  }
  return (
    <>
      <tr>
        <td colSpan="4">
          <form onSubmit={ChangeExpense}>
            <input
              type="text"
              placeholder="Enter expense name"
              name="expensename"
            ></input>

            <input
              type="Number"
              placeholder="enter expense amount"
              name="amt"
            ></input>

            <input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            ></input>

            <select name="budgetname">
              <option value="">select the value</option>
              {
                props.budgetnames.map((item)=><option key={item} value={item}>{item}</option>)
              }
            </select>

            <button type="submit">Submit</button>
          </form>
        </td>
      </tr>
    </>
  );
}
function DeleteExpense(expensedata, setExpenseData, name) {
  setExpenseData(expensedata.filter((item) => item.name !== name));
}
export default Expenses;
