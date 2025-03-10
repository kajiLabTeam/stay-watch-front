import { Button } from '@mantine/core';

const nextButton = (CurrentPage: number, NextPage: () => void, HistoryCount: number) => {
  const limit = 30;
  const MaxPage = HistoryCount / limit;
  if (CurrentPage >= MaxPage) {
    return <div />;
  }
  return (
    <Button color='blue' onClick={NextPage}>
      次へ
    </Button>
  );
};

export default nextButton;
