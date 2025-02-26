/* eslint-disable react/prop-types */

import "./form-input.stlye.scss"

function FormInput({label, ...otherProps}) {
    // console.log(otherProps);
    
  return (
    <div className="group" >
      <input className="form-input" {...otherProps} />
      <label className={`${otherProps.value.length>0  ? "shrink": "" } form-input-label `  } >{label}</label>
      {/* anlamı ben inputumun içine bir değer girdim 
      değer girdiğimden inputum yukarı doğru küçülsün bunu anlamak için */}
    
    </div>
  );
}

export default FormInput;
