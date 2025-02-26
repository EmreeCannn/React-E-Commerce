/* eslint-disable react/prop-types */
import { createContext,   useEffect } from "react";
// import SHOP_DATA from "../product_data.js";
import { setProducts } from "../Redux/Slices/ProductSlice.js";
import { useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import {addCollectionAndDocument, getCategoriesAndDocuments} from "../utils/Firebase/Firebase_utils.jsx";

export const Products_Context = createContext({
    products:[]
});


export const Product_Provider = () =>{
      const dispatch = useDispatch();
    // console.log(" product_provider render oldu ");
    //  const [products,Setproduct] = useState([]);
    useEffect(()=>{
        // addCollectionAndDocument("categories",SHOP_DATA);
        
        const getCategoriesMap = async ()=>{
          const categoryMap = await getCategoriesAndDocuments();
          dispatch(setProducts(categoryMap));
          // Setproduct(categoryMap);
          console.log(categoryMap);

        }
        getCategoriesMap();
    },[])
    //  const value= {products,Setproduct};
    //  return (
    //      <Products_Context.Provider value={value}>{children}</Products_Context.Provider>
    //  ) 
}

