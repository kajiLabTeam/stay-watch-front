// atoms.ts
import axios from 'axios';
import React, { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useSuspenseSWR } from '@/hooks/useSuspenseSWR';
import { EditorRoom, Building, SubmitRoom } from '@/types/roomFloormap';
import { endpoints } from '@/utils/endpoint';

const editingMapState = atom({
  key: 'editingMapAtom',
  default: {
    editingPolygon: [
      [0, 0],
      [1, 1],
    ],
    currentSelectedBuildingIndex: 0,
    isEditingRoom: false,
    editingRoomId: -1,
  },
});

export const useEditingMapState = () => {
  return useRecoilValue(editingMapState);
};

export const useEditingMapMutators = () => {
  const community = useCommunityState();
  const { data: rooms } = useSuspenseSWR<EditorRoom[]>(
    `${endpoints.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings } = useSuspenseSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const { editingPolygon, currentSelectedBuildingIndex } = useEditingMapState();

  const setEditingMap = useSetRecoilState(editingMapState);

  // フォームの「保存する」を押されたときの処理
  const storeRoomToDatabase = useCallback(
    (roomId: number, newRoomName: string) => {
      if (editingPolygon && rooms && buildings) {
        //const IndexNumber: number = rooms?.findIndex((room) => room.roomId === roomId); // roomIdからインデックスを求める処理

        let newRoom: SubmitRoom = {
          roomId: roomId,
          roomName: newRoomName,
          polygon: editingPolygon,
          buildingId: buildings[currentSelectedBuildingIndex].buildingId,
        };

        axios
          .put(endpoints.updateroom, newRoom)
          .then(() => {
            // 例 : {roomID: 3, room_name: '院生部', polygon: [[200,200],[300,300]], buildingID: 2}
            window.alert('成功しました');
          })
          .catch((err) => {
            console.error(err);
            window.alert('失敗しました');
          });
      } else {
        window.alert('失敗しました');
      }
    },
    [editingPolygon, currentSelectedBuildingIndex, buildings, rooms],
  );

  const updateCurrentSelectedBuildingIndexByBuildingId = useCallback(
    (buildingId: number) => {
      if (buildings) {
        const selectedIndex = buildings.findIndex((building) => building.buildingId === buildingId);
        if (selectedIndex !== -1) {
          setEditingMap((prev) => ({
            ...prev,
            currentSelectedBuildingIndex: selectedIndex,
          }));
        }
      }
    },
    [buildings, setEditingMap],
  );

  const setCurrentSelectedBuildingIndex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (buildings) {
      setEditingMap((prev) => ({
        ...prev,
        currentSelectedBuildingIndex: buildings.findIndex(
          (building) => building.buildingName === event.target.value,
        ),
      }));
    }
  };

  const setIsEditingRoom = (isEditingRoom: boolean) => {
    setEditingMap((prev) => ({
      ...prev,
      isEditingRoom,
    }));
  };

  const setEditingPolygon = (editingPolygon: number[][]) => {
    setEditingMap((prev) => ({
      ...prev,
      editingPolygon,
    }));
  };

  const setEditingRoomId = (editingRoomId: number) => {
    setEditingMap((prev) => ({
      ...prev,
      editingRoomId,
    }));
  };

  return {
    storeRoomToDatabase,
    updateCurrentSelectedBuildingIndexByBuildingId,
    setCurrentSelectedBuildingIndex,
    setIsEditingRoom,
    setEditingPolygon,
    setEditingRoomId,
  };
};
