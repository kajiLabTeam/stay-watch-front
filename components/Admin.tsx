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
                <div>管理者用メニュー</div>
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
              <Popover.Panel className="absolute z-10 px-4 mt-3 w-44 max-w-sm -translate-x-1/2 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden mr-2 rounded-lg ring-1 ring-black shadow-lg">
                  <div className="grid relative gap-2 pl-4 bg-white lg:grid-cols-1">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-2 -m-3 hover:bg-gray-50 rounded-lg focus:outline-none focus-visible:ring transition duration-150 ease-in-out"
                      >
                        <div className="flex shrink-0 justify-center items-center w-10 h-10 text-white sm:w-12 sm:h-12">
                          <div>konni</div>
                        </div>
                        <div className="ml-2">
                          {item.name === "logout" ? (
                            <button>
                              <p className="text-sm font-medium text-gray-900">
                                {item.description}
                              </p>
                            </button>
                          ) : (
                            <button>
                              <p className="text-sm font-medium text-gray-900">
                                {item.description}
                              </p>
                            </button>
                          )}
                        </div>
                      </a>
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

export default Admin;
