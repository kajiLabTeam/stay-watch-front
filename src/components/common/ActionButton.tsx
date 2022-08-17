import { FC } from "react";

type Props = {
  name: "前へ" | "次へ" | "登録する";
  disabled?: boolean;
  onClick: () => void;
};

export const ActionButton: FC<Props> = (props) => {
  return (
    <button
      className="rounded bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-400 disabled:opacity-30 md:py-2 md:px-4"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};
