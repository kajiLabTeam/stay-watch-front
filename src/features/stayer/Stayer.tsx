import { useDocumentTitle } from '@mantine/hooks';
import { formatStayerDataForTable } from './utils';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';
import { endpoints } from '@/utils/api';

const Stayer = () => {
  useDocumentTitle('滞在者一覧');
  const { data: stayers } = useSuspenseSWR<StayerType[]>(`${endpoints.stayers}`);
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/2`,
  );

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
              <td className="px-2">{stayersInRoom.room}</td>
              <td className="border">
                {stayersInRoom.stayers.map((stayerInRoom) => (
                  <div className="py-2 px-1" key={stayerInRoom.name}>
                    {stayerInRoom.name}（
                    {stayerInRoom.tags.map((tag, index) => (
                      <span key={tag.id}>
                        {tag.name}
                        {index !== stayerInRoom.tags.length - 1 && " , "}
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
};

export default Stayer;
