import { FaSignInAlt } from "react-icons/fa";
import { login } from "@/utils/Auth";

const NotLogin = () => {
  return (
    <div className="flex items-center w-full h-screen ">
      <button
        className="flex items-center p-4 mx-auto mb-14 text-4xl text-white bg-slate-500 rounded-md hover:opacity-90"
        onClick={login}
      >
        <FaSignInAlt className="mr-2" />
        <div>Sign in with Google</div>
      </button>
    </div>
  );
};
export default NotLogin;
