import { useState } from "react";
import "./App.css";
import Budgets from './Budgets.jsx';
import Expenses from "./Expenses.jsx";
import Sidenav from "./Sidenav.jsx";
function App() {
  const [page ,setPage]=useState("default");
  return (
    <>
    
      <div>
        <h1 id="title">Personal Expenses Tracker-Made with &hearts;</h1>
      </div>
      <header>
        <nav>
          <Sidenav setPage={setPage}/>
          <a href="#about" onClick={()=>{
            setPage("default")
          }}>About us</a>
          <a href="#Budgets" onClick={()=>{
            setPage("budgets")
          }}>Budget</a>
          <a href="#expenses" onClick={()=>{
            setPage("expenses")
          }}>Expenses</a>
        </nav>
      </header>
      <main id="main">
        {page=="default" && <Default />}
      {page==="budgets" &&<Budgets />}
     {page==="expenses" && <Expenses />}
      </main>
      
      <footer>
        <p>Made by Akhila(❁´◡`❁)</p>
      </footer>
      

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


export default App;
