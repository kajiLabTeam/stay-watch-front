import { BuildingSelector } from '@/features/admin/editFloorMap/BuildingSelector';
import { MapCanvas } from '@/features/admin/editFloorMap/MapCanvas';
import { RegisterdRooms } from '@/features/admin/editFloorMap/RegisterdRooms';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { useCustomSWR } from '@/hooks/useCustomSWR';
import { DBRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/api';
import '@/hooks/selectUsersHook';

export const EditFloorMap = () => {
  const { data: rooms } = useCustomSWR<DBRoom[]>(`${endpoints.getRoomsEditorByCommunityID}`);
  const { data: buildings } = useCustomSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const { currentSelectedBuildingIndex } = useEditingMapState();

  return (
    <div>
      <div className='flex'>
        <div className='w-3/4'>
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
};

export default EditFloorMap;
