import Sign_up from "../../Components/Sign-Up/Sign_up";
import "./authantication.scss"
import SıgnIn from "../../Components/Sign-In/SıgnIn";
function Authantication() {


  return (
    <div className="authentication-container" >
      <SıgnIn/>
      <Sign_up/>
    </div>
  )
}

export default Authantication
