// import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pagesPath } from '@/utils/$path';
// import { baseURL } from "@/utils/api";

type UseHeaderButtonColorReturn = {
  bgColors: Item;
  textColors: Item;
};

type Item = {
  stayer: string;
  roomHistory: string;
  userInformation: string;
  floorMap: string;
  SimulataneousStay: string;
};

export const useHeaderButtonColor = (): UseHeaderButtonColorReturn => {
  const router = useRouter();
  const { pathname } = router;
  const selectedButtonTextColor = 'text-white';
  const unselectedButtonTextColor = 'text-staywatch-orange';
  const selectedButtonBgColor = 'bg-staywatch-orange';
  const unselectedButtonBgColor = '';
  const [buttonColors, setButtonColors] = useState<UseHeaderButtonColorReturn>({
    bgColors: {
      stayer: '',
      roomHistory: '',
      userInformation: '',
      floorMap: '',
      SimulataneousStay: '',
    },
    textColors: {
      stayer: unselectedButtonTextColor,
      roomHistory: unselectedButtonTextColor,
      userInformation: unselectedButtonTextColor,
      floorMap: unselectedButtonTextColor,
      SimulataneousStay: unselectedButtonTextColor,
    },
  });

  useEffect(() => {
    if (pathname === pagesPath.$url().pathname) {
      setButtonColors({
        bgColors: {
          stayer: selectedButtonBgColor,
          roomHistory: unselectedButtonBgColor,
          userInformation: unselectedButtonBgColor,
          floorMap: unselectedButtonBgColor,
          SimulataneousStay: unselectedButtonBgColor,
        },
        textColors: {
          stayer: selectedButtonTextColor,
          roomHistory: unselectedButtonTextColor,
          userInformation: unselectedButtonTextColor,
          floorMap: unselectedButtonTextColor,
          SimulataneousStay: unselectedButtonTextColor,
        },
      });
    } else if (pathname === pagesPath.roomHistory.$url().pathname) {
      setButtonColors({
        bgColors: {
          stayer: unselectedButtonBgColor,
          roomHistory: selectedButtonBgColor,
          userInformation: unselectedButtonBgColor,
          floorMap: unselectedButtonBgColor,
          SimulataneousStay: unselectedButtonBgColor,
        },
        textColors: {
          stayer: unselectedButtonTextColor,
          roomHistory: selectedButtonTextColor,
          userInformation: unselectedButtonTextColor,
          floorMap: unselectedButtonTextColor,
          SimulataneousStay: unselectedButtonTextColor,
        },
      });
    } else if (pathname === pagesPath.userInformation.$url().pathname) {
      setButtonColors({
        bgColors: {
          stayer: unselectedButtonBgColor,
          roomHistory: unselectedButtonBgColor,
          userInformation: selectedButtonBgColor,
          floorMap: unselectedButtonBgColor,
          SimulataneousStay: unselectedButtonBgColor,
        },
        textColors: {
          stayer: unselectedButtonTextColor,
          roomHistory: unselectedButtonTextColor,
          userInformation: selectedButtonTextColor,
          floorMap: unselectedButtonTextColor,
          SimulataneousStay: unselectedButtonTextColor,
        },
      });
    } else if (pathname === pagesPath.floorMap.$url().pathname) {
      setButtonColors({
        bgColors: {
          stayer: unselectedButtonBgColor,
          roomHistory: unselectedButtonBgColor,
          userInformation: unselectedButtonBgColor,
          floorMap: selectedButtonBgColor,
          SimulataneousStay: unselectedButtonBgColor,
        },
        textColors: {
          stayer: unselectedButtonTextColor,
          roomHistory: unselectedButtonTextColor,
          userInformation: unselectedButtonTextColor,
          floorMap: selectedButtonTextColor,
          SimulataneousStay: unselectedButtonTextColor,
        },
      });
    } else if (pathname === pagesPath.simulataneousStay.$url().pathname) {
      setButtonColors({
        bgColors: {
          stayer: unselectedButtonBgColor,
          roomHistory: unselectedButtonBgColor,
          userInformation: unselectedButtonBgColor,
          floorMap: unselectedButtonBgColor,
          SimulataneousStay: selectedButtonBgColor,
        },
        textColors: {
          stayer: unselectedButtonTextColor,
          roomHistory: unselectedButtonTextColor,
          userInformation: unselectedButtonTextColor,
          floorMap: unselectedButtonTextColor,
          SimulataneousStay: selectedButtonTextColor,
        },
      });
    }
  }, [pathname]);

  return buttonColors;
};

// const attendanceRegister = (callback: () => void) => {
//   axios
//     .post(`${baseURL}/user/v1/attendance`, {
//       meetingID: meetingID,
//     })
//     .then(() => window.alert("成功しました"))
//     .catch(() => window.alert("エラーが発生しました"));
// };
