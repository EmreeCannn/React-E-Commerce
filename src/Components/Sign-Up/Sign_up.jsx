import { useContext, useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  SendUserEmailVerification,
} from "../../utils/Firebase/Firebase_utils";

import FormInput from "../form-input/FormInput";

import "./signUp.scss";
import Button from "../Button-Component/Button";

// import { UserContext } from "../../contexts/User_Context";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
  // const { setCurrentUser } = useContext(UserContext);

  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [formField, SetformField] = useState(defaultFormFields);

  const userInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    SetformField({ ...formField, [name]: value });
    //  sol taraftakini ayır dokunma  sağ taraftakini güncelle demek kısaca
    //  ben sadece  kullandığım inputun değerinin güncellenmesini istiyorum diğerleri etkilenmesin
    // bu yüzden spread operatoru kullandık
  };

  const CreateAccount = async (e) => {
    e.preventDefault();
    if (formField.password !== formField.confirmPassword) {
      alert(" Confirm Password Should Be Same with Password ");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        formField.email,
        formField.password
      );
      // console.log(currentUser.emailVerified);
      SetformField(defaultFormFields);
      SendUserEmailVerification(response.user);
      alert("e posta doğrulama bağlantısı gönderildi");
      await response.user.reload()
      if(response.user.emailVerified){
        // setCurrentUser(response.user)
        navigate("/")
      }
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        alert("bu email zaten var");
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account ?</h2>
      <span>Sign-Up With Your Email And Password</span>
      <form action="" onSubmit={CreateAccount}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={userInput}
          required
          name="displayName"
          value={formField.displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={userInput}
          required
          name="confirmPassword"
          value={formField.confirmPassword}
        />

        <Button type="submit">Sign-Up</Button>
      </form>
    </div>
  );
};

export default Sign_up;
