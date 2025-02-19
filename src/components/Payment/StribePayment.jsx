import React from "react";



import CheckoutForm from "./CheckoutForm ";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
export default function StribePayment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm >

        </CheckoutForm>
      </Elements>
    </div>
  );
}
