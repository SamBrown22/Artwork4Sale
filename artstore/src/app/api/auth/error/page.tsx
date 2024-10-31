// pages/auth/error.tsx

const AuthErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="max-w-md text-center p-4 rounded-md bg-white shadow-md">
        <h1 className="text-2xl font-semibold text-error">Authentication Error</h1>
        <p className="mt-4 text-base-content">
        </p>
        <p className="mt-4">You will be redirected to the login page shortly.</p>
        <a href="/signup-login" className="mt-6 inline-block rounded-md bg-primary p-2 text-white">
          Go to Login Now
        </a>
      </div>
    </div>
  );
};

export default AuthErrorPage;
