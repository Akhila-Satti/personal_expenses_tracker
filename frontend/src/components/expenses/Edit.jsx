import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../css/Expenses/EditExpense.css";
import authorization from "../../api/authHeaders";
function EditExpense() {
  const [errorMessage, setErrorMessage] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [spentOn, setSpentOn] = useState("");
  const [amount, setAmount] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
   
    const prevdata = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/expenses/${params.expenseId}`,
          authorization(),
        );
       
        setExpenseName(response.data.expensename);
        setSpentOn(response.data.spentOn.split("T")[0]);

        setAmount(response.data.amount);
      } catch {
        setErrorMessage("Server Error");
      }
    };
    prevdata();
  }, [navigate, params.expenseId]);
  

  const NewExpense = async (e) => {
    e.preventDefault();

    const d = {
      expensename: expenseName,
      spentOn: spentOn,
      amount: amount,
    };

    try {
      
      setErrorMessage("");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/expenses/${params.budgetId}/${params.expenseId}`,
        d,
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

  return (
    <div className="editexpenses">
      <nav>
        <Link to="/expenses">Back to Expenses</Link>
      </nav>
      <form onSubmit={NewExpense} id="expenseedit">
        <label htmlFor="expenseName">Expense Name</label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        ></input>
        <label htmlFor="spentOn">Spent On</label>
        <input
          type="date"
          name="spentOn"
          id="spentOn"
          value={spentOn}
          onChange={(e) => setSpentOn(e.target.value)}
        ></input>

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        {errorMessage && errorMessage}
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
}
export default EditExpense;
