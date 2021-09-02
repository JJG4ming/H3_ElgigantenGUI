import React, {useState} from "react";
import { withRouter } from "react-router";

const ProductModals = ({ currentProduct, setCurrentProduct, history}) => {
    const [name, setName] = useState({})
    const [price, setPrice] = useState({})

    const RemoveProduct = () => {    
        if (currentProduct) {

          fetch("http://localhost:42069/api/Products", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify(currentProduct)
          })
          window.location.href="/"
        }
        else {
          alert("Intet produkt valgt. Ser du dette, så kontakt IT")
        }
      }
    
      const UpdateProduct = () =>{    

        var product = {...currentProduct}

        product.productName = name;
        product.productPrice = price;
    
        fetch("http://localhost:42069/api/Products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        })

        window.location.href="/"
      }
    
      const createProduct = () =>{
        var name = document.getElementById("createproductname")
        var price = document.getElementById("createproductprice")
    
        var product = {
          ProductName: name.value,
          ProductPrice: price.value
        } 
      
        fetch("http://localhost:42069/api/Products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        })
        window.location.href="/products"
      }
    
      const CloseAllModals = () => {
        var modals = document.querySelectorAll(".modal")
        for (let i = 0; i < modals.length; i++) {
          const modal = modals[i];
          modal.style.display = "none"      
        }
      }
    


    return(
        <React.Fragment>
            <div className="modal" id="productmodal2">
                <form className ="modalforms" id="machinemodal" onSubmit={function(event){
                    event.preventDefault();
                    UpdateProduct();
                }}>
                    <div className="modallabelbox">
                    <label htmlFor="editmachineid">
                        <span>Produkt nr.</span><input type="test" readOnly={true} className="bigmodalinputs" id="editmachineid" name="editmachineid" defaultValue={currentProduct["productId"]} required></input><br></br>
                    </label>
                    <label htmlFor="editmachinemodel">
                    <span>Navn</span><input type="text" className="modalinputs" id="editmachinemodel" name="editmachinemodel" onChange={e => setName(e.target.value)} defaultValue={currentProduct["productName"]}></input><br></br>
                    </label>
                    <label htmlFor="editmachinenozzle">
                    <span>Pris</span><input type="text" className="modalinputs" id="editmachinenozzle" name="editmachinenozzle" onChange={e => setPrice(e.target.value)} defaultValue={currentProduct["productPrice"]}></input><br></br>
                    </label>
                    </div>
                    <span className="removemodalbuttonspan"></span><button className="removemodalbutton" id="removemachinebutton" type="button" onClick={function(event){
                        event.preventDefault();
                        var modal = document.getElementById("productmodal2")
                        modal.style.display = "none"
                        var modal6 = document.getElementById("productmodal6")
                        modal6.style.display = "block"
                    }}>Slet Produkt</button>
                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                    </div>
                </form>
            </div>
            <div className="modal" id="productmodal5">
                <form className ="modalforms" id="createmachinemodal" onSubmit={function(event){
                event.preventDefault();
                createProduct();
                }}>
                <h1 id="createmachinemodaltext">Opret nyt produkt</h1>
                    <input type="text" className="modalinputs" id="createproductname" name="createproductname" placeholder="Navn" required></input><br></br>
                    <input type="text" className="modalinputs" id="createproductprice" name="createproductprice" placeholder="Pris" required></input><br></br>
                    <div className="modalbuttonbox" id="createpumpmodalbuttonbox">
                    <button className="cancelmodalbutton" id="closemodalbutton" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="modalbuttons" id="updatemodalbutton" type="submit">Gem</button>
                </div>
                </form>
            </div>
            <div className="modal" id="productmodal6">
                <form className ="modalforms" id="removemachinemodal" onSubmit={function(event){
                    event.preventDefault();
                    RemoveProduct();
                }}>
                    <h1 className="labelremovemodal">Slet Produkt {currentProduct.id}?</h1>
                    <div className="modalbuttonbox">
                    <button className="cancelmodalbutton" id="cancelmachinemodal" type="button" onClick={CloseAllModals}>Anuller</button>
                    <button className="removemodalbutton" id="removemachinemodalbutton" type="submit">Slet Produkt</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default withRouter(ProductModals);