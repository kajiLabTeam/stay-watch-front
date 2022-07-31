import { login } from "@/utils/Auth";

export const LoginButton = () => {
  return (
    <div>
      <button
        className="rounded-md bg-slate-500 p-1 hover:opacity-90"
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
};
