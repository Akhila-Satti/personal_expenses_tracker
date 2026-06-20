import { useState } from "react";
import "../../css/Budgets.css";
import DisplayBudget from "./Display";
import AddBudget from "./Add";
function Budgets(props) {
  const [addBudget, setAddBudget] = useState(false);
  const [initial, setInitial] = useState(true);
  const [displayBudget, setDisplayBudget] = useState(false);
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
          {addBudget && <AddBudget setBudgetNames={props.setBudgetNames} setBudgetData={props.setBudgetData} budgetnames={props.budgetnames} budgetdata={props.budgetdata} />}
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
