import Lottie from "lottie-react";
import shopping from "./assets/Shopping.json";
import {
  FaFacebook,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("+880");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  // Check if form is valid
  const isFormValid = first_name.trim() !== "" && 
                     last_name.trim() !== "" && 
                     phone_number.trim() !== "+880" && 
                     phone_number.length >= 14 && // +880 followed by 10 digits
                     password.trim() !== "" && 
                     confirmPassword.trim() !== "" &&
                     password === confirmPassword;

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    
    // Ensure the input always starts with +880
    if (!value.startsWith("+880")) {
      setPhoneNumber("+880");
      return;
    }
    
    // Allow only numbers after +880 and limit to 14 characters total (+880 + 11 digits)
    if (value.length > 14) return;
    
    // Validate that characters after +880 are only digits
    const numbersPart = value.substring(4);
    if (numbersPart === "" || /^\d*$/.test(numbersPart)) {
      setPhoneNumber(value);
    }
  };

  const handlePhoneKeyDown = (e) => {
    // Prevent deletion of the +880 prefix
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const selectionStart = e.target.selectionStart;
      if (selectionStart <= 4) {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Validate phone number length (should be +880 followed by 10 digits)
    if (phone_number.length !== 14) {
      setError("Phone number must be 14 digits including country code (+880)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          phone_number,
          password,
        }),
      });

      const rawText = await response.text();
      let data = rawText ? JSON.parse(rawText) : null;

      if (!response.ok) {
        console.error("Registration error:", data);
        setError("Registration failed: " + (data?.detail || "Please try again."));
        setLoading(false);
        return;
      }

      setLoading(false);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="max-w-7xl mx-auto p-3 min-h-screen">
      <div className="grid grid-cols-12 lg:mt-32 md:mt-16 sm:mt-8 gap-4">
        {/* Form */}
        <div className="col-span-12 md:col-span-12 lg:col-span-4 max-w-md mx-auto lg:mx-0">
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-full"
            onSubmit={handleSubmit}
          >
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name*
              </label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="first_name"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First Name"
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name*
              </label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="last_name"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Last Name"
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number*
              </label>
              <div className="relative flex items-center">
                <FaPhone className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  id="phone_number"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="+880XXXXXXXXXX"
                  required
                  value={phone_number}
                  onChange={handlePhoneNumberChange}
                  onKeyDown={handlePhoneKeyDown}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: +880 followed by 10 digits (e.g., +8801712345678)
              </p>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password*
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="p-2 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password*
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <button 
                    type="button" 
                    onClick={toggleConfirmPasswordVisibility}
                    className="p-2 text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 mb-4 font-semibold">{error}</div>
            )}

            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`${
                  isFormValid && !loading
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-blue-200 text-blue-800 opacity-70 cursor-not-allowed"
                } font-bold py-2 px-4 rounded border border-blue-400 focus:outline-none focus:shadow-outline w-full transition-colors duration-200`}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-600">Or Sign Up with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <button
                type="button"
                className="flex items-center justify-center w-max p-3 rounded-full focus:outline-none focus:shadow-outline text-blue-600 border border-blue-600 hover:bg-blue-100"
              >
                <FaFacebook className="text-2xl" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-max p-3 rounded-full focus:outline-none focus:shadow-outline text-red-600 border border-red-600 hover:bg-red-100"
              >
                <FaGoogle className="text-2xl" />
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-bold text-blue-500 hover:text-blue-800"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold">Register</h3>
            <p>
              to Access the Best Deals and Products <br /> in Bangladesh!
            </p>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex justify-center items-center">
          <Lottie className="w-full h-full" animationData={shopping} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Registration;