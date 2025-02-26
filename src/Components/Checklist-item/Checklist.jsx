import { useContext } from "react";
import { Toggle_Context } from "../../contexts/Toggle_Context";
import "./Checklist.scss";
import Checkout_item from "../Check-out-item/Checkout_item";
import PaymentForm from "../payment-form/Payment";


function Checklist() {
  const { cartItems,cartTotal} =useContext(Toggle_Context);

 

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Describtion</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
     
      {cartItems.map((item) => (
         <Checkout_item key={item.id} cartItem={item} />
      ))}
      <span className="Total" >Total : {cartTotal} </span>
      <PaymentForm/>
    </div>
  );
}
// onClick={addItemToCart(cartItem)}

// You are calling the function as soon as the site renders. As well as when you click the increment button. However! Because you call it while the site renders, it changes the state of cartItems, and the rest of the component relies on the cartItems state to rerender it. It causes a loop. This loop causes the quantity to go up every time it renders. But it never stops rendering because, at every render, it increases again. So this is the cause for the site breaking.

// onClick={() => addItemToCart(cartItem)}

// This line of code passes in the addItemToCart method into the onClick listener, meaning that it doesn't get called when the site renders. So it will only rerender the site on the click, causing no loop.

// It is not for efficiency. It will literally break the site.

export default Checklist;
