import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../../css/authentication/Login.css'

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const loginCheck = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data.id;
      const userName=response.data.name;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName",userName);

      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Server error");
      }
    }
  };

  return (
    <div id="login">
      <div id="login_image">
        <img
          src="./src/assets/startupimage.png"
          alt="Personal_Expenses_Tracker"
        ></img>
      </div>
      <div id="loginpart">
      <div>
        <form onSubmit={loginCheck}>
          <label htmlFor="login_email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="login_email"
            autoComplete="true"
          ></input>
          <label htmlFor="login_password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="login_password"
            autoComplete="true"
          ></input>

          <button type="submit">Login</button>
        </form>
      </div>
      <div id="error">{errorMessage && errorMessage}</div>

      <div>
        Do not have an account?<NavLink to="/signup">SignUp</NavLink>
      </div>
      </div>
    </div>
  );
}

export default Login;
