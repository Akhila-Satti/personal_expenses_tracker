import axios from "axios";
import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authorization from "../../api/authHeaders";
function DeleteExpense() {
  const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const deleteExpense = async () => {
      
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/expenses/${params.budgetId}/${params.deleteId}`,
          authorization(),
        );
        navigate("/expenses");
      } catch (err) {
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Server Error");
        }
      }
    };
    deleteExpense();
  }, [navigate,params.budgetId,params.deleteId]);

  return <>{errorMessage && errorMessage}</>;
}
export default DeleteExpense;
