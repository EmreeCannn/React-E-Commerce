import "./card-icon.styles.scss"

import  ShoppingIcon from "../../assets/shopping-bag.svg?react"
import { useContext } from "react";
import { Toggle_Context } from "../../contexts/Toggle_Context";

function Card_icon() {

  const value = useContext(Toggle_Context);

 
  
  const ToggleDropDown = () =>{
    // value.dispach({type:"SET_VISIBLE",payload:!value.visible})
    value.Setvisible(!value.visible);
  }




  console.log(value.cartCount);
  


  return (
    <div className="cart-icon-container" onClick={ToggleDropDown} >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{value.cartCount}</span>
    </div>
  
  )
}


export default Card_icon
