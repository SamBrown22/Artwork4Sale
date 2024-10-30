// RegisterForm.jsx
const RegisterForm = () => {
    return (
      <>
        <div>
          <label className="block text-sm font-semibold text-base-content">
            Username
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:outline-none"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-base-content">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-base-content bg-base-200 p-2 focus:border-primary focus:outline-none"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-base-content">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-base-content p-2 bg-base-200 focus:border-primary focus:outline-none"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary p-2 font-semibold text-white transition-all hover:bg-primary-content"
        >
          Sign Up
        </button>
      </>
    );
  };
  
  export default RegisterForm;
  