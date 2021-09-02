import React, { useEffect, useState } from "react";

const ProductsList = ({currentProduct, setCurrentProduct, history}) => {

    const [productList, setProductList] = useState([])

    useEffect(() => {
        let mounted = true;
        fetch("http://localhost:42069/api/Products")
          .then(function(data) {
            return data.json();
          })
          .then(function(json) {
            if (mounted) {
    
              setProductList(json)   
            }  
          }).catch((error) => {
            console.log(error);
          });
      }, [])


    return(
        <React.Fragment>             
            <div className="machineparktableheaders">
                <h1 className="machineparktableheaderstext">Produkter</h1>
                <h1 className="machineparktableheadersplus" onClick={() => {
                    var modal = document.getElementById("modal5")
                    modal.style.display = "block"
                }}>+</h1>
            </div>
            <table className="machineparktables" id="tablemachineparkmachines">
                <colgroup>
                <col style={{width: "10%"}}></col>
                <col style={{width: "50%"}}></col>
                <col style={{width: "15%"}}></col>
                <col style={{width: "10%"}}></col>
                </colgroup>
                <thead>
                <tr>
                    <th>Produktnummer</th>
                    <th>Navn</th>
                    <th>Pris</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {productList.map(function(data) {
                    return (
                    <tr key={data["productId"]}>
                        <td>{data["productId"]}</td>
                        <td>{data["productName"]}</td>
                        <td>{data["productPrice"]}</td>
                        <td onClick={(event) => {
                            setCurrentProduct(productList.find(x => x["productId"] === data["productId"]))

                            var modal = document.getElementById("productmodal2")
                            console.log(modal)
                            modal.style.display = "block"
                        }}>
                        <img src="https://icons-for-free.com/iconfiles/png/512/draw+edit+pen+pencil+text+write+icon-1320162307919760358.png" alt="" style={{width: 24}}></img>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
      
        </React.Fragment>
    )
}

export default ProductsList;