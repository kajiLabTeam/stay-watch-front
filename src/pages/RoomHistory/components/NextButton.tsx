import { Button } from '@mantine/core';

type NextButtonProps = {
  currentPage: number;
  nextPage: () => void;
  historyCount: number;
};

export const NextButton = ({ currentPage, nextPage, historyCount }: NextButtonProps) => {
  const limit = 30;
  const MaxPage = historyCount / limit;
  if (currentPage >= MaxPage) {
    return <div />;
  }
  return (
    <Button color='blue' onClick={nextPage}>
      次へ
    </Button>
  );
};
