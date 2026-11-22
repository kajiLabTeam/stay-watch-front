import NextButton from './NextButton';
import PrevButton from './PrevButton';

interface RoomHistoryPaginationProps {
  currentOffset: number;
  currentPage: number;
  historyCount: number;
  onPreviousPageClicked: () => void;
  onNextPageClicked: () => void;
}

export default function RoomHistoryPagination({
  currentOffset,
  currentPage,
  historyCount,
  onPreviousPageClicked,
  onNextPageClicked,
}: RoomHistoryPaginationProps) {
  return (
    <>
      <div className='hidden min-[854px]:block'>
        <div className='fixed inset-y-1/2 left-4'>
          <PrevButton currentPage={currentOffset} previousPage={onPreviousPageClicked} />
        </div>
        <div className='fixed inset-y-1/2 right-4'>
          <NextButton
            currentPage={currentPage}
            nextPage={onNextPageClicked}
            historyCount={historyCount}
          />
        </div>
      </div>
      <div className='mt-2 flex h-10 w-full justify-between text-white min-[854px]:hidden md:mt-4'>
        <PrevButton currentPage={currentOffset} previousPage={onPreviousPageClicked} />
        <NextButton
          currentPage={currentPage}
          nextPage={onNextPageClicked}
          historyCount={historyCount}
        />
      </div>
    </>
  );
}
