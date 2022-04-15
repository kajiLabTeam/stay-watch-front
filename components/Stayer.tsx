import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";

type Stayer = {
  id: string;
  name: string;
  team: string;
  room: string;
  roomID: number;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Stayer = () => {
  const { data, error } = useSWR<Stayer[]>(
    "https://go-staywatch.kajilab.tk/room/v1/stayer",
    fetcher
  ); // (1)

  if (data !== null) {
    // データがまだない場合は読み込み中のUIを表示する
    console.log(data);
  }

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="table-fixed">
      <div className="mt-6 text-4xl">滞在者一覧</div>
      <div className="my-4 border"></div>
      <table className="w-full text-2xl table-auto">
        <thead>
          <tr className="text-left text-white bg-gray-700">
            <th className="py-2 px-4 w-1/3 border">Name</th>
            <th className="py-2 px-4 border">Attribute</th>
            <th className="py-2 px-4 border">Room</th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((stayer) => (
            <tr className="text-left" key={stayer.id}>
              <td className="py-2 px-4 border">{stayer.name}</td>
              <td className="py-2 px-4 border flex gap-4">
                {stayer.tags.map((tag) => (
                  <div className="" key={tag.id}>
                    {tag.name}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border">{stayer.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stayer;
