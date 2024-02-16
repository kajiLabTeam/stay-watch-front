// import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pagesPath } from '@/utils/$path';
// import { baseURL } from "@/utils/api";

type Item = {
  stayer: string;
  roomHistory: string;
  userInformation: string;
  floorMap: string;
  SimulataneousStay: string;
};

export const useBgColor = (): Item => {
  const router = useRouter();
  const { pathname } = router;
  const [bgColors, setBgColors] = useState<Item>({
    stayer: '',
    roomHistory: '',
    userInformation: '',
    floorMap: '',
    SimulataneousStay: '',
  });

  useEffect(() => {
    if (pathname === pagesPath.$url().pathname) {
      setBgColors({
        stayer: 'bg-staywatch-button',
        roomHistory: '',
        userInformation: '',
        floorMap: '',
        SimulataneousStay: '',
      });
    } else if (pathname === pagesPath.roomHistory.$url().pathname) {
      setBgColors({
        stayer: '',
        roomHistory: 'bg-staywatch-button',
        userInformation: '',
        floorMap: '',
        SimulataneousStay: '',
      });
    } else if (pathname === pagesPath.userInformation.$url().pathname) {
      setBgColors({
        stayer: '',
        roomHistory: '',
        userInformation: 'bg-staywatch-button',
        floorMap: '',
        SimulataneousStay: '',
      });
    } else if (pathname === pagesPath.floorMap.$url().pathname) {
      setBgColors({
        stayer: '',
        roomHistory: '',
        userInformation: '',
        floorMap: 'bg-staywatch-button',
        SimulataneousStay: '',
      });
    } else if (pathname === pagesPath.simulataneousStay.$url().pathname) {
      setBgColors({
        stayer: '',
        roomHistory: '',
        userInformation: '',
        floorMap: '',
        SimulataneousStay: 'bg-staywatch-button',
      });
    }
  }, [pathname]);

  return bgColors;
};

// const attendanceRegister = (callback: () => void) => {
//   axios
//     .post(`${baseURL}/user/v1/attendance`, {
//       meetingID: meetingID,
//     })
//     .then(() => window.alert("成功しました"))
//     .catch(() => window.alert("エラーが発生しました"));
// };
