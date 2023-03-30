export type RoomFloorMap = {
  id: number;
  name: string;
  polygon: string;
};

export type DBRoom = {
  roomId: number;
  roomName: string;
  communityName: string;
  buildingName: string;
  polygon: string;
  buildingId: number;
};

export type Building = {
  buildingId: number;
  buildingName: string;
  buildingImagePath: string;
};

export type Room = {
  roomId: number;
  roomName: string;
  communityName: string;
  buildingName: string;
  polygon: number[][];
};

export type EditorFloorMap = {
  roomId: number;
  buildingId: number;
  polygon: number[][];
  color: string;
};

export type UpdaterRoom = {
  roomId: number;
  roomName: string;
  polygon: string;
  buildingId: number;
};
