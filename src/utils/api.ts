export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//エンドポイントのURLを定義
export const endpoints = {
  stayers: `${baseURL}/api/v1/stayers`,
  logs: `${baseURL}/api/v1/logs`,
  logsGantt: `${baseURL}/api/v1/logs/gantt`,
  check: `${baseURL}/api/v1/check`,
  users: `${baseURL}/api/v1/users`,
  attendance: `${baseURL}/api/v1/attendance`,
  extendedUsers: `${baseURL}/api/v1/users/extended`,
};


