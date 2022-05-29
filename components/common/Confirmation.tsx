import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { baseURL } from "utils/api";

type Props = {
  //関数
  remove: () => void;
};

export const Confirmation = (props: Props) => {
  const [meetingID, setMeetingID] = useState("");

  console.log(meetingID);

  const register = async () => {
    props.remove();
    axios
      .post(`${baseURL}/user/v1/attendance`, {
        meetingID: meetingID,
      })
      .then(() => window.alert("成功しました"))
      .catch(() => window.alert("エラーが発生しました"));
  };

  return (
    <>
      <>
        <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-auto max-w-3xl">
            <div className="flex flex-col gap-4 justify-start items-center w-[500px] h-44 bg-white rounded-lg border-0 outline-none focus:outline-none shadow-lg">
              <select
                className="mt-6  text-black rounded-md border-4"
                onChange={(event) => {
                  setMeetingID(event.target.value);
                }}
              >
                <option hidden>選択してください</option>
                <option value="1">B3</option>
                <option value="2">全体</option>
              </select>

              <div className="flex gap-8 justify-start ml-4  w-[250px] ">
                <button
                  className="py-2 text-white bg-slate-500 rounded-md "
                  onClick={props.remove}
                >
                  キャンセル
                </button>
                {meetingID! && (
                  <button
                    className="py-2  px-4 text-white bg-blue-500 rounded-md"
                    onClick={register}
                  >
                    登録
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25" />
      </>
    </>
  );
};
