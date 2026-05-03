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
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setCanvasSize(null);
    setLoadError(false);
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        setCanvasSize({ width: img.naturalWidth, height: img.naturalHeight });
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setLoadError(true);
      }
    };
    img.src = `/floor_maps${props.buildingImagePath}`;
    return () => {
      cancelled = true;
    };
  }, [props.buildingImagePath]);

  if (loadError) return <div className='p-4 text-red-500'>マップ画像の読み込みに失敗しました</div>;
  if (!canvasSize) return <div className='p-4'>マップ読み込み中…</div>;

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
