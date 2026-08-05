import Login from "./authentication/Login.jsx";
import Signup from "./authentication/Signup.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import Budgets from "./budgets/Budgets.jsx";
import Layout from "./Layout.jsx";
import AddBudget from "./budgets/Add.jsx";
import EditBudget from "./budgets/Edit.jsx";
import DeleteBudget from "./budgets/Delete.jsx";
import Expenses from "./expenses/Expenses.jsx";
import AddExpense from "./expenses/Add.jsx";
import EditExpense from "./expenses/Edit.jsx";
import DeleteExpense from "./expenses/Delete.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/addbudget" element={<AddBudget />} />
          <Route path="/editbudget/:updateId" element={<EditBudget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route
            path="/editexpense/:budgetId/:expenseId"
            element={<EditExpense />}
          />

          <Route path="/deletebudget/:deleteId" element={<DeleteBudget />} />
          <Route
            path="/deleteexpense/:budgetId/:deleteId"
            element={<DeleteExpense />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
