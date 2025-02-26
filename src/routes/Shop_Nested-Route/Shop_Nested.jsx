import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
// import { Products_Context } from "../../contexts/Products_Context";
import Product_card from "../../Components/product-card/Product_card";
import { useSelector } from "react-redux";


function Shop_Nested() {
     const {products} = useSelector(state=>state.products);

    const {ProductTitle} = useParams();

    // const {products} = useContext(Products_Context);

    const [values,SetValues] = useState(products[ProductTitle]);
    console.log(products)
   
     useEffect(()=>{
         SetValues(products[ProductTitle]);
    
    },[ProductTitle,products])
   
  return (
    <>
    <h1 style={{width:"100%", display:"flex",justifyContent:"center"}} >{ProductTitle.toLocaleUpperCase()}</h1>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",columnGap:"20px",rowGap:"35px"}} >
      
      {
        values && values.map(value=>(
            <Product_card key={value.id} product={value} />
        ))
      }
    </div>
      </>
  )
}

export default Shop_Nested
