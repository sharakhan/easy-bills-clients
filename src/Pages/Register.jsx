// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Lock, Camera, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCriteria, setShowCriteria] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = (pass) => {
    if (!pass) return "Password is required";
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pass)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(pass)) return "Must contain a lowercase letter";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await register(
        formData.email,
        formData.password,
        formData.name.trim(),
        formData.photoURL.trim()
      );

      // Success: No toast, just redirect
      navigate("/", { replace: true });

    } catch (err) {
      // Only show toast on error
      const message =
        err.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : err.code === "auth/weak-password"
          ? "Password is too weak"
          : "Registration failed. Please try again.";

      toast.error(message);
      setErrors(prev => ({ ...prev, password: message.includes("password") ? message : "" }));
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Google signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Easy Bill Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <Camera className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            {/* Password with Eye Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setShowCriteria(true)}
                  onBlur={() => setTimeout(() => setShowCriteria(false), 200)}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Criteria */}
              {showCriteria && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs border">
                  <p className="font-medium text-gray-700 mb-1">Password must contain:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li className={formData.password.length >= 6 ? "text-green-600" : ""}>
                      • At least 6 characters
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                      • One uppercase letter
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                      • One lowercase letter
                    </li>
                  </ul>
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-medium bg-white">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition hover:shadow-md"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 hover:underline">
              Log in here
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 Easy Bill Management System
        </p>
      </div>
    </div>
  );
};

export default Register;