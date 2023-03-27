import { Select } from '@mantine/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { BuildingSelector } from '@/features/admin/editFloorMap/BuildingSelector';
import { MapCanvas } from '@/features/admin/editFloorMap/MapCanvas';
import { RegisterdRooms } from '@/features/admin/editFloorMap/RegisterdRooms';
import { DBRoom, UpdaterRoom, Building } from '@/types/roomFloormap';
import { useUserRole } from '@/utils/Auth';
import { endpoints } from '@/utils/api';
import '@/hooks/selectUsersHook';

export const EditFloorMap = () => {
  const userRole = useUserRole();
  const { data: rooms } = useSWR<DBRoom[]>(`${endpoints.getRoomsEditorByCommunityID}`);
  const { data: buildings } = useSWR<Building[]>(`${endpoints.getBuildingsEditor}`);
  const [editingPolygon, setEditingPolygon] = useState([
    [0, 0],
    [1, 1],
  ]);
  const [editingRoomId, setEditingRoomId] = useState(0);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [currentSelectedBuildingIndex, setCurrentSelectedBuildingIndex] = useState(0);
  const [mapssdata, setMap] = useState([
    {
      roomID: -1,
      buildingId: -1,
      polygon: [
        [0, 0],
        [0, 0],
      ],
      color: 'rgba(0,255,0,0.3)',
    },
  ]);

  // rooms[1] <- この数字(1の部分)をroomID(46とか)から求める
  const getIndexByRoomId = (roomId: number) => {
    if (rooms) {
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].roomID == roomId) {
          return i;
        }
      }
    }
    return -1;
  };

  const updateCurrentSelectedBuildingIndexByBuildingId = (buildingId: number) => {
    if (buildings) {
      for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].buildingId == buildingId) {
          setCurrentSelectedBuildingIndex(i);
        }
      }
    }
  };

  const updateMouseOverRoomColor = (roomID: number) => {
    setMap((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomID === roomID) {
          // 更新する要素のみcolorプロパティを書き換えたオブジェクトを作成する
          return { ...room, color: 'rgba(' + [0, 0, 255, 0.7] + ')' };
        }
        // 更新しない要素はそのまま返す
        return room;
      });
    });
  };

  const updateMouseOutRoomColor = (roomID: number) => {
    setMap((prevState) => {
      // 該当する要素を更新した新しい配列を作成する
      return prevState.map((room) => {
        if (room.roomID === roomID) {
          return { ...room, color: 'rgba(' + [0, 255, 0, 0.3] + ')' };
        }
        return room;
      });
    });
  };

  const storeRoomToDatabase = (roomId: number, newRoomName: string) => {
    if (editingPolygon && rooms && buildings) {
      const index_number: number = getIndexByRoomId(roomId); // rooms[1] <- この数字(1の部分)をroomIDから求める

      let newRoom: UpdaterRoom = {
        roomID: -1,
        room_name: rooms[index_number].room_name,
        polygon: '',
        buildingID: -1,
      };

      newRoom = {
        roomID: roomId,
        room_name: newRoomName,
        polygon:
          editingPolygon[0][0] +
          ',' +
          editingPolygon[0][1] +
          '-' +
          editingPolygon[1][0] +
          ',' +
          editingPolygon[1][1],
        buildingID: buildings[currentSelectedBuildingIndex].buildingId,
      };

      axios
        .post(endpoints.updateroom, newRoom)
        .then(() => {
          // 例 : {roomID: 3, room_name: '院生部', polygon: '200,200-300,300', buildingID: 2}
          window.alert('成功しました');
        })
        .catch((err) => {
          console.log(err);
          window.alert('失敗しました');
        });
    } else {
      window.alert('失敗しました');
    }
  };

  useEffect(() => {
    // DBの内容、現在選択されている建物IDが変わった時に動作する
    if (rooms && buildings) {
      setMap([
        {
          roomID: -1,
          buildingId: -1,
          polygon: [
            [0, 0],
            [0, 0],
          ],
          color: 'rgba(0,255,0,0.3)',
        },
      ]);
      for (let i = 0; i < rooms.length; ++i) {
        // 部屋の建物IDと現在選択されている建物IDが同じ時その部屋の情報をmapssdataに加える
        if (rooms[i].buildingId == buildings[currentSelectedBuildingIndex].buildingId) {
          const arrayPolygon: number[][] = new Array();
          const tmpArrayPolygon: string[] = rooms[i].polygon.split('-'); // 例 "123,123-456,456" -> ["123,123"],["456,456"]
          for (let j = 0; j < tmpArrayPolygon.length; ++j) {
            const tmpPairPolygon = tmpArrayPolygon[j].split(','); // ["123,123"],["456,456"] -> ['123','123'],['456','456']
            const polygonPoint: number[] = [Number(tmpPairPolygon[0]), Number(tmpPairPolygon[1])]; // ['123','123'],['456','456']->[123,123],[456,456]
            arrayPolygon.push(polygonPoint);
          }
          setMap((mapssdata) => [
            ...mapssdata,
            {
              roomID: rooms[i].roomID,
              buildingId: rooms[i].buildingId,
              polygon: arrayPolygon,
              color: 'rgba(' + [0, 255, 0, 0.3] + ')',
            },
          ]);
        }
      }
    }
  }, [rooms, buildings, currentSelectedBuildingIndex]);

  if (userRole == null) {
    return <div />;
  }

  if (!rooms) return <div>loading...</div>;
  else if (!buildings) return <div>loading</div>;

  return (
    <div>
      <div className='flex'>
        <div className='w-3/4'>
          <BuildingSelector
            buildings={buildings}
            currentSelectedBuildingIndex={currentSelectedBuildingIndex}
            setCurrentSelectedBuildingIndex={setCurrentSelectedBuildingIndex}
          />
          <Select
            classNames={{
              input: 'w-64',
            }}
            data={[
              {
                label: '部屋',
                value: 'room',
              },
              {
                label: '建物',
                value: 'building',
              },
            ]}
          />
          <MapCanvas
            mapsdata={mapssdata}
            editingPolygon={editingPolygon}
            isEditingRoom={isEditingRoom}
            buildingImagePath={buildings[currentSelectedBuildingIndex].buildingImagePath}
            currentSelectedBuildingId={buildings[currentSelectedBuildingIndex].buildingId}
            setEditingPolygon={setEditingPolygon}
          />
        </div>

        <div className='mt-10 w-1/4 rounded-lg border border-red-500'>
          <RegisterdRooms
            rooms={rooms}
            buildings={buildings}
            storeRoomToDatabase={storeRoomToDatabase}
            updateMouseOverRoomColor={updateMouseOverRoomColor}
            updateMouseOutRoomColor={updateMouseOutRoomColor}
            updateCurrentSelectedBuildingIndexByBuildingId={
              updateCurrentSelectedBuildingIndexByBuildingId
            }
            editingPolygon={editingPolygon}
            editingRoomId={editingRoomId}
            currentSelectedBuildingIndex={currentSelectedBuildingIndex}
            setEditingRoomId={setEditingRoomId}
            setIsEditingRoom={setIsEditingRoom}
            setEditingPolygon={setEditingPolygon}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFloorMap;
