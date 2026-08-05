import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../css/Budgets/AddBudget.css';
import authorization from '../../api/authHeaders';
function AddBudget() {
  const [errorMessage,setErrorMessage]=useState("");
  const navigate=useNavigate();
  const NewBudget=async (e)=> {
    e.preventDefault();

    const f = e.target;
    const d = {
      bn:f.budgetName.value,
      from:f.fromdate.value,
      to:f.todate.value,
      amount:f.amount.value,

    };
    try{
      setErrorMessage("")
    await axios.post(`${import.meta.env.VITE_API_URL}/api/budgets/`,d,authorization());
    
    navigate('/budgets');
  }
    catch(err){
      if(err.response && err.response.data){
      setErrorMessage(err.response.data.message);}
      else{
        setErrorMessage("Server Error");
      }
      
    }
  }
  return (
    <div id='addbudgets'>
      <nav>
        <Link to='/budgets'>Back to Budgets</Link>
      </nav>
      <form onSubmit={NewBudget} id="budgetadd">
        <label htmlFor='budgetName'>BudgetName</label>
        <select id='budgetName' name='budgetName' required>
          <option value="">Select a budget category</option>
          <option value='food'>Food</option>
          <option value='clothing'>Clothing</option>
          <option value='travel'>Travel</option>
          <option value='entertainment'>Entertainment</option>
          <option value='rents'>Rents</option>
          <option value='loans'>Loans</option>
          <option value='others'>Others</option>
        </select>
        <label htmlFor='fromdate'>From</label>
        <input type='date' name="fromdate" id="fromdate" required ></input>
        <label htmlFor='todate'>To</label>
        <input type='date' name="todate" id="todate" required></input>
        <label htmlFor='amount'>Amount</label>
        <input type='number' name="amount" id="amount"required></input>
        {errorMessage && errorMessage}
        <button type="submit">Add budget</button>
      </form>
    </div>
  );
}
export default AddBudget;