import React, { useState } from 'react';
import { RoomEditorForm } from '@/features/admin/editFloorMap/RoomEditorForm';
import { Building, DBRoom } from '@/types/roomFloormap';

export const RegisterdRoom = (props: {
  editingPolygon: number[][];
  editingRoomId: number;
  room: DBRoom;
  building: Building;
  setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>;
  setEditingRoomId: React.Dispatch<React.SetStateAction<number>>;
  setIsEditingRoom: React.Dispatch<React.SetStateAction<boolean>>;
  storeRoomToDatabase: (roomId: number, newRoomName: string) => void;
  updateMouseOutRoomColor: (roomID: number) => void;
  updateMouseOverRoomColor: (roomID: number) => void;
  updateCurrentSelectedBuildingIndexByBuildingId: (buildingId: number) => void;
}) => {
  const [buttonText, setButtonText] = useState('編集');
  const handleClick = () => {
    if (buttonText === '編集') {
      // 編集画面を開始
      props.setEditingRoomId(props.room.roomID);
      props.setIsEditingRoom(true);
      props.updateCurrentSelectedBuildingIndexByBuildingId(props.room.buildingId);
      setButtonText('中止');
    } else if (buttonText === '中止') {
      // 編集終了
      props.setEditingRoomId(-1);
      props.setIsEditingRoom(false);
      props.setEditingPolygon([
        [0, 0],
        [0, 0],
      ]);
      setButtonText('編集');
    }
  };

  if (buttonText === '中止' && props.room.roomID !== props.editingRoomId) {
    setButtonText('編集');
  }

  if (props.room.roomID === props.editingRoomId) {
    // フォームを表示
    return (
      <div
        className='w-full border border-blue-500'
        onMouseOver={() => props.updateMouseOverRoomColor(props.room.roomID)}
        onMouseOut={() => props.updateMouseOutRoomColor(props.room.roomID)}
      >
        <div className='flex'>
          <div className='w-3/4'>{props.room.room_name}</div>
          <button
            id={'form_edit_button' + props.room.roomID}
            className='w-1/4 text-center'
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>

        <RoomEditorForm
          room={props.room}
          building={props.building}
          storeRoomToDatabase={props.storeRoomToDatabase}
          editingPolygon={props.editingPolygon}
        />
      </div>
    );
  }
  // フォームを非表示
  return (
    <div
      className='w-full border border-blue-500'
      onMouseOver={() => props.updateMouseOverRoomColor(props.room.roomID)}
      onMouseOut={() => props.updateMouseOutRoomColor(props.room.roomID)}
    >
      <div className='flex'>
        <div className='w-3/4'>{props.room.room_name}</div>
        <button
          id={'form_edit_button' + props.room.roomID}
          className='w-1/4 text-center'
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
