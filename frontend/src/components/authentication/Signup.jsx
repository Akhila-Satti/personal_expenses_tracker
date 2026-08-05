import {  NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import '../../css/authentication/Signup.css'
function SignUp(){
  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const doSignUp= async (e)=>{
    e.preventDefault();
    const firstname=e.target.firstname.value;
    const lastname=e.target.lastname.value;
    const  email=e.target.email.value;
    const password=e.target.password.value;
    try{
      setErrorMessage("");
      await axios.post('http://localhost:5000/api/signup',{firstname,lastname,email,password});
      navigate('/');

    }catch (err){
      if (err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Server error");
      }
    }
  }
  return(
    <div id="signup">
    <div id="signup_image">
        <img
          src="./src/assets/startupimage.png"
          alt="Personal_Expenses_Tracker_Image"
        ></img>
      </div>
      <div id="signuppart">
      <div>
        <form onSubmit={doSignUp}>
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            required
            name="firstname"
            id="firstname"
          ></input>
          <label htmlFor="lastname">LastName</label>
          <input
            type="text"
            required
            name="lastname"
            id="lastname"
            autoComplete="true"
          ></input>
          <label htmlFor="login_email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="login-email"
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
          <button type="submit">SignUp</button>
        </form>
      </div>
       <div id="error">{errorMessage && errorMessage}</div>
      <div>
        Already have an account?<NavLink to="/">Login</NavLink>
      </div>
      </div>
    </div>
  )
}
export default SignUp;
