import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
function PaymentForm() {

    // const stripe = useStripe();
    // const elements = useElements();

    const paymentHandler = async(e)=>{
       alert("şuanda projemiz geliştirme aşamasında olduğu için  ödeme alamıyoruz ilginiz için teşekkürler ")
        e.preventDefault();
      
        
    }

  return (
    <div className="PaymentFormContainer">
      <div className="FormContainer">
        <h2>Credit Card Payment</h2>
        {/* <CardElement /> */}
        <button onClick={paymentHandler} className="btn btn-dark">Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentForm;
