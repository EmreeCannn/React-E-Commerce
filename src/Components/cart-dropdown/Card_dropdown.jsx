import "./card_dropdown.scss"
import Cart_item from "../cart-item/Cart_item"
import { useContext} from "react"
import { Toggle_Context } from "../../contexts/Toggle_Context"

import {useNavigate} from 'react-router-dom';
const  Card_dropdown = () => {

  const {cartItems,dispach,Setvisible} = useContext(Toggle_Context);

  const navigate = useNavigate();

  const NavigateToCheckOut = () =>{
    // dispach({type:"SET_VISIBLE",payload:false})
    Setvisible(false);
    navigate("checklist")
  }
 

  return (
    <div className="cart-dropdown-container" >
      <div className="cart-items">
        {cartItems.length ? cartItems.map(item=><Cart_item key={item.id} cartItem={item} />) :  <h4>Your Cart is Empty</h4>}
        
      </div>
      <button onClick={NavigateToCheckOut} >Go To CheckOut</button>
    </div>
  )
}

export default Card_dropdown
