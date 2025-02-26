/* eslint-disable react/prop-types */
import Category_item from "../category-item/Category_item";
import "./Category_directory.scss"
function Category_directory({categories}) {
    
    
    
  return (
    <div className='categories-container'>
    {categories.map(category=>(
     <Category_item key={category.id} category={category} />
    ))} 
  </div>
  )
}

export default Category_directory
