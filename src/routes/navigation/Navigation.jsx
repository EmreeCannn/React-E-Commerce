import { Fragment, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

// import { UserContext } from "../../contexts/User_Context";

import { auth } from "../../utils/Firebase/Firebase_utils";

import "./navigation_style.scss";
 import logo from "../../assets/react.svg";
import { signOut } from "firebase/auth";
import Card_icon from "../../Components/card-icon/Card_icon";

import Card_dropdown from "../../Components/cart-dropdown/Card_dropdown";
import { Toggle_Context } from "../../contexts/Toggle_Context";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/Slices/UserSlice";




const Navigation = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state=>state.user);
  const navigate = useNavigate();
  console.log(currentUser)
  const signOutUser = () => {
    
    signOut(auth);
    dispatch(removeUser());
    navigate("/auth");
  };
  const {visible} = useContext(Toggle_Context);

  // console.log(visible);

  // console.log(currentUser);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
           <img src={logo} alt="" /> *
        </Link>
        {currentUser && (
          <span>Hoşgeldin {currentUser}</span>
        )}
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <button className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </button>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
            <Card_icon />
        </div>
      
         {visible && <Card_dropdown /> }
      
        
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
