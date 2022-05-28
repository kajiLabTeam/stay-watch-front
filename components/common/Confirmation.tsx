import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { baseURL } from "utils/api";

type Props = {
  //関数
  remove: () => void;
};

export const Confirmation = (props: Props) => {
  const [showModal, setShowModal] = useState(true);

  const register = () => {
    setShowModal(false);
    axios
      .post(`${baseURL}/user/v1/attendance`)
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              <div className="flex flex-col justify-center items-center w-[500px] h-32 bg-white rounded-lg border-0 outline-none focus:outline-none shadow-lg">
                <div className="flex gap-8 justify-center w-[500px] ">
                  <button
                    className="py-2  text-white bg-slate-500 rounded-md "
                    onClick={props.remove}
                  >
                    キャンセル
                  </button>
                  <button
                    className="py-2  px-4 text-white bg-blue-500 rounded-md"
                    onClick={props.remove}
                  >
                    登録
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      ) : null}
    </>
  );
};
