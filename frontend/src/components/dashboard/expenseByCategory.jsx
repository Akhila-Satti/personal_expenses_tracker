import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  { ResponsiveContainer,PieChart,Pie, Cell, Tooltip } from "recharts";
import authorization from "../../api/authHeaders";
function ExpenseByCategory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF6699",
  "#66CC33",
  "#FF4444",
];
  const navigate = useNavigate();
  useEffect(() => {
    const generateData = async () => {
      
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/budgetcontribution",
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
      <div style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="spent"
        nameKey="budgetName"
        cx="50%"
        cy="50%"
        outerRadius={90}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
    </>
  );
}
export default ExpenseByCategory;
