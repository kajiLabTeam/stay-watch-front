import { useDocumentTitle } from '@mantine/hooks';
import { formatStayerDataForTable } from './utils';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/endpoint';

const Stayer = () => {
  useDocumentTitle('滞在者一覧');
  const {
    data: stayers,
    error: errorStayers,
    isLoading: isLoadingStayers,
  } = useGetAPI<StayerType[]>(`${endpoints.stayers}`);
  const {
    data: rooms,
    error: errorRooms,
    isLoading: isLoadingRooms,
  } = useGetAPI<EditorRoom[]>(`${endpoints.getRoomsEditorByCommunityID}/2`);

  if (isLoadingRooms || isLoadingStayers) return <Loading message='滞在情報取得中' />;
  if (errorStayers || errorRooms) return <Error message='滞在情報取得失敗' />;
  if (rooms && stayers)
    return (
      <div>
        <table className='mt-5 w-full table-fixed rounded border text-xs shadow sm:text-base md:text-2xl'>
          <thead>
            <tr className='bg-staywatch-black text-left text-white'>
              <th className='w-4/12 border py-2 pl-4 md:w-3/12'>部屋</th>
              <th className='w-8/12 border py-2 pl-4 md:w-9/12'>名前（タグ）</th>
            </tr>
          </thead>
          <tbody>
            {formatStayerDataForTable(stayers, rooms).map((stayersInRoom) => (
              <tr className='border text-left' key={stayersInRoom.room}>
                <td className='px-2 text-sm md:text-2xl'>{stayersInRoom.room}</td>
                <td className='border'>
                  {stayersInRoom.stayers.map((stayerInRoom) => (
                    <div className='p-0.5 text-sm md:py-2 md:text-2xl' key={stayerInRoom.name}>
                      {stayerInRoom.name}（
                      {stayerInRoom.tags.map((tag, index) => (
                        <span key={tag.id}>
                          {tag.name}
                          {index !== stayerInRoom.tags.length - 1 && ' , '}
                        </span>
                      ))}
                      ）
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return <></>;
};

export default Stayer;
