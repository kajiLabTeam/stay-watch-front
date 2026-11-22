import { Button } from '@mantine/core';

type PrevButtonProps = {
  currentPage: number;
  previousPage: () => void;
};

export const PrevButton = ({ currentPage, previousPage }: PrevButtonProps) => {
  //pageが1より大きい時にボタンを表示
  if (currentPage > 1) {
    return (
      <Button color='blue' onClick={previousPage}>
        前へ
      </Button>
    );
  }
  return <div />;
};
