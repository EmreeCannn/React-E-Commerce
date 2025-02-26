// import { Products_Context } from "../../contexts/Products_Context";
// import { useContext } from "react";
import "./shop.style.scss";
import { Route, Routes } from "react-router-dom";
import Categories from "../Categories/Categories";
import Shop_Nested from "../Shop_Nested-Route/Shop_Nested";
import { Product_Provider } from "../../contexts/Products_Context";
// import Authantication from "../Authantication/Authantication";

function Shop() {
  // const { products } = useContext(Products_Context);

  // product provider ıma bu componentlerin dışında bir componentten ulaşmak istersem sadece 
  // productCOntext içindeki initial_value değerime ulaşırım sadece onu görürüm çünkü update edemem
  return (
    <div className="shop-container">
       <Product_Provider/>
        {/* ben product provider conteximin içindeki değerleri sadece bu iki componentte kullanıyorum 
        performans için tüm app componentimi sarmanın bir anlamı yok  */}
        <Routes>
          <Route index element={<Categories />} />
          <Route path="/:ProductTitle" element={<Shop_Nested />} />
        </Routes>
      
    </div>
  );
}

export default Shop;
