/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import "./Category.item.scss"

function Category_item({category}){

  const navigate = useNavigate()
  const NavigateToProduct = (category) =>{
    navigate(`shop/${category.title.toLowerCase()}`)
  }

    
    
  return (
    <div className="category-container" onClick={()=>NavigateToProduct(category)}>
    <div className="background-image"  style={{backgroundImage:`url(${category.imageUrl})`}}></div> 
    
    <div className="category-body-container">
     <h2>{category.title}</h2> 
      <button  style={{backgroundColor:"transparent",border:"none"}} >Shop Now</button>
    </div>
  </div>
  )
}

export default Category_item
