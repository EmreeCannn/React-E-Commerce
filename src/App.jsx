
import "./categories.styles.scss"
import { Route, Routes, } from "react-router-dom";
import Home from "./routes/Home";

import Navigation from "./routes/navigation/Navigation";
import Authantication from "./routes/Authantication/Authantication";
import Shop from "./routes/shop/Shop"
import Checklist from "./Components/Checklist-item/Checklist";


// import Navigate_Product from "./Components/NavigateProduct/Navigate_Product";

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Navigation/>}>
         <Route index={true} element={<Home/>} />    
         <Route path="shop/*" element={<Shop/>}/>
         {/* * sembolü, belirtilen rotanın altında dinamik veya ek alt yolları desteklemek için gereklidir. React Router, bu sayede alt yolların Shop bileşeni içinde tanımlanmasına ve yönetilmesine olanak tanır. */}
         {/*  shop dan sonra yani shop/ bu kısımında slaşdan sonra ne girersem gireyim  Shop componentini çalıştır */}
         <Route path="auth" element={<Authantication/>} />
         <Route path="checklist" element={<Checklist/>} />
     </Route>
     
    </Routes>
   </>
  )
}

export default App
