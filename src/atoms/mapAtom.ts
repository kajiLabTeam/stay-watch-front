import { useMemo } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEditingMapState } from '@/atoms/editingMapAtom';
import { useCommunityState } from '@/atoms/communityAtom';
import { useGetAPI } from '@/hooks/useGetAPI';
import { EditorRoom, Building, FloorMapRoom } from '@/types/roomFloormap';
import { ENDPOINTS } from '@/utils/endpoint';

const DEFAULT_ROOM_COLOR = 'rgba(0,255,0,0.3)';
const HOVERED_ROOM_COLOR = 'rgba(0,0,255,0.7)';

// マウスが乗っている部屋のID(なければ null)
const hoveredRoomIdState = atom<number | null>(null);

// マップデータ描画するのに必要なオブジェクト
// DBの内容・選択中の建物・ホバー中の部屋から導出する
export const useMapsDataState = (): FloorMapRoom[] => {
  const community = useCommunityState();
  const { data: rooms } = useGetAPI<EditorRoom[]>(
    `${ENDPOINTS.getRoomsEditorByCommunityID}/${community.communityId}`,
  );
  const { data: buildings } = useGetAPI<Building[]>(ENDPOINTS.getBuildingsEditor);
  const { currentSelectedBuildingIndex } = useEditingMapState();
  const hoveredRoomId = useAtomValue(hoveredRoomIdState);

  return useMemo(() => {
    const selectedBuildingId = buildings?.[currentSelectedBuildingIndex]?.buildingId;
    if (!rooms || selectedBuildingId === undefined) return [];

    return rooms
      .filter((room) => room.buildingId === selectedBuildingId)
      .map((room) => ({
        roomId: room.roomId,
        buildingId: room.buildingId,
        polygon: room.polygon,
        color: room.roomId === hoveredRoomId ? HOVERED_ROOM_COLOR : DEFAULT_ROOM_COLOR,
      }));
  }, [rooms, buildings, currentSelectedBuildingIndex, hoveredRoomId]);
};

export const useMapsDataMutators = () => {
  const setHoveredRoomId = useSetAtom(hoveredRoomIdState);

  const updateMouseOverRoomColor = (roomId: number): void => {
    setHoveredRoomId(roomId);
  };

  const updateMouseOutRoomColor = (roomId: number): void => {
    // 別の部屋にすでに乗り換えている場合は上書きしない
    setHoveredRoomId((prev) => (prev === roomId ? null : prev));
  };

  return { updateMouseOverRoomColor, updateMouseOutRoomColor };
};
