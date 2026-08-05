import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import authorization from "../../api/authHeaders";
import axios from "axios";
function TotalValue() {
  const [data, setData] = useState({});
  const[message,setMessage]=useState("");
  const[error,setError]=useState("");
  const navigate=useNavigate();
  useEffect(() => {
    const generateData = async () => {
      
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/totalvalue",
          authorization(),
        );
       if (!response.data) {
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
      <h1>Stats</h1>
      {error&&error}
      {message&&message}
      <h4>Total Budget: ₹{data.totalBudget}</h4>
      <h4>Total Expense:₹{data.totalExpense}</h4>
    </>
  );
}
export default TotalValue;
