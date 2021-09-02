import React, { useEffect, useState } from "react";

import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";


import Products from "./components/Products/Products";
import Employees from "./components/Employees";
import ShowEmployee from "./components/ShowEmployee";

const history = createBrowserHistory();

function App() {

  const windowWidth = window.innerWidth;
  const [shownEmployee, setShownEmployee] = useState({})



  function slide(){
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    //Toggle Nav
    nav.classList.toggle("nav-active");
    
    //Animate Links
    navLinks.forEach(function(link, index){
      link.classList.toggle("nav-active-li");
      if(link.style.animation){
        link.style.animation = "";
      }
      else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
      }
    });

    //Animate Burger
    burger.classList.toggle("toggle");
  }

  const HandleNavClick = function(event, stage, text) {
    event.preventDefault();
    history.push(stage)
    var array = event.target.parentNode.parentNode.children


    for (const line of array) {
      var anchor = line.children[0];

      if (anchor.innerHTML.toLowerCase() === text.toLowerCase()) {
        anchor.style.color = "rgb(235, 101, 45)"
        continue;
      } 
      anchor.style.color = "rgb(233, 233, 233)"
    }

    if (windowWidth <= 1280) slide();
  }

  useEffect(function() 
  {
    document.querySelectorAll(".nav-links")[0].children[0].children[0].style.color = "rgb(235, 101, 45)"

  }, [])

  return (
    <Router history={history}>
        <header>
          <nav id="nav">
            <div className="logo">
              <h1>ELGIGANTEN</h1>
            </div>
            <ul className="nav-links">
              <li>
                <button onClick={(e) => HandleNavClick(e, "products", "PRODUKTER")}>PRODUKTER</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "employees", "MEDARBEJDERE")}>MEDARBEJDERE</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "customers", "KUNDER")}>KUNDER</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "logout", "LOG UD")}>LOG UD</button>
              </li>
            </ul>
            <div className="burger" onClick={slide}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
        </header>
        <main>
          <Route exact path="/">
            {history.push("/products")}
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/employees">
            <Employees setShownEmployee={setShownEmployee}/>
          </Route>
          <Route path="/showemployee">            
            <ShowEmployee shownEmployee={shownEmployee} history={history}/>
          </Route>
        </main>
    </Router>
  );
}

export default App;
