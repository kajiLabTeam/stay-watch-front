import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { PaginationButton } from "./PaginationButton";
import RoomTabDate from "./RoomTabDate";
import { useCurrentPage } from "./roomHistoryhook";
import Log from "@/models/log";
import { baseURL } from "@/utils/api";

const RoomHistory = () => {
  const [page, PreviousPage, NextPage] = useCurrentPage();
  const { data: logs, error } = useSWR<Log[]>(
    `${baseURL}/room/v1/log?page=${page}`
  );
  const [isGantt, setIsGantt] = useState(false);

  if (error)
    return (
      <div className="table-fixed">
        <div className="mt-6 text-4xl">滞在者履歴</div>
        <div className="my-4 border" />
      </div>
    );
  if (!logs) return <div>loading...</div>;

  const nextButton = () => {
    //最後のデータだった時
    if (logs.slice(-1)[0].id == 1) {
      return <div />;
    }
    return <PaginationButton name="次へ" onClick={NextPage} />;
  };

  const prevButton = () => {
    //pageが1より大きい時にボタンを表示
    if (page > 1) {
      return <PaginationButton name="前へ" onClick={PreviousPage} />;
    }
    return <div />;
  };

  const Period = () => {
    return [...logs].map((log) => {
      if (log.endAt === "2016-01-01 00:00:00") {
        //退出してない場合
        return (
          <tr className="text-left" key={log.id}>
            <td className="py-2 border md:px-4 ">
              {log.startAt.substring(0, 10)}
            </td>
            <td className="py-2 px-4 border">{log.name}</td>
            <td className="py-2 px-4 border">
              {log.startAt.substring(10, log.startAt.length - 3)} ~
            </td>
            <td className="py-2 px-4 border">{log.room}</td>
          </tr>
        );
      } else {
        return (
          <tr className="text-left" key={log.id}>
            <td className="py-2 border md:px-4">
              {log.startAt.substring(0, 10)}
            </td>
            <td className="py-2 px-4 border">{log.name}</td>
            <td className="py-2 px-4 border">
              {log.startAt.substring(10, log.startAt.length - 3)} ~
              {log.endAt.substring(10, log.endAt.length - 3)}
            </td>
            <td className="py-2 px-4 border">{log.room}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mt-6 text-2xl md:text-3xl">
        <div>滞在者履歴</div>
        <div>
          <button
            onClick={() => {
              setIsGantt(!isGantt);
            }}
          >
            {isGantt ? (
              <Image
                src="/ganttAnother.png"
                alt="stayer"
                width={27}
                height={27}
              />
            ) : (
              <Image src="/gantt.png" alt="stayer" width={27} height={27} />
            )}
          </button>
        </div>
      </div>
      {isGantt ? (
        <div>
          <div className="my-4 border" />
          <RoomTabDate />
        </div>
      ) : (
        <div className="table-auto">
          <div className="my-4 border" />
          <table className="w-full text-xs table-auto sm:text-base md:text-2xl">
            <thead>
              <tr className="text-left text-white bg-gray-700">
                <th className="py-2 px-4 w-1/5  border">Date</th>
                <th className=" px-4  border">Name</th>
                <th className=" px-4 border">Period</th>
                <th className=" px-4 border">Room</th>
              </tr>
            </thead>
            <tbody className="">{Period()}</tbody>
          </table>
          <div className="flex justify-between px-8 mt-2 w-full h-10 text-white md:mt-4 ">
            {prevButton()}
            {nextButton()}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomHistory;
