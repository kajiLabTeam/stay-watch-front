'use client';
import { BuildingSelector } from '@/features/admin/editFloorMap/components/BuildingSelector';
import { MapCanvas } from '@/features/admin/editFloorMap/components/MapCanvas';
import { RegisterdRooms } from '@/features/admin/editFloorMap/components/RegisterdRooms';
import { useEditingMapState } from '@/features/admin/editFloorMap/globalstate/editingMapState';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/endpoint';

export const EditFloorMap = () => {
  const community = useCommunityState();
  const { data: rooms, isLoading: roomsIsLoading } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings, isLoading: buildingsIsLoading } = useSuspenseSWR<Building[]>(
    `${endpoints.getBuildingsEditor}`,
  );
  const { currentSelectedBuildingIndex } = useEditingMapState();

  if (roomsIsLoading || buildingsIsLoading) return <div>loadingda...</div>;
  if (buildings && rooms)
    return (
      <div>
        <div className='flex'>
          <div className='w-full'>
            <BuildingSelector buildings={buildings} />
            <MapCanvas
              buildingImagePath={buildings[currentSelectedBuildingIndex].buildingImagePath}
              currentSelectedBuildingId={buildings[currentSelectedBuildingIndex].buildingId}
            />
          </div>
          <div className='mt-10 w-1/4 rounded-lg border border-red-500'>
            <RegisterdRooms rooms={rooms} buildings={buildings} />
          </div>
        </div>
      </div>
    );
  return <></>;
};

export default EditFloorMap;
