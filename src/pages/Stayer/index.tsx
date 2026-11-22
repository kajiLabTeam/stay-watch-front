import StayerTable from './components/StayerTable';
import { formatStayerDataForTable } from './utils';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';
import { ENDPOINTS } from '@/utils/endpoint';

export default function Stayer() {
  const {
    data: stayers,
    error: errorStayers,
    isLoading: isLoadingStayers,
  } = useGetAPI<StayerType[]>(ENDPOINTS.stayers);
  const {
    data: rooms,
    error: errorRooms,
    isLoading: isLoadingRooms,
  } = useGetAPI<EditorRoom[]>(`${ENDPOINTS.getRoomsEditorByCommunityID}/2`);

  if (isLoadingRooms || isLoadingStayers) return <Loading message='滞在情報取得中' />;
  if (errorStayers || errorRooms) return <Error message='滞在情報取得失敗' />;
  if (!rooms || !stayers) return <></>;

  return (
    <>
      <title>滞在者一覧</title>
      <StayerTable stayersByRoom={formatStayerDataForTable(stayers, rooms)} />
    </>
  );
}
