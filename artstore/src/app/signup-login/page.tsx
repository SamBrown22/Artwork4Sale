"use client";

import { useState, useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const [showRegister, setShowRegister] = useState(searchParams.get("page") === "register");

  // Update local state if the URL search parameters change
  useEffect(() => {
    const page = searchParams.get("page");
    setShowRegister(page === "register");
  }, [searchParams]); // Add searchParams as a dependency

  // Function to handle switching forms and update URL
  const toggleForm = () => {
    setShowRegister((prev) => {
      const newShowRegister = !prev;
      const newPage = newShowRegister ? "register" : "login";
      // Update the URL without navigating
      window.history.pushState({}, '', `?page=${newPage}`);
      return newShowRegister;
    });
  };

  return (
    <div className="flex items-center justify-center bg-base-100 h-full">
      <div className="relative flex h-[600px] w-full max-w-[800px] overflow-hidden rounded-lg bg-base-300 shadow-lg">
        {/* Photo Section for Register */}
        <div
          className={`absolute inset-y-0 left-0 hidden w-1/2 bg-[url('/images/register-image.jpg')] bg-cover bg-center transition-all duration-700 ease-in-out sm:block ${
            showRegister ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f]/90 to-[#0f0f0f]/10"></div>
        </div>

        {/* Photo Section for Login */}
        <div
          className={`absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/images/login-image.jpg')] bg-cover bg-center transition-all duration-700 ease-in-out sm:block ${
            showRegister ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f]/90 to-[#0f0f0f]/10"></div>
        </div>

        {/* Form Section */}
        <div
          className={`flex w-full flex-col items-center justify-center transition-transform duration-500 ease-in-out sm:w-1/2 sm:p-12 ${
            showRegister ? "sm:translate-x-full" : "sm:translate-x-0"
          }`}
        >
          <h2 className="mb-6 text-3xl font-bold text-base-content underline">
            {showRegister ? "Register" : "Login"}
          </h2>
          <div className="w-full max-w-xs">
            {showRegister ? <RegisterForm /> : <LoginForm />}
          </div>
          <p className="mt-4 text-sm text-base-content">
            {showRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="font-semibold text-primary hover:underline"
            >
              {showRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
