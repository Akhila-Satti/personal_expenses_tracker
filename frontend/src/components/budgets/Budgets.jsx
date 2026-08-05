import { useState } from "react";
import DisplayBudget from "./Display";
import { useNavigate } from "react-router-dom";

import '../../css/Budgets/Budgets.css'
function Budgets() {
  const [searchText, setSearchText] = useState("");
  const navigate=useNavigate();
  const addbudgets=()=>{
  navigate("/addbudget");
  }
  return (
    <div id="budgets-page">
      <div id="filterandadd">
       
          <input type="text" name="searchname" placeholder="search for a budget.." onChange={((e)=>setSearchText(e.target.value))}/>

        <button onClick={addbudgets}>AddBudgets</button>
      </div>
      <div id="displayItems">
      <DisplayBudget searchText={searchText}/>
      </div>
    </div>
  );
}
export default Budgets;