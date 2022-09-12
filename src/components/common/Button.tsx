import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ children, disabled, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-400 disabled:opacity-30 md:py-2 md:px-4"
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
};
