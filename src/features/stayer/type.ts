import { Tag } from '@/types/tag';

export type StayersRoomTableType = {
  room: string;
  stayers: StayerTableType[];
};

export type StayerTableType = {
  name: string;
  tags: Tag[];
};
