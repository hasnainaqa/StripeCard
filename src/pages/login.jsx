import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, isUserLoggedIn } from "../utils/aouth";
import PhoneInputComponent from "../components/ui/PhoneInputComponent";
import { useForm } from "react-hook-form";

const Login = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      loginUser(token);
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const validPhone = "+905555555222";
      const validPassword = "123456";

      if (data.phone === validPhone && data.password === validPassword) {
        const fakeToken = "hardcoded_token_123";
        loginUser(fakeToken);
        navigate("/");
      } else {
        setError("Invalid phone or password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#d1fae5] via-white to-[#bbf7d0] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#9bec8d] to-[#52FF34] p-6">
          <h2 className="text-2xl font-bold text-black text-center">
             Login
          </h2>
          <p className="text-sm text-black text-center mt-1">
            Welcome back! Please log in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="p-6 space-y-5">
          {error && (
            <p className="text-red-500 text-sm bg-red-100 p-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <PhoneInputComponent
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            error={errors.phone}
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full pl-10 pr-3 py-3 bg-gray-100 placeholder:text-gray-500 text-black rounded-lg focus:outline-none shadow"
            />
          {errors.password && (
            <p className="absolute text-red-500 text-xs -mt-4.5">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold shadow-md transition-all duration-200 disabled:opacity-50 bg-[#52FF34] hover:bg-[#7ef768] text-black"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Payments are securely processed 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
