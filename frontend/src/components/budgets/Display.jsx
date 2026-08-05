import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Budgets/DisplayBudgets.css";
import authorization from "../../api/authHeaders";
function DisplayBudget(props) {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchbudgets = async () => {
      
      try {
        const response = await axios.get(
          `http://localhost:5000/api/budgets?search=${props.searchText}`,
          authorization(),
        );
        if (response.data.length === 0) {
          setErrorMessage("");
          setBudgets([]);
          return setMessage("No data to display");
        }
        setErrorMessage("");
        setMessage("");
        setBudgets(response.data);
      } catch (err) {
        if (err.response &&err.response.data) {
          setBudgets([]);
          setMessage("");
          setErrorMessage(err.response.data.message);
        } else {
          setBudgets([]);
          setMessage("");
          setErrorMessage("Server error");
        }
      }
    };
    fetchbudgets();
  }, [navigate, props.searchText]);
  return (
    <>
      {errorMessage && errorMessage}
      {message && message}
      {budgets.map((d) => {
        return (
          <div className="displayCards" key={d._id}>
            <h2>{d.bn}</h2>
            <h4>From: {new Date(d.from).toLocaleDateString()}</h4>
            <h4>To: {new Date(d.to).toLocaleDateString()}</h4>
            <h4>Amount: Rs.{d.amount}</h4>

            <div className="card-actions">
              <button>
                <Link to={`/editbudget/${d._id}`}>Edit</Link>
              </button>
              <button>
                <Link to={`/deletebudget/${d._id}`}>Delete</Link>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default DisplayBudget;
