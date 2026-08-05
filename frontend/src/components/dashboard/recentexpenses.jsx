import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authorization from "../../api/authHeaders";
import axios from "axios";
function RecentExpenses() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const generateData = async () => {
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/latestexpenses`,
          authorization,
        );
        if (response.data.length === 0) {
          return setMessage("No data to display");
        }
        setError("");
        setMessage("");
        setData(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError("ServerError");
        }
      }
    };
    generateData();
  }, [navigate]);
  return (
    <>
  <h2>Today's Expenses</h2>

  {message && <p>{message}</p>}
  {error && <p>{error}</p>}

  <table>
    <thead>
      <tr>
        <th>Expense Name</th>
        <th>Budget Name</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      {data.map((d) => (
        <tr key={d._id}>
          <td>{d.expensename}</td>
          <td>{d.budgetName}</td>
          <td>₹{d.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</>
  );
}
export default RecentExpenses;
