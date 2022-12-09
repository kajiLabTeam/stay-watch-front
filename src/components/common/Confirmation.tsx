import React, { useState } from "react";

type Props = {
  //関数
  remove: () => void;
};

export const Confirmation = (props: Props) => {
  const [meetingID, setMeetingID] = useState(0);

  const register = async () => {
    props.remove();
    //     axios
    //       .post(`${baseURL}/user/v1/attendance`, {
    //         meetingID: meetingID,
    //       })
    //       .then(() => window.alert("成功しました"))
    //       .catch(() => window.alert("エラーが発生しました"));
  };

  return (
    <>
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-auto max-w-3xl">
            <div className="flex h-44 w-[500px] flex-col items-center justify-start gap-4 rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <select
                className="mt-6  rounded-md border-4 text-black"
                onChange={(event) => {
                  setMeetingID(Number(event.target.value));
                }}
              >
                <option hidden>選択してください</option>
                <option value="1">B3</option>
                <option value="2">全体</option>
              </select>

              <div className="ml-4 flex w-[250px] justify-start  gap-8 ">
                <button
                  className="rounded-md bg-slate-500 py-2 text-white "
                  onClick={props.remove}
                >
                  キャンセル
                </button>
                {meetingID! && (
                  <button
                    className="rounded-md  bg-blue-500 py-2 px-4 text-white"
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
