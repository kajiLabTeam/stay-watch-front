import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { route } from "next/dist/server/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";

const solutions = [
  {
    name: "admin",
    description: "管理画面",
    href: "/admin",
    img: "/admin.png",
    method: "",
  },
  {
    name: "changeName",
    description: "名前の変更",
    href: "/test",
    img: "/changeName.png",
    method: "",
  },
  {
    name: "logout",
    description: "ログアウト",
    href: "/",
    img: "/logout.png",
  },
];

const Admin = () => {
  return (
    <div className="top-16 left-60 px-4 mt-1 w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-white group inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75   h-8 border
                `}
            >
              <div>
                <div className="text-sm md:text-lg lg:text-2xl">メニュー</div>
              </div>
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
              <Popover.Panel className="absolute z-10  mt-3 w-28 max-w-sm ">
                <div className="overflow-hidden  rounded-lg ring-1 ring-black shadow-lg">
                  <div className="grid relative gap-4 pl-4 bg-white lg:grid-cols-1">
                    <div className="mt-2 text-sm font-medium  text-gray-900">
                      <div>管理画面</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 ">
                      名前の変更
                    </div>
                    <div className="text-sm font-medium text-gray-900 ">
                      ログアウト
                    </div>
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

export default Admin;
