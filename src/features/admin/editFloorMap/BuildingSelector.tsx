import React from 'react';
import {
  useEditingMapMutators,
  useEditingMapState,
} from '@/features/admin/editFloorMap/hooks/editingMapState';
import { Building } from '@/types/roomFloormap';

export const BuildingSelector = (props: { buildings: Building[] }) => {
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const { setCurrentSelectedBuildingIndex } = useEditingMapMutators();

  return (
    <div className='border-x-4 border-t-4'>
      <select
        value={props.buildings[currentSelectedBuildingIndex].buildingName}
        onChange={(e) => {
          setCurrentSelectedBuildingIndex(e);
        }}
        className='border-2'
      >
        {props.buildings.map((building: Building) => {
          return <option key={building.buildingId}>{building.buildingName}</option>;
        })}
      </select>
    </div>
  );
};
