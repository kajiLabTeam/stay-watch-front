import React, { useState } from 'react';
import { RoomEditorForm } from './RoomEditorForm';
import { RoomHeaderRow } from './RoomHeaderRow';
import { useEditingMapMutators, useEditingMapState } from '@/atoms/editingMapAtom';
import { useMapsDataMutators } from '@/atoms/mapAtom';
import { Building, EditorRoom } from '@/types/roomFloormap';

export const RegisterdRoom = (props: { room: EditorRoom; building: Building }) => {
  const { roomId, buildingId, roomName, polygon } = props.room;
  const [buttonText, setButtonText] = useState('編集');

  const {
    updateCurrentSelectedBuildingIndexByBuildingId,
    setIsEditingRoom,
    setEditingPolygon,
    setEditingRoomId,
  } = useEditingMapMutators();

  const { updateMouseOutRoomColor, updateMouseOverRoomColor } = useMapsDataMutators();

  const { editingPolygon, editingRoomId } = useEditingMapState();

  const handleClick = () => {
    if (buttonText === '編集') {
      // 編集画面を開始(編集ボタンがクリックされたとき)
      setEditingRoomId(roomId);
      setIsEditingRoom(true);
      updateCurrentSelectedBuildingIndexByBuildingId(buildingId);
      setButtonText('中止');
      return;
    }
    if (buttonText === '中止') {
      // 編集終了(中止ボタンがクリックされたとき)
      setEditingRoomId(-1);
      setIsEditingRoom(false);
      setEditingPolygon(polygon);
      setButtonText('編集');
    }
  };

  if (buttonText === '中止' && roomId !== editingRoomId) {
    setButtonText('編集');
  }

  const isEditing = roomId === editingRoomId;

  return (
    <div
      className={`w-full border ${isEditing ? 'border-blue-500' : 'border-blue-400'}`}
      onMouseOver={() => updateMouseOverRoomColor(roomId)}
      onMouseOut={() => updateMouseOutRoomColor(roomId)}
    >
      <RoomHeaderRow
        roomId={roomId}
        roomName={roomName}
        buttonText={buttonText}
        onButtonClicked={handleClick}
      />
      {isEditing && (
        <RoomEditorForm
          room={props.room}
          building={props.building}
          editingPolygon={editingPolygon}
        />
      )}
    </div>
  );
};
