import useSWR from "swr";
import Layout from "../../components/common/Layout";
import RoomHistory from "../../components/roomHistory/RoomHistory";
import Log from "../../models/log";
import { baseURL } from "../../utils/api";

const RoomHistoryIndex = () => {
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
    <Layout>
      <RoomHistory />
    </Layout>
  );
};
export default RoomHistoryIndex;
