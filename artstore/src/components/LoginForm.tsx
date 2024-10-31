"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginForm: React.FC = () => {
  const [error, setError] = useState({ message: "", field: "" }); // State to store error messages

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Gather form data

    // Extract email and password from FormData
    const email = formData.get("email") as string; // Assert type to string
    const password = formData.get("password") as string; // Assert type to string

    // Call NextAuth signIn function
    const res = await signIn("credentials", {
      redirect: false, // Do not redirect after sign-in
      email, // Pass email
      password, // Pass password
      callbackUrl: "/", // Redirect to home page after sign-in
    });

    console.log(res);
    if (res?.error) { // Use optional chaining to avoid errors
      // Determine which field the error relates to
      if (res.error.includes("username") && res.error.includes("password")) {
        setError({ message: res.error, field: "both" });
      } else if (res.error.includes("username")) {
        setError({ message: res.error, field: "username" });
      } else if (res.error.includes("password")) {
        setError({ message: res.error, field: "password" });
      } else {
        setError({ message: res.error, field: "null" });
      }
    } else {
      setError({ message: "", field: "" });
      redirect(res?.url || "/"); // Redirect to the URL returned by signIn or fallback to home
    }
  };

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
          required // Add required attribute for better form validation
        />
        {/* Show error message for userError, directly below the email input */}
        {error.field === "username" && (
          <div className="text-sm text-error">{error.message}</div>
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
          required // Add required attribute for better form validation
        />
        {/* Show error message for passwordError, directly below the password input */}
        {(error.field === "password" || error.field === "both") && (
          <div className="text-sm text-error">{error.message}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary p-2 font-semibold text-white transition-all hover:bg-primary-content"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
