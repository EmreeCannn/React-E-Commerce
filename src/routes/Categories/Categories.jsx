// import { Products_Context } from "../../contexts/Products_Context";
// import { useContext } from "react";

import Category_preview from "../../Components/Category-Preview/Category_preview";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function Categories() {
  // const { products } = useContext(Products_Context);
  const {products} = useSelector(state=>state.products);
  console.log(products);

  return (
    <>

     
    <div className="category-preview-container">
      {
        Object.keys(products).map((title) => {
          const Category_preview_product = products[title];
          return <Category_preview key={title} title={title} products={Category_preview_product}  />
        })
        // burada products objemin key değerlerini aldım
      }

      <Outlet/>
    </div>
    </>
  );
}

export default Categories;