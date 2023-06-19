import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <span className="mb-5 text-5xl font-bold text-slate-200">
        Page Not Found.
      </span>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-slate-200 duration-75 ease-in hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
