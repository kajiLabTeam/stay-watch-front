// src/hooks/useUpdateMapData.ts
import { useEffect, useState } from 'react';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { DBRoom, Building } from '@/types/roomFloormap';

export const useRoomMapData = (rooms: DBRoom[] | undefined, buildings: Building[] | undefined) => {
  const { currentSelectedBuildingIndex } = useEditingMapState();

  const [mapsData, setMapsData] = useState([
    {
      roomID: -1,
      buildingId: -1,
      polygon: [
        [0, 0],
        [0, 0],
      ],
      color: 'rgba(0,255,0,0.3)',
    },
  ]);

  const updateMouseOverRoomColor = (roomID: number) => {
    setMapsData((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomID === roomID) {
          // 更新する要素のみcolorプロパティを書き換えたオブジェクトを作成する
          return { ...room, color: `rgba(${[0, 0, 255, 0.7]})` };
        }
        // 更新しない要素はそのまま返す
        return room;
      });
    });
  };

  const updateMouseOutRoomColor = (roomID: number) => {
    setMapsData((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomID === roomID) {
          return { ...room, color: `rgba(${[0, 255, 0, 0.3]})` };
        }
        return room;
      });
    });
  };

  useEffect(() => {
    // DBの内容、現在選択されている建物IDが変わった時に動作する
    if (rooms && buildings) {
      setMapsData([
        {
          roomID: -1,
          buildingId: -1,
          polygon: [
            [0, 0],
            [0, 0],
          ],
          color: 'rgba(0,255,0,0.3)',
        },
      ]);
      for (let i = 0; i < rooms.length; ++i) {
        // 部屋の建物IDと現在選択されている建物IDが同じ時その部屋の情報をmapDataに加える
        if (rooms[i].buildingId === buildings[currentSelectedBuildingIndex].buildingId) {
          const arrayPolygon: number[][] = new Array();
          const tmpArrayPolygon: string[] = rooms[i].polygon.split('-');
          for (let j = 0; j < tmpArrayPolygon.length; ++j) {
            const tmpPairPolygon = tmpArrayPolygon[j].split(',');
            const polygonPoint: number[] = [Number(tmpPairPolygon[0]), Number(tmpPairPolygon[1])];
            arrayPolygon.push(polygonPoint);
          }
          setMapsData((mapData) => [
            ...mapData,
            {
              roomID: rooms[i].roomID,
              buildingId: rooms[i].buildingId,
              polygon: arrayPolygon,
              color: `rgba(${[0, 255, 0, 0.3]})`,
            },
          ]);
        }
      }
    }
  }, [rooms, buildings, currentSelectedBuildingIndex]);

  return { mapsData, updateMouseOverRoomColor, updateMouseOutRoomColor };
};
