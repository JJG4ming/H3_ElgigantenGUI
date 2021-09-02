import React, {useEffect, useState} from 'react';
import { withRouter } from "react-router";

import ProductsList from "./ProductsList.jsx"
import ProductModals from "./ProductModals.jsx"

function Products(){

  const [currentProduct, setCurrentProduct] = useState({})

  return( 
    <div>
      <ProductsList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}/>    
      
      <ProductModals currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}/>
    </div>
  )
}

export default withRouter(Products);