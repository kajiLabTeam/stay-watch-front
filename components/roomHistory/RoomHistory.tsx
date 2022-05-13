import useSWR from "swr";
import Log from "models/log";
import { baseURL } from "utils/api";

const RoomHistory = () => {
  const { data: logs, error } = useSWR<Log[]>(`${baseURL}/room/v1/log`);

  if (error)
    return (
      <div className="flex flex-col table-fixed">
        <div className="mt-6 text-4xl">滞在者履歴</div>
        <div className="my-4 border" />
        <table className="w-full text-2xl table-auto">
          <thead>
            <tr className="text-left text-white bg-gray-700">
              <th className="py-2 px-4 w-1/5 border">Date</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Team</th>
              <th className="py-2 px-4 border">Period</th>
              <th className="py-2 px-4 border">Room</th>
            </tr>
          </thead>
          <tbody className="" />
        </table>
      </div>
    );
  if (!logs) return <div>loading...</div>;

  return (
    <div className="flex flex-col table-fixed">
      <div className="mt-6 text-4xl">滞在者履歴</div>
      <div className="my-4 border" />
      <table className="w-full text-2xl table-auto">
        <thead>
          <tr className="text-left text-white bg-gray-700">
            <th className="py-2 px-4 w-1/5 border">Date</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Team</th>
            <th className="py-2 px-4 border">Period</th>
            <th className="py-2 px-4 border">Room</th>
          </tr>
        </thead>
        <tbody className="">
          {[...logs].reverse().map((log) => (
            <tr className="text-left" key={log.id}>
              <td className="py-2 px-4 border">
                {log.startAt.substring(0, 10)}
              </td>
              <td className="py-2 px-4 border">{log.name}</td>
              <td className="py-2 px-4 border">{log.team}</td>
              <td className="py-2 px-4 border">
                {log.startAt}~{log.endAt}
              </td>
              <td className="py-2 px-4 border">{log.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomHistory;
