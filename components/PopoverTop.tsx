import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

const solutions = [
  {
    name: "toyama",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "ogane",
    description: "Measure actions your users take",
    href: "##",
  },
];

export default function PopoverTop() {
  return (
    <div className="max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-red-400 group    rounded-md inline-flex items-center  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>5人</span>
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
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid  bg-white p-7 lg:grid-cols-4 gap-2">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          {/* <p className="text-sm text-gray-500">
                            {item.description}
                          </p> */}
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
}
