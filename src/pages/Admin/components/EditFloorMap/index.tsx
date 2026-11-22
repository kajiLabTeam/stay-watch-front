import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import BuildingSelector from './BuildingSelector';
import MapCanvas from './MapCanvas';
import RegisterdRooms from './RegisterdRooms';
import { useEditingMapState } from '@/atoms/editingMapAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom, Building } from '@/types/roomFloormap';
import { ENDPOINTS } from '@/utils/endpoint';

export default function EditFloorMap() {
  const community = useCommunityState();
  const { data: rooms, isLoading: roomsIsLoading } = useGetAPI<EditorRoom[]>(
    `${ENDPOINTS.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings, isLoading: buildingsIsLoading } = useGetAPI<Building[]>(
    ENDPOINTS.getBuildingsEditor,
  );
  const { currentSelectedBuildingIndex } = useEditingMapState();

  if (roomsIsLoading || buildingsIsLoading) return <Loading message='マップ情報取得中' />;
  if (!buildings || !rooms) return <Error message='滞在情報取得失敗' />;

  return (
    <div className='flex'>
      <div className='w-full'>
        <BuildingSelector buildings={buildings} />
        <MapCanvas buildingImagePath={buildings[currentSelectedBuildingIndex].buildingImagePath} />
      </div>
      <div className='mt-10 w-1/4 rounded-lg border border-red-500'>
        <RegisterdRooms rooms={rooms} buildings={buildings} />
      </div>
    </div>
  );
}
