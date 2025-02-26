/* eslint-disable react/prop-types */

import { useContext } from "react";
import "./checkout-item.scss";
import { Toggle_Context } from "../../contexts/Toggle_Context";


function Checkout_item({ cartItem }) {
  const { RemoveItemFromList,addItemToCart,DeacreaseItem } = useContext(Toggle_Context);

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
     
      <span className="name">{name}</span>
      <div className="arrow" style={{cursor:"pointer"}}   onClick={()=>DeacreaseItem(cartItem)} >-</div>
      <span className="value">{quantity}</span>
      <div className="arrow" style={{cursor:"pointer"}} onClick={()=>addItemToCart(cartItem)} >+</div>

      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => RemoveItemFromList(cartItem)}
      >
        &#10005;
      </div>
      
    </div>
  );
}

export default Checkout_item;
