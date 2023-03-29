import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEditingMapState } from '@/features/admin/editFloorMap/hooks/editingMapState';
import { useCustomSWR } from '@/hooks/useCustomSWR';
import { DBRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/api';

// マップデータ描画するのに必要なオブジェクト
const mapsDataState = atom({
  key: 'mapsState',
  default: [
    {
      roomId: -1,
      buildingId: -1,
      polygon: [
        [0, 0],
        [0, 0],
      ],
      color: 'rgba(0,255,0,0.3)',
    },
  ],
});

export const useMapsDataState = () => {
  return useRecoilValue(mapsDataState);
};

export const useMapsDataMutators = () => {
  const { data: rooms } = useCustomSWR<DBRoom[]>(`${endpoints.getRoomsEditorByCommunityID}`);
  const { data: buildings } = useCustomSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const setMapsData = useSetRecoilState(mapsDataState);

  const updateMouseOverRoomColor = (roomId: number) => {
    setMapsData((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomId === roomId) {
          // 更新する要素のみcolorプロパティを書き換えたオブジェクトを作成する
          return { ...room, color: 'rgba(' + [0, 0, 255, 0.7] + ')' };
        }
        // 更新しない要素はそのまま返す
        return room;
      });
    });
  };

  const updateMouseOutRoomColor = (roomId: number) => {
    setMapsData((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomId === roomId) {
          return { ...room, color: 'rgba(' + [0, 255, 0, 0.3] + ')' };
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
          roomId: -1,
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
              roomId: rooms[i].roomID,
              buildingId: rooms[i].buildingId,
              polygon: arrayPolygon,
              color: 'rgba(' + [0, 255, 0, 0.3] + ')',
            },
          ]);
        }
      }
    }
  }, [rooms, buildings, currentSelectedBuildingIndex]);

  return { updateMouseOverRoomColor, updateMouseOutRoomColor };
};
