import { login } from "@/utils/Auth";

export const LoginButton = () => {
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
