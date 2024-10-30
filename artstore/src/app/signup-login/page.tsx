// AuthPage.js
"use client"

import { useState } from "react"
import RegisterForm from "@/components/RegisterForm" // Ensure the import path is correct
import LoginForm from "@/components/LoginForm" // Ensure the import path is correct

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex items-center justify-center bg-base-100 h-full">
      <div className="relative flex h-[600px] w-full max-w-[800px] overflow-hidden rounded-lg bg-base-300 shadow-lg">
        {/* Photo Section for Register */}
        <div
          className={`absolute inset-y-0 left-0 hidden w-1/2 bg-[url('/images/register-image.jpg')] bg-cover bg-center transition-all duration-700 ease-in-out sm:block ${
            isRegister
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f]/90 to-[#0f0f0f]/10"></div>
        </div>

        {/* Photo Section for Login */}
        <div
          className={`absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/images/login-image.jpg')] bg-cover bg-center transition-all duration-00 ease-in-out sm:block ${
            isRegister
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f]/90 to-[#0f0f0f]/10"></div>
        </div>

        {/* Form Section */}
        <div
          className={`flex w-full flex-col items-center justify-center transition-transform duration-500 ease-in-out sm:w-1/2 sm:p-12 ${
            isRegister ? "sm:translate-x-full" : "sm:translate-x-0"
          }`}
        >
          <h2 className="mb-8 text-3xl font-bold text-base-content underline">
            {isRegister ? "Register" : "Login"}
          </h2>
          <form className="w-full max-w-xs space-y-4">
            {isRegister ? <RegisterForm /> : <LoginForm />}
          </form>
          <p className="mt-4 text-sm text-base-content">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-semibold text-primary hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
