import { request } from '@/utils/api';
import React, { useCallback } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom, Building, SubmitRoom } from '@/types/roomFloormap';
import { ENDPOINTS } from '@/utils/endpoint';

const editingMapState = atom({
  editingPolygon: [
    [0, 0],
    [1, 1],
  ],
  currentSelectedBuildingIndex: 0,
  isEditingRoom: false,
  editingRoomId: -1,
});

export const useEditingMapState = () => {
  return useAtomValue(editingMapState);
};

export const useEditingMapMutators = () => {
  const community = useCommunityState();
  const { data: rooms } = useGetAPI<EditorRoom[]>(
    `${ENDPOINTS.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings } = useGetAPI<Building[]>(ENDPOINTS.getBuildingsEditor);
  const { editingPolygon, currentSelectedBuildingIndex } = useEditingMapState();

  const setEditingMap = useSetAtom(editingMapState);

  // フォームの「保存する」を押されたときの処理
  const storeRoomToDatabase = useCallback(
    (roomId: number, newRoomName: string) => {
      if (!editingPolygon || !rooms || !buildings) {
        window.alert('失敗しました');
        return;
      }

      const newRoom: SubmitRoom = {
        roomId: roomId,
        roomName: newRoomName,
        polygon: editingPolygon,
        buildingId: buildings[currentSelectedBuildingIndex].buildingId,
      };

      request(ENDPOINTS.updateroom, { method: 'PUT', body: newRoom })
        .then(() => {
          // 例 : {roomID: 3, room_name: '院生部', polygon: [[200,200],[300,300]], buildingID: 2}
          window.alert('成功しました');
        })
        .catch((err) => {
          console.error(err);
          window.alert('失敗しました');
        });
    },
    [editingPolygon, currentSelectedBuildingIndex, buildings, rooms],
  );

  const updateCurrentSelectedBuildingIndexByBuildingId = useCallback(
    (buildingId: number) => {
      if (!buildings) return;
      const selectedIndex = buildings.findIndex((building) => building.buildingId === buildingId);
      if (selectedIndex === -1) return;

      setEditingMap((prev) => ({
        ...prev,
        currentSelectedBuildingIndex: selectedIndex,
      }));
    },
    [buildings, setEditingMap],
  );

  const setCurrentSelectedBuildingIndex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!buildings) return;
    setEditingMap((prev) => ({
      ...prev,
      currentSelectedBuildingIndex: buildings.findIndex(
        (building) => building.buildingName === event.target.value,
      ),
    }));
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
