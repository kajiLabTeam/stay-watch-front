'use client';
import React from 'react';
import { EditingPolygonCanvas } from '@/features/admin/editFloorMap/components/EditingPolygonCanvas';
import { FloorMapCanvas } from '@/features/admin/editFloorMap/components/FloorMapCanvas';
import { RoomCanvas } from '@/features/admin/editFloorMap/components/RoomCanvas';
import { useMapsDataState } from '@/features/admin/editFloorMap/globalstate/mapState';
import { FloorMapRoom } from '@/types/roomFloormap';

export const MapCanvas = (props: {
  buildingImagePath: string;
  currentSelectedBuildingId: number;
}) => {
  const mapsData = useMapsDataState();

  return (
    // "relative"でフロアマップ、登録済み部屋達、編集中の部屋、の複数canvasをレイヤーとして重ねている
    <div className='relative'>
      <FloorMapCanvas buildingImagePath={props.buildingImagePath} />
      {mapsData.map((mapdata: FloorMapRoom) => {
        if (mapdata.buildingId === props.currentSelectedBuildingId) {
          return (
            <div key={mapdata.roomId}>
              <RoomCanvas roomID={mapdata.roomId} polygon={mapdata.polygon} color={mapdata.color} />
            </div>
          );
        }
      })}
      <EditingPolygonCanvas />
    </div>
  );
};
