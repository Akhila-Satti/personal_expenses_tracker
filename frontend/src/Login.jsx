import "./Login.css";
function Login(props) {
  return (
    <>
    <h1>Personal Expenses Tracker</h1>
      <div id="login">
        <form onSubmit={(e)=>{
          e.preventDefault();
          props.setLogin(true);
        }}>
          <label htmlFor="login-username">UserName</label>
          <input type="text" id="login-username" name="username" required autoComplete="true"/>
          <br />
          <label htmlFor="login-password">password</label>
          <input type="password" id="login-password" name="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={()=>{
          props.setSignUp(false);
          props.setLogin(true);
        }}>Sign Up </button>
        <div id="altlog">
          <h4>Login with</h4>

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
export default Login;
