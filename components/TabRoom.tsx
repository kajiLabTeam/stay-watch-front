import { Tab } from "@headlessui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Room } from "../models/simulataneousStayLog";
const GanttChart = dynamic(() => import("./GanttChart"), {
  ssr: false,
});
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  rooms: Room[];
};

const TabRoom = (props: Props) => {
  return (
    <div className="pt-8  max-w-md sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {props.rooms.map((room) => {
            return (
              <Tab
                key={room.id}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {room.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className=" w-[1240px] ">
          {props.rooms.map((room) => (
            <Tab.Panel key={room.id}>
              <GanttChart stayTimes={room.stayTimes} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabRoom;
