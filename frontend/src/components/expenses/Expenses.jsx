import { useState } from "react";
import DisplayExpense from "./Display";
import { useNavigate } from "react-router-dom";
import "../../css/Expenses/Expenses.css"
function Expenses() {
  const [searchBudget, setSearchBudget] = useState("");
  const [searchExpense, setSearchExpense] = useState("");
  const [spentDate, setSpentDate] = useState("");
  const navigate = useNavigate();
  const addexpenses = () => {
    navigate("/addexpense");
  };
  return (
    <div id="expense-page">
      <div id="filterandadd">
        <select onChange={(e) => setSearchBudget(e.target.value)}>
          <option value="">Select a budget category</option>
          <option value="food">Food</option>
          <option value="clothing">Clothing</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="rents">Rents</option>
          <option value="loans">Loans</option>
          <option value="others">Others</option>
        </select>
        <input
          type="text"
          name="searchname"
          placeholder="search for an expense.."
          onChange={(e) => setSearchExpense(e.target.value)}
        />
        <input type="date" onChange={(e) => setSpentDate(e.target.value)} />

        <button onClick={addexpenses}>AddExpense</button>
      </div>
      <div id="displayItems">
        <DisplayExpense
          searchBudget={searchBudget}
          searchExpense={searchExpense}
          spentDate={spentDate}
        />
      </div>
    </div>
  );
}
export default Expenses;
