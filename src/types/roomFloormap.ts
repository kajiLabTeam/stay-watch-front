type Hoge = {
  hoge: string;
};

export type Sample = Hoge & {
  roomId: number;
};

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
