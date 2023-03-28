import React from 'react';
import { EditingPolygonCanvas } from '@/features/admin/editFloorMap/EditingPolygonCanvas';
import { FloorMapCanvas } from '@/features/admin/editFloorMap/FloorMapCanvas';
import { RoomCanvas } from '@/features/admin/editFloorMap/RoomCanvas';
import { EditorFloorMap } from '@/types/roomFloormap';

export const MapCanvas = (props: {
  mapsdata: EditorFloorMap[];
  editingPolygon: number[][];
  isEditingRoom: boolean;
  buildingImagePath: string;
  currentSelectedBuildingId: number;
  setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>;
}) => {
  return (
    // "relative"でフロアマップ、登録済み部屋達、編集中の部屋、の複数canvasをレイヤーとして重ねている
    <div className='relative'>
      <FloorMapCanvas buildingImagePath={props.buildingImagePath} />
      {props.mapsdata.map((mapdata: EditorFloorMap) => {
        if (mapdata.buildingId === props.currentSelectedBuildingId) {
          return (
            <div key={mapdata.roomID}>
              <RoomCanvas roomID={mapdata.roomID} polygon={mapdata.polygon} color={mapdata.color} />
            </div>
          );
        }
      })}
      <EditingPolygonCanvas
        setEditingPolygon={props.setEditingPolygon}
        editingPolygon={props.editingPolygon}
        isEditingRoom={props.isEditingRoom}
      />
    </div>
  );
};
