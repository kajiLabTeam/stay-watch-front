import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  roomID: number;
  userCount: number;
  usersName: string[];
  roomName: string;
};

const PopoverTop = (props: Props) => {
  return (
    <div className="max-w-sm ">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-red-400  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white `}
            >
              <span>{props.userCount}人</span>
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
              <Popover.Panel className="left-1/5 absolute z-10 mt-3 w-screen max-w-sm -translate-y-40 px-4 sm:px-0">
                <div className="bg-white shadow-lg">
                  <div>{props.roomName}</div>
                  <div className="relative grid  gap-2 bg-white p-7 lg:grid-cols-4 ">
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
