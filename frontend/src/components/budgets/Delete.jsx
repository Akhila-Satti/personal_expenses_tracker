import axios from "axios";
import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authorization from "../../api/authHeaders";
function DeleteBudget() {
  const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const deleteBudget = async () => {
      
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/budgets/${params.deleteId}`,
          authorization(),
        );
        navigate("/budgets");
      } catch (err) {
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Server Error");
        }
      }
    };
    deleteBudget();
  }, [navigate, params.deleteId]);

  return <>{errorMessage && errorMessage}</>;
}
export default DeleteBudget;
