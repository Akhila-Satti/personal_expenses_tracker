import { useState } from "react";
import "./Budgets.css";
function Budgets(props) {
  const [addBudget, setAddBudget] = useState(false);
  const [initial, setInitial] = useState(true);
  const [displayBudget, setDisplayBudget] = useState(false);

  function NewBudget(e) {
    e.preventDefault();
    const f = e.target;
    const d = {
      bn: f.budgetName.value,
      duration:
        (new Date(f.to.value) - new Date(f.from.value)) /
          (1000 * 60 * 60 * 24) +
        1,
      to: f.to.value,
      from: f.from.value,
      amount: Number(f.amount.value),
      spent:0,
      remaining:Number(f.amount.value),
    };
    props.setBudgetData([...props.budgetdata, d]);
    props.setBudgetNames([...props.budgetnames, d.bn]);
    f.reset();
  }
  return (
    <>
      <div id="budgetspanel">
        <div id="budgetssection">
          <button
            className="budgetsbtn"
            onClick={() => {
              setAddBudget(true);
              setDisplayBudget(false);
              setInitial(false);
            }}
          >
            New Budget
          </button>
          <button
            className="budgetsbtn"
            onClick={() => {
              setDisplayBudget(true);
              setAddBudget(false);
              setInitial(false);
            }}
          >
            Display Budget
          </button>
        </div>
        <div id="res">
          {initial && <SetUp />}
          {addBudget && <AddBudget NewBudget={NewBudget} />}
          {displayBudget && (
            <DisplayBudget
              budgetdata={props.budgetdata}
              setBudgetData={props.setBudgetData}
              budgetnames={props.budgetnames}
              setBudgetNames={props.setBudgetNames}
              expensedata={props.expensedata}
              setExpenseData={props.setExpenseData}
            />
          )}
        </div>
      </div>
    </>
  );
}

function AddBudget(props) {
  return (
    <>
      <form onSubmit={props.NewBudget} id="budgetsadding">
        <table>
          <thead>
            <tr>
              <th rowSpan="2">
                <label htmlFor="budgetName">BudgetName</label>
              </th>

              <th colSpan="2">
                Duration<hr></hr>
              </th>
              <th rowSpan="2">
                <label htmlFor="amount">Amount</label>
              </th>
            </tr>
            <tr>
              <th>
                <label htmlFor="from">From</label>
              </th>
              <th>
                <label htmlFor="to">To</label>
              </th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" id="budgetName" name="budgetName" required />
              </td>
              <td>
                <input type="date" id="from" name="from" required />
              </td>
              <td>
                <input type="date" id="to" name="to" required />
              </td>
              <td>
                <input type="number" id="amount" name="amount" required />
              </td>
              <td>
                
              </td>
              <td>
                <button className="budgetsbtn" type="submit">
                  add this budget
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
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
           <th>
                Spent
              </th>
              <th>
                Remaining
              </th>
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
  if (props.budgetdata.length === 0) {
    return (
      <tr colSpan="7">
        <td>No budgets added yet.</td>
      </tr>
    );
  }
  const d = props.budgetdata.map((b) => {
    return (
      <tr key={b.bn}>
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
        budgetnames={props.budgetnames}
        setBudgetNames={props.setBudgetNames}
        editbudget={editbudget}
        budgetdata={props.budgetdata}
        setBudgetData={props.setBudgetData}
        budgetnametobechanged={editbudget.bn}
      />
    );
  }
}
function EditBudget(props) {
  const [editName, setEditName] = useState(props.editbudget.bn);
  const [fromDate, setFromDate] = useState(props.editbudget.from);
  const [toDate, setToDate] = useState(props.editbudget.to);
  const [amount, setAmount] = useState(props.editbudget.amount);

  // 2. Safely calculate duration completely in JavaScript memory
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const duration =
    isNaN(start) || isNaN(end)
      ? 0
      : Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  function changeBudget(e) {
    e.preventDefault();
    const f = e.target;
    const newb = {
      bn: f.editbudgetname.value,
      duration: f.editduration.value,
      to: f.editto.value,
      from: f.editfrom.value,
      amount: f.editamt.value,
    };
    const newbud = props.budgetdata.map((b) => {
      if (b.bn == props.budgetnametobechanged) {
        return newb;
      } else {
        return b;
      }
    });
    const newbudnames = props.budgetnames.map((b) => {
      if (b == props.budgetnametobechanged) {
        return newb.bn;
      } else {
        return b;
      }
    });
    props.setBudgetData(newbud);
    props.setBudgetNames(newbudnames);
    alert("edited");
  }
  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={changeBudget}>
          <input
            type="text"
            value={editName}
            onChange={(e) => {
              e.preventDefault();
              setEditName(e.target.value);
            }}
            id="editbudgetname"
            name="editbudgetname"
          ></input>
          <input
            type="number"
            id="editduration"
            name="editduration"
            value={duration}
            readOnly
          ></input>
          <input
            type="date"
            id="editto"
            name="editto"
            value={toDate}
            onChange={(e) => {
              e.preventDefault();
              setToDate(e.target.value);
            }}
          ></input>
          <input
            type="date"
            id="editfrom"
            name="editfrom"
            value={fromDate}
            onChange={(e) => {
              e.preventDefault();
              setFromDate(e.target.value);
            }}
          ></input>
          <input
            type="number"
            id="editamt"
            name="editamt"
            value={amount}
            onChange={(e) => {
              e.preventDefault();
              setAmount(e.target.value);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </td>
    </tr>
  );
}
function DeleteBudget(
  budgetdata,
  setBudgetData,
  name,
  budgetnames,
  setBudgetNames,
  expensedata,
  setExpenseData,
) {
  setBudgetData(budgetdata.filter((i) => i.bn !== name));
  setBudgetNames(budgetnames.filter((i) => i != name));
  setExpenseData(expensedata.filter((i)=>i.budgetname!=name));
}
function SetUp() {
  const m = new Date().getMonth();
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  return (
    <>
      <h5>Come on !Lets add the budget for this {months[m]}</h5>
      <h4>Already added?</h4>
      <p>Add today expense (^///^)</p>
      <h3> want to edit or delete? less go</h3>
    </>
  );
}
export default Budgets;
