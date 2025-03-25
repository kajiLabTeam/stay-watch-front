type Log = {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  room: string;
};

type LogsListResponse = {
  logs?: Log[];
  count: number;
};

// export default Log;
export default LogsListResponse;
