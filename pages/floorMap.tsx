import Layout from "../components/Layout";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { SizeMe } from "react-sizeme";
import PopoverTop from "../components/PopoverTop";
import axios from "axios";

type roomStatus = {
  roomID: number;
  userCount: number;
  usersName: string[];
};

type Stayer = {
  id: string;
  name: string;
  team: string;
  room: string;
  roomID: number;
};

const FloorMap = () => {
  const elm = useRef(null);

  const [roomsStatus, setRoomsStatus] = useState<roomStatus[]>([]);

  useEffect(() => {
    axios
      .get("https://go-staywatch.kajilab.tk/room/v1/stayer")
      .then((res) => {
        console.log(res.data);

        const roomCount = Math.max(
          ...res.data.map((stayer: Stayer) => stayer.roomID)
        );

        const roomsStatusArray: roomStatus[] = [];

        for (let i = 0; i <= roomCount; i++) {
          const usersName: string[] = [];
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].roomID === i + 1) {
              console.log("test");
              usersName.push(res.data[j].name);
            }
          }
          roomsStatusArray.push({
            roomID: i + 1,
            userCount: usersName.length,
            usersName: usersName,
          });
        }
        setRoomsStatus(roomsStatusArray);
        console.log(roomsStatusArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <SizeMe monitorHeight monitorWidth>
        {({ size }) => {
          console.log(size.width);

          if (size.height != null && size.width != null) {
            return (
              <div className="relative bg-slate-600 ">
                <Image
                  src={"/kajlab-room.jpg"}
                  alt="kajlab-room"
                  width="1600vmin"
                  height="900vmin"
                />
                {roomsStatus.map((roomStatus) => {
                  if (size.height != null && size.width != null) {
                    return (
                      <div
                        key={roomStatus.roomID}
                        className="absolute  text-red-400"
                        style={{
                          left: (size.width / 100) * 59.7,
                          top: ((size.height - 10) / 100) * 62.5,
                          fontSize: size.width / 80,
                        }}
                      >
                        <PopoverTop
                          key={roomStatus.roomID}
                          roomID={roomStatus.roomID}
                          userCount={2}
                          usersName={roomStatus.usersName}
                        />
                      </div>
                    );
                  }
                })}
                {/* <img src={"/kajlab-room.jpg"} alt="" /> */}
                <button onClick={() => console.log("hello")}>
                  <p
                    className="absolute text-red-400"
                    style={{
                      left: (size.width / 100) * 91.7,
                      top: ((size.height - 10) / 100) * 93,
                      fontSize: size.width / 80,
                    }}
                  >
                    5人
                  </p>
                </button>
                <p
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 85.5,
                    top: ((size.height - 10) / 100) * 93,
                    fontSize: size.width / 80,
                  }}
                >
                  5人
                </p>
                <p
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 35.5,
                    top: ((size.height - 10) / 100) * 62.5,
                    fontSize: size.width / 80,
                  }}
                >
                  5人
                </p>

                <div
                  className="absolute  text-red-400"
                  style={{
                    left: (size.width / 100) * 59.7,
                    top: ((size.height - 10) / 100) * 62.5,
                    fontSize: size.width / 80,
                  }}
                >
                  {/* <PopoverTop></PopoverTop> */}
                </div>
              </div>
            );
          }

          return <div>loading</div>;
        }}
      </SizeMe>
    </Layout>
  );
};

export default FloorMap;
