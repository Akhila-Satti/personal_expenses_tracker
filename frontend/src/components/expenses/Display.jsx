import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Expenses/DisplayExpenses.css";
import authorization from "../../api/authHeaders";
function DisplayExpense(props) {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchexpenses = async () => {
      
      try {
        const response = await axios.get(
          `http://localhost:5000/api/expenses?searchBudget=${props.searchBudget}&searchExpense=${props.searchExpense}&spentDate=${props.spentDate}`,
          authorization(),
        );
        if (response.data.length === 0) {
          setErrorMessage("");
          setExpenses([]);
          return setMessage("No expense to display");
        }
        setErrorMessage("");
        setMessage("");
        setExpenses(response.data);
      } catch (err) {
        if (err.response &&err.response.data) {
          setExpenses([]);
          setMessage("");
          setErrorMessage(err.response.data.message);
        } else {
          setExpenses([]);
          setMessage("");
          setErrorMessage("Server error");
        }
      }
    };
    fetchexpenses();
  }, [navigate, props.searchBudget,props.searchExpense,props.spentDate]);
  return (
    <>
      {errorMessage && errorMessage}
      {message && message}
      {expenses.map((d) => {
        return (
          <div className="displayCards" key={d._id}>
            <h2>{d.expensename}</h2>
            <h3>{d.budgetName}</h3>
            <h4>Spent on: {new Date(d.spentOn).toLocaleDateString()}</h4>
            <h4>Amount: Rs.{d.amount}</h4>
            <div className="card-actions">
              <button>
                <Link to={`/editexpense/${d.budgetId}/${d._id}`}>Edit</Link>
              </button>
              <button>
                <Link to={`/deleteexpense/${d.budgetId}/${d._id}`}>Delete</Link>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default DisplayExpense;
