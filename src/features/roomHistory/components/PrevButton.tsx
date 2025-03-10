import { Button } from '@mantine/core';

const PrevButton = (CurrentPage: number, PreviousPage: () => void) => {
  //pageが1より大きい時にボタンを表示
  if (CurrentPage > 1) {
    return (
      <Button color='blue' onClick={PreviousPage}>
        前へ
      </Button>
    );
  }
  return <div />;
};

export default PrevButton;
