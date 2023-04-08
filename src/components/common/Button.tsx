import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  color: "red" | "blue";
};

export const Button: FC<Props> = ({ children, disabled, onClick, color }) => {
  const buttonStyle =
    color === "blue"
      ? `bg-blue-500 hover:bg-blue-400 rounded py-1 px-2 font-bold text-white disabled:opacity-30 md:py-2 md:px-4`
      : `bg-red-400 hover:bg-red-300 rounded py-1 px-2 font-bold text-white disabled:opacity-30 md:py-2 md:px-4`;

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
};
