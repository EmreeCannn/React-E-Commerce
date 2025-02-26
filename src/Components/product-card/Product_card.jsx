
/* eslint-disable react/prop-types */



import { useContext } from "react";
import "./product-card.scss";
import { Toggle_Context } from "../../contexts/Toggle_Context";

const Product_card = ({product}) => {
  
  const value = useContext(Toggle_Context);

   const AddProductToCart = ()=>{
     value.addItemToCart(product);
   }


  console.log(product);
  return (
    <div className="product-card-container" >
      <img src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <button onClick={AddProductToCart}>add to card</button>
    </div>
  )
}

export default Product_card
