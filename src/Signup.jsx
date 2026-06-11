import "./Signup.css"
function Signup(props) {
  return (
    <>
    <h1>Personal Expenses Tracker</h1>
      <div id="signup">
        <form onSubmit={()=>{
          props.setSignUp(true);
        }}>
        <label htmlFor="firstname">FirstName</label>
          <input type="text" id="firstname" name="firstname" required /><br />
          <label htmlFor="lastname">LastName</label>
          <input type="text" id="lastname" name="lastname" required /><br />
          <label htmlFor="signup-username">UserName</label>
          <input type="text" id="signup-username" name="username" required />
          <br />
          <label htmlFor="signup-password">password</label>
          <input type="password" id="signup-password" name="password" required />
          <br />
          <button type="submit">Sign Up</button>
        </form>
         <button onClick={()=>{
          props.setSignUp(true);
          props.setLogin(false);
        }}>Login</button>
        <div id="altlog">
          <h4>Sign Up with</h4>
          <section>
            <a href="google">
              <img src="./src/assets/google.jpeg" alt="google" />
            </a>
            <a href="outlook">
              <img src="./src/assets/outlook.jpeg" alt="outlook" />
            </a>
            <a href="yahoo">
              <img src="./src/assets/yahoo.png" alt="yahoo" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
export default Signup;
