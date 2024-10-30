// src/app/404.js
export default function Custom404() {
    return (
      <div className="-m-4 flex items-center justify-center h-full bg-base-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl mt-4">Page Not Found</h2>
          <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
          <a href="/" className="mt-4 text-primary underline">Go back to Home</a>
        </div>
      </div>
    );
  }
  