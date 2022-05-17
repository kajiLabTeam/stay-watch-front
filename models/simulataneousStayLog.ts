type SimulataneousStayLog = {
  id: number;
  date: string;
  rooms: Room[];
};

export type Room = {
  id: number;
  name: string;
  stayTimes: StayTime[];
};

export type StayTime = {
  id: number;
  userName: string;
  startAt: number;
  endAt: number;
  color: string;
};

export type ChartData = {
  name: string;
  color: string;
  start: number;
  end: number;
};

export default SimulataneousStayLog;
