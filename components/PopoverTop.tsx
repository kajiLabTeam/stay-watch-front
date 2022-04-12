import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

type Props = {
  roomID: number;
  userCount: number;
  usersName: string[];
  roomName: string;
};

const PopoverTop = (props: Props) => {
  return (
    <div className="max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-red-400 group rounded-md inline-flex items-center  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>{props.userCount}人</span>
              {/* <ChevronUpIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              /> */}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-y-40 left-1/5 sm:px-0">
                <div className="shadow-lg bg-white">
                  <div>{props.roomName}</div>
                  <div className="relative grid  bg-white p-7 lg:grid-cols-4 gap-2 ">
                    {props.usersName.map((item, index) => (
                      <div className="ml-4" key={index}>
                        <p className="text-sm font-medium text-gray-900">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopoverTop;
