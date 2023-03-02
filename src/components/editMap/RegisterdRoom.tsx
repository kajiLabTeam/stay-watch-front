import { useState } from "react";
import { RoomEditorForm } from "@/components/editMap/RoomEditorForm";
import { DBRoom } from "@/types/roomFloormap";


export const RegisterdRoom = (props:{
    editingPolygon:number[][],
    editingRoomId: number,
    room: DBRoom,
    setEditingPolygon: React.Dispatch<React.SetStateAction<number[][]>>,
    setEditingRoomId: React.Dispatch<React.SetStateAction<number>>,
    setIsEditingRoom: React.Dispatch<React.SetStateAction<boolean>>,
    storeRoomToDatabase: (roomId: number, newRoomName: string) => void,
    updateMouseOutRoomColor: (roomID: number) => void,
    updateMouseOverRoomColor: (roomID: number) => void,
}) => {

  const [buttonText, setButtonText] = useState("編集");
  const handleClick = () => {
    if(buttonText == "編集"){  // 編集画面を開始
        props.setEditingRoomId(props.room.roomID);
        props.setIsEditingRoom(true);
        setButtonText("中止");
    }else if(buttonText == "中止"){    // 編集終了
        props.setEditingRoomId(-1);
        props.setIsEditingRoom(false);
        props.setEditingPolygon([[0,0],[0,0]]);
        setButtonText("編集");
    }
  }

  if(buttonText == "中止" && props.room.roomID != props.editingRoomId){
    setButtonText("編集");
  }

  const roomName = document.getElementById("RegisterdRoom-room-name-" + props.room.roomID);
  if(roomName){
    roomName.onmouseover = (e) => {
        props.updateMouseOverRoomColor(props.room.roomID);
    }
    roomName.onmouseout = (e) => {
        props.updateMouseOutRoomColor(props.room.roomID);
    }
  }

  if(props.room.roomID == props.editingRoomId){ // フォームを表示
    return (
        <div id={"RegisterdRoom-room-name-" + props.room.roomID} className="w-full border border-blue-500">
          <div className="flex">
            <div className="w-3/4">{props.room.room_name}</div>
            <button id={"form_edit_button" + props.room.roomID} className="w-1/4 text-center" onClick={handleClick}>{buttonText}</button>
          </div>
          
          <RoomEditorForm
            room={props.room}
            storeRoomToDatabase={props.storeRoomToDatabase}
            editingPolygon = {props.editingPolygon}
          />
        </div>
    );
  }else{    // フォームを非表示
    return(
        <div id={"RegisterdRoom-room-name-" + props.room.roomID} className="w-full border border-blue-500">
          <div className="flex">
            <div className="w-3/4">{props.room.room_name}</div>
            <button id={"form_edit_button" + props.room.roomID} className="w-1/4 text-center" onClick={handleClick}>{buttonText}</button>
          </div>
        </div>
    );
  }
};
