import "./Signup.css"
function Signup() {
  return (
    <>
    <h1>Personal Expenses Tracker</h1>
      <div id="signup">
        <form action="/backendlogin">
        <label htmlFor="firstname">FirstName</label>
          <input type="text" id="firstname" name="firstname" required /><br />
          <label htmlFor="lastname">LastName</label>
          <input type="text" id="lastname" name="lastname" required /><br />
          <label htmlFor="username">UserName</label>
          <input type="text" id="username" name="username" required />
          <br />
          <label htmlFor="password">password</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Sign Up</button>
        </form>
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
