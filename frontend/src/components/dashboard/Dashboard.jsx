import "../../css/Dashboard.css";
import ExpenseByCategory from "./expenseByCategory";
import TotalValue from "./totalvalue";
import BudgetvsExpenses from "./budgetvsexpenses";
import RecentExpenses from "./recentexpenses";
import { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/quote`
        );
        setQuote(res.data.quote);
        setAuthor(res.data.author);
      } catch {
        setQuote("Track every rupee. Every small saving counts.");
        setAuthor("Expense Tracker");
      }
    };

    getQuote();
  }, []);
  return (
    <div id="dashboard">
      <header>
        <h2>
          Hello{", "}
          {localStorage.getItem("userName") && localStorage.getItem("userName")}
        </h2>
        <h4>{`" ${quote} "`}</h4>
        <h5>{`Author:${author}`}</h5>
      </header>
      <main>
        <div id="totalvalue">
          <TotalValue />
        </div>
        <div id="expenseByCategory">
          <ExpenseByCategory />
        </div>
        <div id="budgetvsexpenses">
          <BudgetvsExpenses />
        </div>
        <div id="recentexpenses">
          <RecentExpenses />
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
