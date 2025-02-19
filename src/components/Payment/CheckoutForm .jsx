import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import userData from "../../api/userData";

export default function CheckoutForm() {
  const { amount } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate()
  const price = parseInt(amount);

  const [clientSecret, setClientSecret] = useState("");
  const {refetch} = userData()
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [errors, setErrors] = useState();
  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`, { price: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrors(error.message);
    } else {
      setErrors("");
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
   
    } else {
      if (paymentIntent.status === "succeeded") {
       
        const { data } = await axiosSecure.patch(
          `/buyerCoinUpdate/${user?.email}`,
          { amount: price }
        );
        const paymentInfo = {
          email: user?.email,
          name: user?.displayName,
          amount: paymentIntent.amount,
          transtion_id: paymentIntent.id,
          transtion_date: new Date(),
        };

        if (data.modifiedCount > 0) {
          const { data } = await axiosSecure.post("/paymentHistory", {
            paymentInfo,
          });
          refetch()
          navigate("/Dashboard/paymentHistory")
        }

      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
                width: "400px",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div id="paymentBtn">
        <button
          type="submit"
          className="btn btn-success"
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </div>
    </form>
  );
}
