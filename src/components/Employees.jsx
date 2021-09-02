import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom";

function Maintenance({history, allMachines, setShownMachine, setNotes}){

//   const HandleClick = (machine) => {

//     setShownMachine(machine)
//     history.push("/showmachine")

//   }

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
    <div id="maintenance">
      <h1 id="maintenancetext">Medarbejdere</h1>
      {employeeList.map((employee) => 
      {
        return(
        <button key={employee["employeeId"]} id="maintenanceboxes" /*onClick={() => {HandleClick(machine)}}*/>
            <div id="maintenancebox">
              <h1 id="employeename">
                {NameShortener(employee["employeeName"])}
              </h1>
              <div id="hid-box">
                <div id="maintenanceboxhover">
                  <p className="maintenanceboxheading">
                    Telefon-nummer
                  </p>
                  <h3 className="maintenanceboxtext">
                    {employee["phoneNumber"]}
                  </h3>
                  <p className="maintenanceboxheading">
                    Adresse
                  </p>
                  <h3 className="maintenanceboxtext">
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

export default withRouter(Maintenance);