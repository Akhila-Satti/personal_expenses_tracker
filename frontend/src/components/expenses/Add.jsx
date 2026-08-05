
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import '../../css/Expenses/AddExpenses.css';
import authorization from '../../api/authHeaders';
function AddExpense() {
  const [errorMessage,setErrorMessage]=useState("");
  const[budgetNames,setBudgetNames]=useState([]);
  const[loading,setLoading]=useState(true);
   const navigate=useNavigate();
useEffect(()=>{
 
    const findBudgetNames=async()=>{
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/budgets`,authorization());
      setBudgetNames(response.data);
      setLoading(false);
    }
    findBudgetNames();
  },[navigate])
 

  
  const NewExpense=async (e)=> {
    e.preventDefault();

    const f = e.target;
    const budgetId=f.budgetName.value;
    const budgetName=budgetNames.find(b=>b._id===budgetId)
    const d = {
      budgetName:budgetName.bn,
      expensename:f.expenseName.value,
      spentOn:f.spentOn.value,
      amount:f.amount.value,
    };
    
    try{
      
  
      setErrorMessage("")
    await axios.post(`${import.meta.env.VITE_API_URL}/api/expenses/${budgetId}`,d,authorization());
    
    navigate('/expenses');
  }
    catch(err){
      if(err.response && err.response.data){
      setErrorMessage(err.response.data.message);}
      else{
        setErrorMessage("Server Error");
      }
      
    }
  }
  if(loading){
    return(
      <div className='addexpenses'>
      <nav>
        <Link to='/expenses'>Back to Expenses</Link>
      </nav>
      <h4>Loading</h4>
      </div>
    )
  }
 else if( budgetNames.length===0){
    return(
       <div className='addexpenses'>
      <nav>
        <Link to='/expenses'>Back to Expenses</Link>
      </nav>
      <h3>No budgets to add Expenses</h3>
      </div>
    )
  }
  return (

    
    <div className='addexpenses'>
      <nav>
        <Link to='/expenses'>Back to Expenses</Link>
      </nav>
      <form onSubmit={NewExpense} id="expenseadd">
        <label htmlFor='budgetName'>BudgetName</label>
      
        <select id='budgetName' name="budgetName" required>
        { budgetNames && budgetNames.map((d)=>{
          return(
            <option key={d._id} value={d._id}>{d.bn}</option>
          )
        })}
        </select>

         <label htmlFor='expenseName'>Expense Name</label>
        <input type='text' name="expenseName" id="expenseName" required ></input>
        <label htmlFor='spentOn'>Spent On</label>
        <input type='date' name="spentOn" id="spentOn" required ></input>
        
        <label htmlFor='amount'>Amount</label>
        <input type='number' name="amount" id="amount"required></input>
        {errorMessage && errorMessage}
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
export default AddExpense;