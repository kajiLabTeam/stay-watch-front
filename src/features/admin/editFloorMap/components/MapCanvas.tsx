'use client';
import React, { useEffect, useState } from 'react';
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
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setCanvasSize(null);
    const img = new Image();
    img.onload = () => {
      setCanvasSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = `/floor_maps${props.buildingImagePath}`;
  }, [props.buildingImagePath]);

  if (!canvasSize) return null;

  return (
    // "relative"でフロアマップ、登録済み部屋達、編集中の部屋、の複数canvasをレイヤーとして重ねている
    <div className='relative'>
      <FloorMapCanvas
        buildingImagePath={props.buildingImagePath}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
      />
      {mapsData.map((mapdata: FloorMapRoom) => {
        if (mapdata.buildingId === props.currentSelectedBuildingId) {
          return (
            <div key={mapdata.roomId}>
              <RoomCanvas
                roomID={mapdata.roomId}
                polygon={mapdata.polygon}
                color={mapdata.color}
                canvasWidth={canvasSize.width}
                canvasHeight={canvasSize.height}
              />
            </div>
          );
        }
      })}
      <EditingPolygonCanvas canvasWidth={canvasSize.width} canvasHeight={canvasSize.height} />
    </div>
  );
};
