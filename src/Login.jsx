import "./Login.css";
function Login() {
  return (
    <>
    <h1>Personal Expenses Tracker</h1>
      <div id="login">
        <form action="/backendlogin">
          <label htmlFor="username">UserName</label>
          <input type="text" id="username" name="username" required />
          <br />
          <label htmlFor="password">password</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
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
