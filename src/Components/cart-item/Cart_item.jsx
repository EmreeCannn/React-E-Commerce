/* eslint-disable react/prop-types */
import "./cart_item.scss"



const  Cart_item =({cartItem})=> {

    const {name,quantity,price,imageUrl} =cartItem
  return (
    <div className="cart-item-container" >
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name" >{name}</span>
        <span className="price" >{quantity} x ${price} </span>
      </div>
      
    </div>
  )
}

export default Cart_item
