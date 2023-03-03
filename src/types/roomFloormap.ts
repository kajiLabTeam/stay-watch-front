
export type RoomFloorMap = {
    id: number;
    name: string;
    polygon: string;
  };

export type DBRoom = {
  roomID: number;
  room_name: string;
  community_name: string;
  building_name: string;
  polygon: string;
} 

export type Building = {
  buildingId: number;
  buildingName: string;
  buildingImagePath: string;
}

export type Room = {
  roomID: number;
  room_name: string;
  community_name: string;
  building_name: string;
  polygon: number[][];
}

export type EditorFloorMap = {
  roomID: number;
  polygon: number[][];
  color: string;
}

export type UpdaterRoom = {
  roomID: number;
  room_name: string;
  polygon: string;
  buildingID: number;
}