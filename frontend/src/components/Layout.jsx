import { Link, useNavigate, Outlet } from "react-router-dom";
import "../css/Layout.css";
import { useState, useEffect } from "react";
import logoutImage from "../assets/logout.jpg"
function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return navigate("/");
  };
  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div id="container">
      <div id="sidenav">
        <nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/budgets">Budgets</Link>
        </nav>
        <div id="changetheme">
          <span>Theme</span>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={changeTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
        <button id="logout" onClick={logout}>
          Logout
          <img src={logoutImage} alt="logout" />
        </button>
      </div>

      {/* Outlet renders Dashboard, Budgets, Expenses, etc., on the right side */}
      <main id="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
