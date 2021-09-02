import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom";

function Employees({history, setShownEmployee}){

  const HandleClick = (employee) => {

    console.log(employee)
    setShownEmployee(employee)
    history.push("/showemployee")

  }

  const [employeeList, setEmployeeList] = useState([])

  useEffect(function() 
  {
    fetch("http://localhost:42069/api/Employee", {
        method: "GET",
        mode: "cors"
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        setEmployeeList(json)     
      }).catch((error) => {
        console.log(error);
      });
  }, [setEmployeeList])

  const NameShortener = (name) => {
      var names = name.split(" ")
      var length = names.length -1
      var shortenedName = names[0] + " " + names[length]

      return shortenedName;
  }

  return(
    <div id="Employees">
      <h1 id="Employeestext">Medarbejdere</h1>
      {employeeList.map((employee) => 
      {
        return(
        <button key={employee["employeeId"]} id="Employeesboxes" onClick={() => {HandleClick(employee)}}>
            <div id="Employeesbox">
              <h1 id="employeename">
                {NameShortener(employee["employeeName"])}
              </h1>
              <div id="hid-box">
                <div id="Employeesboxhover">
                  <p className="Employeesboxheading">
                    Telefon-nummer
                  </p>
                  <h3 className="Employeesboxtext">
                    {employee["phoneNumber"]}
                  </h3>
                  <p className="Employeesboxheading">
                    Adresse
                  </p>
                  <h3 className="Employeesboxtext">
                    {employee["employeeAddress"]}
                  </h3>
                </div>
              </div>
            </div>
        </button>
        )
      })}
    </div>
  )


}

export default withRouter(Employees);