import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import React, { useEffect, useState, useRef } from "react";


const ProductsList = ({setCurrentProduct, history, createProductInput, setIsMenuOpen, t}) => {

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
            <div className="productstableheaders">
                <h1 className="productstableheaderstext">{t("Produkter")}</h1>
                <h1 className="productstableheadersplus" onClick={() => {
                    var modal = document.getElementById("productmodal5")
                    modal.style.display = "block"
                    setIsMenuOpen(true)
                    createProductInput.current.focus();
                }}>+</h1>
            </div>
            <table className="productstables" id="tableproducts">
                <colgroup>
                <col style={{width: "10%"}}></col>
                <col style={{width: "50%"}}></col>
                <col style={{width: "15%"}}></col>
                <col style={{width: "10%"}}></col>
                </colgroup>
                <thead>
                <tr>
                    <th>{t("Produktnummer")}</th>
                    <th>{t("Navn")}</th>
                    <th>{t("Pris")}</th>
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
                            setIsMenuOpen(true)
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