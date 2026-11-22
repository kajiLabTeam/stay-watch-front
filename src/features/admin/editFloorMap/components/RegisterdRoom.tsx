import React, { useState } from 'react';
import { RoomEditorForm } from '@/features/admin/editFloorMap/components/RoomEditorForm';
import {
  useEditingMapMutators,
  useEditingMapState,
} from '@/features/admin/editFloorMap/globalstate/editingMapState';
import { useMapsDataMutators } from '@/features/admin/editFloorMap/globalstate/mapState';
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
    } else if (buttonText === '中止') {
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

  if (roomId === editingRoomId) {
    // フォームを表示
    return (
      <div
        className='w-full border border-blue-500'
        onMouseOver={() => updateMouseOverRoomColor(roomId)}
        onMouseOut={() => updateMouseOutRoomColor(roomId)}
      >
        <div className='flex'>
          <div className='w-3/4'>{roomName}</div>
          <button
            id={`form_edit_button${roomId}`}
            className='w-1/4 text-center'
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>

        <RoomEditorForm
          room={props.room}
          building={props.building}
          editingPolygon={editingPolygon}
        />
      </div>
    );
  }
  // フォームを非表示
  return (
    <div
      className='w-full border border-blue-400'
      onMouseOver={() => updateMouseOverRoomColor(roomId)}
      onMouseOut={() => updateMouseOutRoomColor(roomId)}
    >
      <div className='flex'>
        <div className='w-3/4'>{roomName}</div>
        <button
          id={`form_edit_button${roomId}`}
          className='w-1/4 text-center'
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
