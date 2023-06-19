import Google from "../../assets/Google.svg";
import { signInWithGoogle } from "../../services/firebase";

const Signin = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2 duration-75 ease-out hover:bg-slate-200 active:bg-slate-300"
        onClick={signInWithGoogle}
      >
        <img src={Google} alt="Google" className="mr-2 h-5 w-5" />
        <span className="font-medium text-slate-900">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Signin;
