import { useEffect } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEditingMapState } from '@/atoms/editingMapAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom, Building } from '@/types/roomFloormap';
import { endpoints } from '@/utils/endpoint';

// マップデータ描画するのに必要なオブジェクト
const mapsDataState = atom([
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

export const useMapsDataState = () => {
  return useAtomValue(mapsDataState);
};

export const useMapsDataMutators = () => {
  const community = useCommunityState();
  const { data: rooms } = useGetAPI<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings } = useGetAPI<Building[]>(`${endpoints.getBuildingsEditor}`);
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const setMapsData = useSetAtom(mapsDataState);

  const updateMouseOverRoomColor = (roomId: number) => {
    setMapsData((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomId === roomId) {
          // 更新する要素のみcolorプロパティを書き換えたオブジェクトを作成する
          return { ...room, color: `rgba(${[0, 0, 255, 0.7]})` };
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
          setMapsData((mapData) => [
            ...mapData,
            {
              roomId: rooms[i].roomId,
              buildingId: rooms[i].buildingId,
              polygon: rooms[i].polygon,
              color: `rgba(${[0, 255, 0, 0.3]})`,
            },
          ]);
        }
      }
    }
  }, [rooms, buildings, currentSelectedBuildingIndex, setMapsData]);

  return { updateMouseOverRoomColor, updateMouseOutRoomColor };
};
