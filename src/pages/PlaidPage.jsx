import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

export default function PlaidPage() {
  const [linkToken, setLinkToken] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    api
      .post("/plaid/create-link-token")
      .then((res) => setLinkToken(res.data.link_token))
      .catch((err) => console.error("Error getting link token", err));
  }, []);

  const onSuccess = async (public_token) => {
    console.log("Public Token:", public_token);

    await api.post("/plaid/exchange-public-token", {
      publicToken: public_token,
    });

    toast.success("Bank account connected successfully!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#d1fae5] via-white to-[#bbf7d0] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#9bec8d] to-[#52FF34] p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Plaid Integration
          </h1>
          <p className="text-sm text-black text-center mt-1">
            Securely connect your bank account
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 space-y-5">
          <button
            onClick={() => open()}
            className={`w-full py-3 px-4 rounded-xl shadow-md font-medium transition ${
              !ready || !linkToken
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#52FF34] hover:bg-[#7ef768] text-black"
            }`}
          >
            Connect Bank
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
