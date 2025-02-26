/* eslint-disable react/prop-types */

import Product_card from "../product-card/Product_card"
import "./Category_preview.scss"
import { Link } from "react-router-dom";
function Category_preview({title,products}) {


  return (
    <div className="category-preview-container" >
      <h2>
        <Link className="title" to={`${title.toLowerCase()}`} >{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {
            products.filter((_,index)=> index < 4 )
            //  ürünlerimin içinden sadece ilk 4 tanesini getir diyorum bunun sayesinde kullanıcı ürünlerin
            // ön izlemesini  görebilir 100 tabe ürünüm olabilir ama ben sadece 4 tanesini alıcam 
            .map((product)=>{
                return  <Product_card key={product.id}  product={product} />
            })
        }
      </div>
    </div>
  )
}

export default Category_preview
