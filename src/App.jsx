import React, { useEffect, useState } from "react";

import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";


import Products from "./components/Products";
import Maintenance from "./components/Maintenance";
import Machinepark from "./components/MachinePark/index";
import Showmachine from "./components/ShowMachine";

const history = createBrowserHistory();

function App() {

  const windowWidth = window.innerWidth;

  const [submitted, setSubmitted] = useState(false)

  const [productList, setProductList] = useState([])
  const [shownMachine, setShownMachine] = useState([])
  const [notes, setNotes] = useState([])



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
                <button onClick={(e) => HandleNavClick(e, "maintenance", "VEDLIGEHOLDELSE")}>VEDLIGEHOLDELSE</button>
              </li>
              <li>
                <button onClick={(e) => HandleNavClick(e, "machinepark", "MASKINPARK")}>MASKINPARK</button>
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
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/maintenance">
            <Maintenance setSubmitted={setSubmitted} setShownMachine={setShownMachine} setNotes={setNotes}/>
          </Route>
          <Route path="/machinepark">
            <Machinepark />
          </Route>
          <Route path="/showmachine">            
            <Showmachine shownMachine={shownMachine} notes={notes} history={history} setNotes={setNotes}/>
          </Route>
        </main>
    </Router>
  );
}

export default App;
