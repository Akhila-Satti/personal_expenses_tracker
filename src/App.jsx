import { useState } from "react";
import "./App.css";
import Budgets from './Budgets.jsx';
import Expenses from "./Expenses.jsx";
function App() {
  return (
    <>
      <div>
        <h1 id="title">Personal Expenses Tracker-Made with &hearts;</h1>
      </div>
      <header>
        <nav>
          <a href="#about">About us</a>
          <a href="#budget">Budget</a>
          <a href="#expenses">Expenses</a>
        </nav>
      </header>
      <main>
        <div id="about">
        <h2 id="heading">About us</h2>
        <p>Getting troubled in maintaining expenses?</p>
        <p>Don't worry! Let it be solved with our personal expenses tracker.</p>
        <p> Enter your budget and expenditure and get it solved.😉</p>
      </div>
      <hr></hr>
      <div id="budget">
     <Budgets />
      </div>
      <hr></hr>
      <div id="expenses">
        <Expenses />
      </div>
      </main>
      
      <footer>
        <p>Made by Akhila(❁´◡`❁)</p>
      </footer>
      

    </>
  );
}

export default App;
