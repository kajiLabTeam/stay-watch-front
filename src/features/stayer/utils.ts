import { StayersRoomTableType, StayerTableType } from './type';
import { EditorRoom } from '@/types/roomFloormap';
import StayerType from '@/types/stayer';

export const formatStayerDataForTable = (stayers: StayerType[], rooms: EditorRoom[]) => {
  let stayersRoomForTable: StayersRoomTableType[] = [];
  rooms.map((room) => {
    let stayersForTable: StayerTableType[] = [];
    stayers.map((stayer) => {
      if (stayer.roomId === room.roomId) {
        stayersForTable.push({
          name: stayer.name,
          tags: stayer.tags,
        });
      }
    });
    if (stayersForTable.length !== 0) {
      stayersRoomForTable.push({
        room: room.roomName,
        stayers: stayersForTable,
      });
    }
  });
  return stayersRoomForTable;
};
