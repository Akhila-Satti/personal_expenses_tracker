import "./Sidenav.css";
import { useState } from "react";

function Sidenav(props) {
  const [sidebar, setSideBar] = useState(false);
  return (
    <>
     
        {!sidebar && <img
          id="navigator1"
          onClick={() => {
           setSideBar(true);
          }}
          src="./src/assets/sidenav.png"
          alt="sideimg"
        ></img>}
        {sidebar && <ActivateBar setSideBar={setSideBar} setPage={props.setPage}/>}
      
    </>
  );
}
function ActivateBar(props) {
  return (
    <>
      <div id="mySidenav" className="sidenav">
         <img
          id="navigator2"
          onClick={() => {
           props.setSideBar(false);
          }}
          src="./src/assets/sidenav.png"
          alt="sideimg"
        ></img>
        <a href="#" onClick={()=>{
            props.setPage("default");
        }}>About</a>
        <a href="#" onClick={()=>{
            props.setPage("budgets");
        }}>Budgets</a>
        <a href="#" onClick={()=>{
            props.setPage("expenses");
        }}>Expenses</a>
      </div>
    </>
  );
}
export default Sidenav;
