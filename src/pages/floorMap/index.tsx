import axios from "axios";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { SizeMe } from "react-sizeme";
import PopoverTop from "@/components/roomHistory/PopoverTop";
import RoomInformation from "@/types/roomInformation";
import RoomStatus from "@/types/roomStatus";
import { baseURL } from "@/utils/api";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const obj = res.json();
};

const FloorMapIndex = () => {
  const elm = useRef(null);

  const [roomsStatus, setRoomsStatus] = useState<RoomStatus[]>([]);
  const [roomInformation, setRoomInformation] = useState<RoomInformation[]>([
    { roomID: 1, roomName: "", top: 0, left: 0 },
  ]);

  useEffect(() => {
    axios
      .get(`${baseURL}/room/v1/stayer`)
      .then((res) => {
        const roomCount = 5;
        const roomsStatusArray: RoomStatus[] = [];

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
      })
      .catch((err) => {});

    axios
      .get("/room.json")
      .then((res) => {
        setRoomInformation(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <SizeMe monitorHeight monitorWidth>
      {({ size }) => {
        if (size.height != null && size.width != null) {
          return (
            <div className="relative mt-14">
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
                        fontSize: size.width / 65,
                      }}
                    >
                      <PopoverTop
                        key={roomStatus.roomID}
                        roomID={roomStatus.roomID}
                        userCount={roomStatus.userCount}
                        usersName={roomStatus.usersName}
                        roomName={
                          roomInformation[roomStatus.roomID - 1] != undefined
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
  );
};

export default FloorMapIndex;
