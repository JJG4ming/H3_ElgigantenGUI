import React from 'react';
import { withRouter } from "react-router";

function ShowEmployee({shownEmployee, history}) {

    const HandleClick = () => {
        history.push("/employees")
    }


    return(
        <div id="shownemployee">
            <button id="backbutton" onClick={HandleClick}>Tilbage</button>
            <div id="allproductattributes">
                <div className="productattributes">
                    <h1 className="showproducth1">Medarbejder nr.</h1>
                    <p>{shownEmployee["employeeId"]}</p>
                </div>
                <div className="productattributes">
                    <h1 className="showproducth1">Navn</h1>
                    <p>{shownEmployee["employeeName"] == null ? "Ingen pumpe" : shownEmployee["employeeName"]}</p>
                </div>
                <div className="productattributes">
                    <h1 className="showproducth1">Addresse</h1>
                    <p>{shownEmployee["employeeAddress"] == null ? "Ingen tid" : shownEmployee["employeeAddress"]}</p>
                </div>
                <div className="productattributes">
                    <h1 className="showproducth1">Postnummer</h1>
                    <p>{shownEmployee.postalCodes.postalCodeId == null ? "Ingen tid" : shownEmployee.postalCodes.postalCodeId}</p>
                </div>
                <div className="productattributes">
                    <h1 className="showproducth1">By</h1>
                    <p>{shownEmployee.postalCodes.cityName == null ? "Ingen tid" : shownEmployee.postalCodes.cityName}</p>
                </div>
            </div>
        </div>
    )
}
export default withRouter(ShowEmployee);