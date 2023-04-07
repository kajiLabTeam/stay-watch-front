type Hoge = {
  hoge: string;
};

export type Sample = Hoge & {
  roomId: number;
};

export type EditorRoom = {
  roomId: number;
  roomName: string;
  communityName: string;
  buildingName: string;
  polygon: number[][];
  buildingId: number;
};

export type FloorMapRoom = {
  roomId: number;
  buildingId: number;
  polygon: number[][];
  color: string;
};

export type SubmitRoom = {
  roomId: number;
  roomName: string;
  polygon: number[][];
  buildingId: number;
};

export type Building = {
  buildingId: number;
  buildingName: string;
  buildingImagePath: string;
};
