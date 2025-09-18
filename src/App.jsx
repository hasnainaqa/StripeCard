// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import PlaidPage from "./pages/PlaidPage";
import Login from "./pages/login";
import ProtectedRoute from "./utils/ProtectedRoute";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<PlaidPage />} />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}export default App;
