import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link ,useParams} from "react-router-dom";
import '../../css/Budgets/EditBudget.css'
import authorization from "../../api/authHeaders";
function EditBudget() {
  const [errorMessage,setErrorMessage]=useState("");
  const [budgetName,setBudgetName]=useState("");
  const[fromdate,setFromdate]=useState("");
  const[todate,setTodate]=useState("");
  const[amount,setAmount]=useState("");
  const navigate=useNavigate();
  const params=useParams();
  
  useEffect(()=>{
     
    const prevdata=async ()=>{
      try{
      const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/budgets/${params.updateId}`,authorization());
      setBudgetName(response.data.bn);
setFromdate(response.data.from.split("T")[0]);
setTodate(response.data.to.split("T")[0]);
setAmount(response.data.amount);
      }catch{
        setErrorMessage("Server Error");
      }
    }
    prevdata();
  },[navigate, params.updateId])

  
const editBudget= async(e)=>{
  e.preventDefault();
  

  const d = {
  bn: budgetName,
  from: fromdate,
  to: todate,
  amount,
};


    
    try{
      setErrorMessage("")
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/budgets/${params.updateId}`,d,authorization());
    
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
    <div id='editbudgets'>
      <nav>
        <Link to='/budgets'>Back to Budgets</Link>
      </nav>
      <form onSubmit={editBudget} id="budgetadd">
        <label htmlFor='budgetName'>BudgetName</label>
        <select id='budgetName' name='budgetName' value={budgetName}
  onChange={(e) => setBudgetName(e.target.value)}>
          <option value="">Select a budget category</option>
          <option value='food'>Food</option>
          <option value='clothing'>Clothing</option>
          <option value='travel'>Travel</option>
          <option value='entertainment'>Entertainment</option>
          <option value='rents'>Rents</option>
          <option value='loans'>Loans</option>
          <option value='others'>Others</option>
        </select>
        <label htmlFor='fromdate' >From</label>
        <input type='date' name="fromdate" id="fromdate" value={fromdate}
  onChange={(e) => setFromdate(e.target.value)}></input>
        <label htmlFor='todate' >To</label>
        <input type='date' name="todate" id="todate" value={todate}
  onChange={(e) => setTodate(e.target.value)}></input>
        <label htmlFor='amount'>Amount</label>
        <input type='number' name="amount" id="amount" value={amount}
  onChange={(e) => setAmount(e.target.value)}></input>
        {errorMessage && errorMessage}
        <button type="submit">Edit budget</button>
      </form>
    </div>
  );
}
export default EditBudget;
