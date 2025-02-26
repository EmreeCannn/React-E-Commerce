/* eslint-disable react/prop-types */
 import "./button.scss"

const Button_Type_Classes  = {
    google:"google-sign-in",
    inverted :"inverted",

}

function Button({children,buttonType}) {
  return (
    <div>
      <button className={`button-container  ${Button_Type_Classes[buttonType]} `}>
        {children}
      </button>
    </div>
  )
}

export default Button
