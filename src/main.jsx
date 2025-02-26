import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// import { Product_Provider } from "./contexts/Products_Context.jsx";
import { Toggle_Provider } from "./contexts/Toggle_Context.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store/store.js";
-
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
      
          <Toggle_Provider>
            <App />
          </Toggle_Provider>
    
      </BrowserRouter>
    </Provider>
  </>
);
