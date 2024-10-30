"use client"

import { useState } from "react"
import { loginUser } from "@/services/userService"

const LoginForm = () => {
  const [error, setError] = useState("") // State to store error messages

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission
    const formData = new FormData(event.target) // Gather form data

    const result = await loginUser(formData) // Call the loginUser function

    // Handle error response
    if (result.error) {
      setError(result.error) // Set error message from result
    } else {
      // Clear error and handle successful login (if needed)
      setError("")
      // You might want to perform additional actions on successful login, like redirecting
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
      <div>
        <label className="block text-sm font-semibold text-base-content">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:bg-base-300 focus:outline-none"
          placeholder="Enter email"
          required
        />

        {/* Show error message for userError, directly below the email input */}
        {error.type === "userError" && (
          <div className="text-red-500 text-sm">{error.message}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-base-content">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:bg-base-300 focus:outline-none"
          placeholder="Enter password"
          required
        />

        {/* Show error message for passwordError, directly below the password input */}
        {error.type === "passwordError" && (
          <div className="text-red-500 text-sm">{error.message}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary p-2 font-semibold text-white transition-all hover:bg-primary-content"
      >
        Log In
      </button>
    </form>
  )
}

export default LoginForm
