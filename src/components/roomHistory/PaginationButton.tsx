import { FC } from "react";

type Props = {
  name: "前へ" | "次へ";
  onClick: () => void;
};

export const PaginationButton: FC<Props> = (props) => {
  return (
    <button
      className="rounded bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-400 md:py-2 md:px-4 "
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};
