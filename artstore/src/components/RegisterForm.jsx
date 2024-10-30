// RegisterForm.jsx
import { addUser } from "@/services/userService";

const RegisterForm = () => {
  return (
    <form action={addUser} className="w-full max-w-xs space-y-4">
      {/* Form Fields */}
      <div>
        <label className="block text-sm font-semibold text-base-content">
          Username
        </label>
        <input
          name="username"
          type="text"
          className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:outline-none"
          placeholder="Enter username"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-base-content">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:outline-none"
          placeholder="Enter email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-base-content">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="w-full rounded-md border border-base-content p-2 bg-base-200 focus:border-primary focus:outline-none"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary p-2 font-semibold text-white transition-all hover:bg-primary-content"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
