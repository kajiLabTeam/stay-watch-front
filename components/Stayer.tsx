import axios from "axios";
import { useState, useEffect } from "react";

type Stayer = {
  id: string;
  name: string;
  team: string;
  room: string;
  roomID: number;
};

const Stayer = () => {
  const [stayers, setStayers] = useState<Stayer[]>([]);

  useEffect(() => {
    axios
      .get("https://go-staywatch.kajilab.tk/room/v1/stayer")
      .then((res) => {
        setStayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="table-fixed">
      <div className="mt-6 text-4xl">滞在者一覧</div>
      <div className="my-4 border"></div>
      <table className="w-full text-2xl table-auto">
        <thead>
          <tr className="text-left text-white bg-gray-700">
            <th className="py-2 px-4 w-1/3 border">Name</th>
            <th className="py-2 px-4 border">Team</th>
            <th className="py-2 px-4 border">Room</th>
          </tr>
        </thead>
        <tbody className="">
          {stayers.map((stayer) => (
            <tr className="text-left" key={stayer.id}>
              <td className="py-2 px-4 border">{stayer.name}</td>
              <td className="py-2 px-4 border">{stayer.team}</td>
              <td className="py-2 px-4 border">{stayer.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stayer;
