import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

const Products = () => {

  const [productList, setProductList] = useState([])
  const [login, setLogin] = useState();
  
  const RemoveProduct = (product) => {
    fetch("http://localhost:42069/Products", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
  }

  const Login = () => {
    fetch("http://localhost:42069/Users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      })
    })
  }

  useEffect(function()
  {
    fetch("http://localhost:42069/Products", {
      method: "GET",
      mode: "cors",
    })
    .then((data) => data.json())
    .then(function(json) {
      setProductList(json)     
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <div>
      <button onClick={Login}>Login</button>
        <h1 className="tablelabel">Produkter</h1>
        <table className="tables" id="tableoverview">
        <colgroup>
            <col style={{width: "10%"}}></col>
            <col style={{width: "65%"}}></col>
            <col style={{width: "15%"}}></col>
            <col style={{width: "10%"}}></col>
        </colgroup>
        <thead>
            <tr>
            <th>Produkt ID</th>
            <th>Produkt Navn</th>
            <th>Pris</th>
            <th>Fjern Produkt</th>
            </tr>
        </thead>
        <tbody>
            {productList.map(function(product)
            {
              return (
                <tr key={product["productId"]}>
                    <td style={{background: "#42CB6B"}}>{product["productId"]}</td>
                    <td>{product["productName"]}</td>
                    <td>{product["productPrice"] + " - DKK"}</td>
                    <td id="deleteproductbutton" onClick={(event) => {

                        var answer = window.confirm("Hvis du vil fjerne produktet tryk OK")
                        
                        if (!answer === true) return;

                        RemoveProduct(product)
                        
                        setTimeout(() => {  window.location.href="/products" }, 200)

                    }}>
                    <h4>FJERN</h4>
                    </td>
                </tr>
              )
              })
            }

        </tbody>
        </table>
    </div>  
  )
}

export default withRouter(Products);
