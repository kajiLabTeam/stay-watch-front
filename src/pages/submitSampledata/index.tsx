import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { MapCanvas } from "@/components/editMap/MapCanvas";
import { RegisterdRooms } from "@/components/editMap/RegisterdRooms";
import { useUserRole } from "@/utils/Auth";
import { endpoints } from "@/utils/api";
import "@/hooks/selectUsersHook";
// eslint-disable-next-line import/order
import { DBRoom, UpdaterRoom } from "@/types/roomFloormap";




export const SubmitRoom = () => {
  const userRole = useUserRole();
  const { data: rooms, error } = useSWR<DBRoom[]>(`${endpoints.getRoomsByCommunityID}`);
  const [editingPolygon, setEditingPolygon] = useState([[0,0],[1,1]]);
  const [editingRoomId, setEditingRoomId] = useState(0);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [mapssdata, setMap] = useState([
    {roomID:-1, polygon:[[0,0],[0,0]], color:"rgba(0,255,0,0.3)"} // 2153,736-2403,873
  ]);
  

  // rooms[1] <- この数字(1の部分)をroomID(46とか)から求める
  const getIndexByRoomId = (roomId:number) => {
    if(rooms){
      for (let i = 0; i < rooms.length; i++) {
        if(rooms[i].roomID == roomId){
          return i;
        }
      }
    }
    return -1;
  }

  const updateMouseOverRoomColor = (roomID:number) => {
    setMap(prevState => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map(room => {
        if (room.roomID === roomID) {
          // 更新する要素のみcolorプロパティを書き換えたオブジェクトを作成する
          return { ...room, color: "rgba(" + [0, 0, 255, 0.7] + ")" };
        } else {
          // 更新しない要素はそのまま返す
          return room;
        }
      });
    });
  }

  const updateMouseOutRoomColor = (roomID:number) => {
    setMap(prevState => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map(room => {
        if (room.roomID === roomID) {
          return { ...room, color: "rgba(" + [0, 255, 0, 0.3] + ")" };
        } else {
          return room;
        }
      });
    });
  }

  const storeRoomToDatabase = (roomId:number, newRoomName:string) => {
    if(editingPolygon && rooms){
      const index_number : number = getIndexByRoomId(roomId); // rooms[1] <- この数字(1の部分)をroomIDから求める

      var newRoom: UpdaterRoom = {
        roomID : -1,
        room_name: rooms[index_number].room_name,
        polygon : "",
        buildingID: -1
      }
      
      newRoom = {
        roomID : roomId,
        room_name : newRoomName,
        polygon : editingPolygon[0][0] + "," + editingPolygon[0][1] + "-" + editingPolygon[1][0] + "," + editingPolygon[1][1],
        buildingID: 2
      }

      axios.post(endpoints.updateroom, newRoom)
        .then((res) => {
          // 例 : {roomID: 3, room_name: '院生部', polygon: '200,200-300,300', buildingID: 2}
          window.alert("成功しました");
        })
        .catch((err) => {
          window.alert("失敗しました");
        })
    }
  }

  useEffect(()=>{   // DBの内容が変わった時に動作する
    if(rooms){
      setMap([{roomID:-1, polygon:[[0,0],[0,0]], color:"rgba(0,255,0,0.3)"}]);
      for (let i = 0; i < rooms.length; ++i) {
        const arrayPolygon:number[][] = new Array();
        const tmpArrayPolygon:string[] = rooms[i].polygon.split("-"); // 例 "123,123-456,456" -> ["123,123"],["456,456"]
        for (let j = 0; j < tmpArrayPolygon.length; ++j){
          const tmpPairPolygon = tmpArrayPolygon[j].split(",");     // ["123,123"],["456,456"] -> ['123','123'],['456','456']
          const polygonPoint:number[] = [Number(tmpPairPolygon[0]), Number(tmpPairPolygon[1])] // ['123','123'],['456','456']->[123,123],[456,456]
          arrayPolygon.push(polygonPoint);
        }
        setMap((mapssdata) => [...mapssdata, { roomID:rooms[i].roomID, polygon:arrayPolygon, color:"rgba(" + [0, 255, 0, 0.3] + ")" }]);
      }
    }
  },[rooms])

  if (userRole == null) {
    return <div />;
  }
  if(endpoints.users == "aa"){
    return <div />;
  }
  if (!rooms) return <div>loading...</div>;

  return (
    <div>
      <div className="flex">
        <div className="w-3/4 bg-red-200">
          <MapCanvas
            mapsdata={mapssdata}
            editingPolygon = {editingPolygon}
            isEditingRoom = {isEditingRoom}
            setEditingPolygon = {setEditingPolygon}
          />
        </div>

        <div className="mt-10 w-1/4 rounded-lg border border-red-500">
          <RegisterdRooms
            rooms={rooms}
            storeRoomToDatabase={storeRoomToDatabase}
            updateMouseOverRoomColor={updateMouseOverRoomColor}
            updateMouseOutRoomColor={updateMouseOutRoomColor}
            editingPolygon = {editingPolygon}
            editingRoomId = {editingRoomId}
            setEditingRoomId = { setEditingRoomId }
            setIsEditingRoom = {setIsEditingRoom}
            setEditingPolygon = {setEditingPolygon}
          />
        </div>
      </div>
    </div>
  );
};


export default SubmitRoom;
