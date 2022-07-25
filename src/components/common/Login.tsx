import { login } from "@/utils/Auth";

const Login = () => {
  return (
    <div>
      <button
        className="p-1 bg-slate-500 rounded-md hover:opacity-90"
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
