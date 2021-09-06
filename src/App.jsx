import i18next from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";


import Products from "./components/Products/Products";
import Employees from "./components/Employees";
import ShowEmployee from "./components/ShowEmployee";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import {useDarkMode} from "./components/useDarkMode";
import Toggle from "./components/Toggler"

const history = createBrowserHistory();

  const languages = [
    {
      code: "en",
      name: "English",
      country_code: "gb"
    },
    {
      code: "dk",
      name: "Dansk",
      country_code: "dk"
    }
  ]


function App() {

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation();
  const windowWidth = window.innerWidth;
  const [shownEmployee, setShownEmployee] = useState({})
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;



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

  useEffect(() =>
  {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.querySelectorAll(".nav-links")[0].children[0].children[0].style.color = "rgb(235, 101, 45)"

  }, [currentLanguage, t])

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <Router history={history}>
            <header>
              <nav id="nav">
                <div className="logo">
                  <h1>ELGIGANTEN</h1>
                </div>
                <ul className="nav-links">
                  <li>
                    <button onClick={(e) => HandleNavClick(e, "products", "PRODUKTER")}>{t("PRODUKTER")}</button>
                  </li>
                  <li>
                    <button onClick={(e) => HandleNavClick(e, "employees", "MEDARBEJDERE")}>{t("MEDARBEJDERE")}</button>
                  </li>
                  <li>
                    <button onClick={(e) => HandleNavClick(e, "customers", "KUNDER")}>{t("KUNDER")}</button>
                  </li>
                  <li>
                    <Toggle theme={theme} toggleTheme={themeToggler} />
                  </li>
                </ul>
                <div className="burger" onClick={slide}>
                  <div className="line1"></div>
                  <div className="line2"></div>
                  <div className="line3"></div>
                </div>
              </nav>
            </header>
            <body>
              <div className="container">
                <div className="language-select">
                  <div className="d-flex justify-content-end align-items-center language-select-root">
                    <div className="dropdown">
                      <button
                        className="btn btn-link dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <span className="dropdown-item-text">{t('Sprog')}</span>
                        </li>
                        {languages.map(({ code, name, country_code }) => (
                          <li key={country_code}>
                            <a
                              href="#"
                              className={classNames('dropdown-item', {
                                disabled: currentLanguageCode === code,
                              })}
                              onClick={() => {
                                i18next.changeLanguage(code)
                              }}
                            >
                              <span
                                className={`flag-icon flag-icon-${country_code} mx-2`}
                                style={{
                                  opacity: currentLanguageCode === code ? 0.5 : 1,
                                }}
                              ></span>
                              {name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </body>
            <main>
              <Route exact path="/">
                <Products t = {t}/>
              </Route>
              <Route path="/products">
                <Products t = {t}/>
              </Route>
              <Route path="/employees">
                <Employees setShownEmployee={setShownEmployee} t = {t}/>
              </Route>
              <Route path="/showemployee">            
                <ShowEmployee shownEmployee={shownEmployee} history={history} t = {t}/>
              </Route>
            </main>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
