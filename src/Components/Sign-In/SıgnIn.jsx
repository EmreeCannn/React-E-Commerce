
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  SignInUserWithEmailAndPassword,
  SignInWithGooglePopUp,
} from "../../utils/Firebase/Firebase_utils";
import FormInput from "../form-input/FormInput";
import "./SıgnIn.scss";
import Button from "../Button-Component/Button";



const SignIn = () => {

  const defaultFormFields = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formField, SetformField] = useState(defaultFormFields);
  const userInput = (event) => {
    const { name, value } = event.target;
    
    SetformField({ ...formField, [name]: value });
    //  sol taraftakini ayır dokunma  sağ taraftakini güncelle demek kısaca
    //  ben sadece  kullandığım inputun değerinin güncellenmesini istiyorum diğerleri etkilenmesin
    // bu yüzden spread operatoru kullandık
  };
  const SignuserInWithGoogle = async () => {
    const response = await SignInWithGooglePopUp();
    navigate("/");
    alert(`succesfuly sıgned in   Welcome ${response.user.email}` );

  };
  const CreateAccount = async (e) => {
    e.preventDefault();
    try {
        const response = await SignInUserWithEmailAndPassword(formField.email,formField.password);
        alert(`succesfuly sıgned in   Welcome ${response.user.email}` );
        
         navigate("/");

    } catch (err) {
      console.log(err);
        if(err.code =="auth/invalid-credential"){
          alert("email ya da şifre hatalı ");
        }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account ?</h2>
      <span>Sign-In With Your Email And Password</span>
      <form action="" onSubmit={CreateAccount}>
        <FormInput
          label="Email"
          type="email"
          onChange={userInput}
          required
          name="email"
          value={formField.email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={userInput}
          required
          name="password"
          value={formField.password}
        />
        <div className="buttons-div">
          <Button type="submit">Sign-In</Button>
          <button className="google-sign-in-btn"  onClick={SignuserInWithGoogle}>Goggle Sign In</button>
        </div>
      </form>
    

   

    </div>
  );
};

export default SignIn;
