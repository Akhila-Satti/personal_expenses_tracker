import { useState } from "react";
import "./App.css";
import Budgets from './Budgets.jsx';
import Expenses from "./Expenses.jsx";
import Sidenav from "./Sidenav.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
function App() {
  const [page ,setPage]=useState("default");
  const[login,setLogin]=useState(false);
  const[signup,setSignUp]=useState(true);
  return (
    <>
    {!login && <Login setLogin={setLogin} setSignUp={setSignUp}/>}
    {!signup && <Signup setLogin={setLogin} setSignUp={setSignUp}/>}
   {(login && signup) && <Actual page={page} setPage={setPage } />} 

    </>
  );
}
function Default(){
  return(
    <div id="about">
        <h2 id="heading">About us</h2>
        <p>Getting troubled in maintaining expenses?</p>
        <p>Don't worry! Let it be solved with our personal expenses tracker.</p>
        <p> Enter your budget and expenditure and get it solved.😉</p>
      </div>
  )
}
function Actual(props){
  return(
    <>
     <div>
        <h1 id="title">Personal Expenses Tracker-Made with &hearts;</h1>
      </div>
      <header>
        <nav>
          <Sidenav setPage={props.setPage}/>
          <a href="#about" onClick={()=>{
            props.setPage("default")
          }}>About us</a>
          <a href="#Budgets" onClick={()=>{
            props.setPage("budgets")
          }}>Budget</a>
          <a href="#expenses" onClick={()=>{
            props.setPage("expenses")
          }}>Expenses</a>
        </nav>
      </header>
      <main id="main">
       
        {(props.page=="default" ) && <Default />}
      {(props.page==="budgets" ) && <Budgets />}
     {(props.page==="expenses" ) && <Expenses />}
      </main>
      
      <footer>
        <p>Made by Akhila(❁´◡`❁)</p>
      </footer>
    </>
   
  )
}


export default App;
