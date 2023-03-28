import React from 'react';
import { Building } from '@/types/roomFloormap';

export const BuildingSelector = (props: {
  buildings: Building[];
  currentSelectedBuildingIndex: number;
  setCurrentSelectedBuildingIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className='border-x-4 border-t-4'>
      <select
        value={props.buildings[props.currentSelectedBuildingIndex].buildingName}
        onChange={(event) => {
          props.setCurrentSelectedBuildingIndex(
            props.buildings.findIndex((building) => building.buildingName === event.target.value),
          );
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
