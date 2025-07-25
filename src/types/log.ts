export type Log = {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  room: string;
};

export type LogsListResponse = {
  logs?: Log[];
  count: number;
};
