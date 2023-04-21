export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//エンドポイントのURLを定義
export const endpoints = {
  stayers: `${baseURL}/api/v1/stayers`,
  logs: `${baseURL}/api/v1/logs`,
  logsGantt: `${baseURL}/api/v1/logs/gantt`,
  check: `${baseURL}/api/v1/check`,
  users: `${baseURL}/api/v1/users/2`,
  users2: `${baseURL}/api/v1/users`,
  attendance: `${baseURL}/api/v1/attendance`,
  updateroom: `${baseURL}/api/v1/rooms`,
  getRoomsEditorByCommunityID: `${baseURL}/api/v1/rooms/2`,
  getBuildingsEditor: `${baseURL}/api/v1/buildings/editor`,
  extendedUsers: `${baseURL}/api/v1/users/extended`,
  beacons: `${baseURL}/api/v1/beacons`,
  tags: `${baseURL}/api/v1/tags`
};
