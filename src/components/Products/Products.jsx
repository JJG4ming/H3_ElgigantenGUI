import React, {useEffect, useRef, useState} from 'react';
import { withRouter } from "react-router";

import ProductsList from "./ProductsList.jsx"
import ProductModals from "./ProductModals.jsx"

function Products({t}){

  const [currentProduct, setCurrentProduct] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const createProductInput = React.useRef(null);
  

  return( 
    <div>
      <ProductsList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} createProductInput={createProductInput} setIsMenuOpen={setIsMenuOpen} history t = {t}/>    
      
      <ProductModals currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} createProductInput={createProductInput} isMenuOpen={isMenuOpen} history t = {t}/>
    </div>
  )
}

export default withRouter(Products);