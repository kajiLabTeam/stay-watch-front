type RoomOutline = {
  roomId: number;
  polygon: number[][];
  buildingId: number;
};

export type EditorRoom = RoomOutline & {
  roomName: string;
  communityName: string;
  buildingName: string;
};

export type FloorMapRoom = RoomOutline & {
  color: string;
};

export type SubmitRoom = RoomOutline & {
  roomName: string;
};

export type Building = {
  buildingId: number;
  buildingName: string;
  buildingImagePath: string;
};

export type PopoverRoom = {
  roomId: number;
  roomName: string;
  userNames: string[];
  left: number;
  top: number;
};

export type ViewerRoom = {
  roomId: number;
  roomName: string;
  userNames: string[];
  userCount: number;
  left: number;
  top: number;
};
