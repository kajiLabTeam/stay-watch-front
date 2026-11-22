import React from 'react';
import { EditingPolygonCanvas } from './EditingPolygonCanvas';
import { FloorMapCanvas } from './FloorMapCanvas';
import { RoomCanvas } from './RoomCanvas';
import { useMapsDataState } from '@/atoms/mapAtom';
import { useImage } from '@/hooks/useImage';
import { FloorMapRoom } from '@/types/roomFloormap';

export const MapCanvas = (props: {
  buildingImagePath: string;
  currentSelectedBuildingId: number;
}) => {
  const mapsData = useMapsDataState();
  const { image, isError } = useImage(`/floor_maps${props.buildingImagePath}`);

  if (isError) return <div className='p-4 text-red-500'>マップ画像の読み込みに失敗しました</div>;
  if (!image) return <div className='p-4'>マップ読み込み中…</div>;

  return (
    // "relative"でフロアマップ、登録済み部屋達、編集中の部屋、の複数canvasをレイヤーとして重ねている
    <div className='relative'>
      <FloorMapCanvas
        buildingImagePath={props.buildingImagePath}
        canvasWidth={image.naturalWidth}
        canvasHeight={image.naturalHeight}
      />
      {mapsData.map((mapdata: FloorMapRoom) => {
        if (mapdata.buildingId === props.currentSelectedBuildingId) {
          return (
            <div key={mapdata.roomId}>
              <RoomCanvas
                roomID={mapdata.roomId}
                polygon={mapdata.polygon}
                color={mapdata.color}
                canvasWidth={image.naturalWidth}
                canvasHeight={image.naturalHeight}
              />
            </div>
          );
        }
      })}
      <EditingPolygonCanvas canvasWidth={image.naturalWidth} canvasHeight={image.naturalHeight} />
    </div>
  );
};
