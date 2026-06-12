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
        (new Date(f.to.value) - new Date(f.from.value)) / (1000 * 60 * 60 * 24),
      to: f.to.value,
      from: f.from.value,
      amount: Number(f.amount.value),
    };
    props.setBudgetData([...props.budgetdata, d]);
    props.setBudgetNames([...props.budgetnames,d.bn]);
    f.reset();
  }
  return (
    <>
      <div id="budgetspanel">
        <div id="budgetssection">
          <button className="budgetsbtn"
            onClick={() => {
              setAddBudget(true);
              setDisplayBudget(false);
              setInitial(false);
            }}
          >
            New Budget
          </button>
          <button className="budgetsbtn"
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
          {displayBudget && <DisplayBudget budgetdata={props.budgetdata} setBudgetData={props.setBudgetData} budgetnames={props.budgetnames} setBudgetNames={props.setBudgetNames}/>}
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
                <input type="text" id="budgetName" name="budgetName" required/>
              </td>
              <td>
                <input type="date" id="from" name="from" required/>
              </td>
              <td>
                <input type="date" id="to" name="to" required/>
              </td>
              <td>
                <input type="number" id="amount" name="amount" required/>
              </td>
              <td>
                <button className="budgetsbtn" type="submit">add this budget</button>
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
        </tr>
      </thead>
      <tbody>
        <Display budgetdata={props.budgetdata} setBudgetData={props.setBudgetData} budgetnames={props.budgetnames} setBudgetNames={props.setBudgetNames}/>
      </tbody>
    </table>
  );
}
function Display(props) {
  if (props.budgetdata.length === 0) {
    return (
      <tr colSpan="4">
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
        <td><img className="iconbtns" src="./src/assets/edit.jpeg" alt="edit" onClick={EditExpense}></img></td>
        <td><img className="iconbtns" src="./src/assets/delete.jpeg" alt="delete" onClick={()=>DeleteExpense(props.budgetdata,props.setBudgetData,b.bn,props.budgetnames,props.setBudgetNames)}></img></td>
      </tr>
    );
  });
  return d;
}
function EditExpense(){
  alert("hiii girlll");
}
function DeleteExpense(budgetdata,setBudgetData,name,budgetnames,setBudgetNames){

  setBudgetData(budgetdata.filter((i)=>i.bn!==name));
  setBudgetNames(budgetnames.filter((i)=>i!=name));
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
