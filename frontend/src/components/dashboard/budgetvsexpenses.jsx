import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authorization from "../../api/authHeaders";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip ,Rectangle} from "recharts";
function BudgetvsExpenses() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const generateData = async () => {
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/budgetvsexpenses`,
          authorization(),
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
      <h1>Budget Vs Expense</h1>
      {message && message}
      {error && error}
      <div style={{ width: "100%", height: 350 }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <XAxis dataKey="budgetName" />
      <YAxis />
      <Tooltip cursor={{ fill: "transparent" }} />
      <Bar dataKey="budgetamount" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
      <Bar dataKey="spent" fill="#82ca9d" activeBar={<Rectangle fill="green" stroke="purple"/>}/>
    </BarChart>
  </ResponsiveContainer>
</div>
    </>
  );
}
export default BudgetvsExpenses;
