import { useState } from "react";
import axios from "axios";
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
      id: props.budgetid,
      bn: f.editbudgetname.value,
      duration: f.editduration.value,
      to: f.editto.value,
      from: f.editfrom.value,
      amount: Number(f.editamt.value),
      spent: props.spent,
      remaining: Number(f.editamt.value) - props.spent,
    };
   
    axios
      .put(`http://localhost:5000/api/budgets/${newb.id}`, newb)
      .then((res) => {
         props.setBudgetNames(res.data);
        })
      .catch((err) => console.log(err));
    
    
    
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
            id="editfrom"
            name="editfrom"
            value={fromDate}
            onChange={(e) => {
              e.preventDefault();
              setFromDate(e.target.value);
            }}
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
export default EditBudget;
