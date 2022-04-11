import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

type Log = {
  id: string;
  name: string;
  team: string;
  startAt: string;
  endAt: string;
  room: string;
};

const RoomHistory = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const reverseLogs = [...logs].reverse();

  useEffect(() => {
    axios
      .get("https://go-staywatch.kajilab.tk/room/v1/log")
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="table-fixed flex flex-col">
        <div className="mt-6 text-4xl">滞在者一覧</div>
        <div className="my-4 border"></div>
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
            {reverseLogs.map((log) => (
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
    </Layout>
  );
};
export default RoomHistory;
