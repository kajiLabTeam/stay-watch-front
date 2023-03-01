
export type RoomFloorMap = {
    id: number;
    name: string;
    polygon: string;
  };

export type Room = {
  roomID: number;
  room_name: string;
  community_name: string;
  building_name: string;
  polygon: string;
} 

export type EditorFloorMap = {
  roomID: number;
  polygon: string;
  color: string;
}

export type UpdaterRoom = {
  roomID: number;
  room_name: string;
  polygon: string;
  buildingID: number;
}