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

type RoomInformation = {
  roomID: number;
  roomName: string;
  top: number;
  left: number;
};

const FloorMap = () => {
  const elm = useRef(null);

  const [roomsStatus, setRoomsStatus] = useState<roomStatus[]>([]);
  const [roomInformation, setRoomInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: "", top: 0, left: 0 },
  ]);

  useEffect(() => {
    axios
      .get("https://go-staywatch.kajilab.tk/room/v1/stayer")
      .then((res) => {
        const roomCount = 5;

        const roomsStatusArray: roomStatus[] = [];

        for (let i = 0; i < roomCount; i++) {
          const usersName: string[] = [];
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].roomID === i + 1) {
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

    axios
      .get("/room.json")
      .then((res) => {
        console.log(res.data);
        setRoomInformation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <SizeMe monitorHeight monitorWidth>
        {({ size }) => {
          if (size.height != null && size.width != null) {
            return (
              <div className="relative  ">
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
                          left:
                            (size.width / 100) *
                            (roomInformation[roomStatus.roomID - 1] != undefined
                              ? roomInformation[roomStatus.roomID - 1].left
                              : 0),
                          top:
                            ((size.height - 10) / 100) *
                            (roomInformation[roomStatus.roomID - 1] != undefined
                              ? roomInformation[roomStatus.roomID - 1].top
                              : 0),
                          fontSize: size.width / 80,
                        }}
                      >
                        <PopoverTop
                          key={roomStatus.roomID}
                          roomID={roomStatus.roomID}
                          userCount={roomStatus.userCount}
                          usersName={roomStatus.usersName}
                          roomName={
                            roomInformation[roomStatus.roomID - 1].roomName !=
                            undefined
                              ? roomInformation[roomStatus.roomID - 1].roomName
                              : ""
                          }
                        />
                      </div>
                    );
                  }
                })}
                {/* <img src={"/kajlab-room.jpg"} alt="" /> */}
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
