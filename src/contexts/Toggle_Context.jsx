import { createContext,  useReducer } from "react";

const AddCartItem = (cartItems, productToAdd) => {

  const ExistingCart = cartItems.find((item) => item.id == productToAdd.id);

  if (ExistingCart) {
    const updateCartItem = cartItems.map((item) => {
      if (item.id == productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        
        return item;
      }
    });
    return updateCartItem;
  } else {

    return [...cartItems, { ...productToAdd, quantity: 1 }];
    //? productToadd objemin içindeki key value  çiftlerini olduğu gibi getir ve ek olarak quantity :1  key value çiftini ekle 
    //! ...cartItems = listemin içinde ne varsa bana getir demek 
    //? ...cartItems bana liste dönmez listenin içindeki verileri döner  
  }

  //? return [...cartItems,{...productToAdd,quantity:1}]
  //? Burada cartItems'taki mevcut tüm ürünleri alıyoruz ve product nesnesini quantity: 1 ile ekliyoruz.
  //?  burada bir liste oluşturdum bu listenin içinde mevcut cartItems listemin içindekileri ve kullanıcnın seçtiği ürünü ekliyorum
};

export const Toggle_Context = createContext();

const RemoveItem= (cartItems,ProductToRemove) =>{
  const isproductexist = cartItems.find(
    (item) => item.id == ProductToRemove.id
  );

  if(isproductexist){
    return cartItems.filter(item=>item.id != ProductToRemove.id)
  }

}

const DecreaseQuantity = (cartItems, productTodecrease) => {

  const isproductexist = cartItems.find(
    (item) => item.id == productTodecrease.id
  );

  if(isproductexist.quantity==1){
    return cartItems.filter(item=>item.id != productTodecrease.id);
  }


  const updateCart = cartItems.map((item) => {
    if (item.id == productTodecrease.id) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
  return updateCart;
};

export const ToggleReducer = (state,action) =>{
  switch (action.type) {
    case "CHANGE_CART_ITEM":
      console.log(action.payload)
      return {
        ...state,
        cartCount:action.payload.CartCount,
        cartTotal:action.payload.cartTotal,
        cartItems:action.payload.cartItems
        // ...action.payload
      }
    case "SET_VISIBLE":
      return{
        ...state,
        visible:action.payload,
        
      }
  
    default:
      throw new Error("bilinemeyen switch case",action.type)
  }

}

 export const INITIAL_STATE={
   visible:false,
   cartItems:[],
   cartCount:0,
   cartTotal:0
 }

// eslint-disable-next-line react/prop-types
export const Toggle_Provider = ({ children }) => {
  // const [visible, Setvisible] = useState(false);
  // const [cartItems, SetCartItems] = useState([]);
  // const [cartCount, SetcartCount] = useState(0);
  // const [cartTotal,SetcartTotal] = useState(0);
  const [state,dispach] = useReducer(ToggleReducer,INITIAL_STATE)
  const {cartItems,cartTotal,cartCount,visible} =state
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartitem) => {
  //     return total + cartitem.quantity;
  //   }, 0);

  //   const  total =  cartItems.reduce((total, cartitem) => {
  //     return total + cartitem.quantity * cartitem.price ;
  //   }, 0);
  //   SetcartTotal(total);
  //   SetcartCount(newCartCount);
  // }, [cartItems]);

  const set_cart_item= (cartItems) =>{
    const newCartCount = cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity;
    }, 0);

    const  total =  cartItems.reduce((total, cartitem) => {
      return total + cartitem.quantity * cartitem.price ;
    }, 0);

    dispach({type:"CHANGE_CART_ITEM",payload:{CartCount:newCartCount,cartTotal:total,cartItems:cartItems}})
  }

  const Setvisible = (bool) =>{
    dispach({type:"SET_VISIBLE",payload:bool})
  }

  const addItemToCart = (productToAdd) => {
    // console.log(productToAdd);
    //  bu fonksiyon  kullanıcı shop ekranında gözüken kartlardan herhangi birisiine tıkladığında tetiklenicek
    // const dönen_değer = AddCartItem(cartItems, productToAdd);
    // console.log(dönen_değer);
    // SetCartItems(AddCartItem(cartItems, productToAdd));
    set_cart_item(AddCartItem(state.cartItems, productToAdd))
  };

  const DeacreaseItem = (productToDecrase) => {
    // SetCartItems(DecreaseQuantity(cartItems, productToDecrase));
    set_cart_item(DecreaseQuantity(state.cartItems, productToDecrase))
  };

  const RemoveItemFromList = (ProductToRemove)=>{
    // SetCartItems(RemoveItem(cartItems,ProductToRemove));
    set_cart_item(RemoveItem(state.cartItems,ProductToRemove))
  }
  const value = {
    Setvisible,
     visible,
     cartItems,
     addItemToCart,
     cartCount,
     DeacreaseItem,
     RemoveItemFromList,
     cartTotal
  };
  return (
    <Toggle_Context.Provider value={value}>{children}</Toggle_Context.Provider>
  );
};
