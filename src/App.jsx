// App.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <div className="bg-white">

    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  );
}

export default App;
