import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { Fragment, useEffect, useRef, useState } from "react";
import { Confirmation } from "./Confirmation";

export default function Option() {
  const [showModal, setShowModal] = useState(false);

  

  const remove = () => {
    setShowModal(false);
  };

  return (
    <div className="top-16 w-56 text-right">
      <Menu as="div" className="inline-block relative text-left">
        <div>
          <Menu.Button className="inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-white bg-black bg-opacity-20 hover:bg-opacity-30 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Menu
            <ChevronDownIcon
              className="-mr-1 ml-2 w-5 h-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right">
            <div className="p-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setShowModal(true)}
                  >
                    出欠登録
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    管理者
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {showModal && <Confirmation remove={remove} />}
    </div>
  );
}
