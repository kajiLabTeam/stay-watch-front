// import axios from "axios";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { paths } from '@/utils/path';
// import { baseURL } from "@/utils/api";

type UseHeaderButtonColorReturn = {
  bgColors: Item;
  textColors: Item;
  iconColors: Item;
};

type Item = {
  stayer: string;
  roomHistory: string;
  userInformation: string;
  floorMap: string;
  SimulataneousStay: string;
};

export const useHeaderButtonColor = (): UseHeaderButtonColorReturn => {
  const pathname = usePathname();
  const selectedButtonTextColor = 'text-white';
  const unselectedButtonTextColor = 'text-staywatch-accent';
  const selectedButtonBgColor = 'bg-staywatch-accent';
  const unselectedButtonBgColor = '';
  const selectedButtonIconColor = 'white';
  const unselectedButtonIconColor = 'accent';
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
    iconColors: {
      stayer: unselectedButtonIconColor,
      roomHistory: unselectedButtonIconColor,
      userInformation: unselectedButtonIconColor,
      floorMap: unselectedButtonIconColor,
      SimulataneousStay: unselectedButtonIconColor,
    },
  });

  useEffect(() => {
    if (pathname === paths.root.$url().pathname) {
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
        iconColors: {
          stayer: selectedButtonIconColor,
          roomHistory: unselectedButtonIconColor,
          userInformation: unselectedButtonIconColor,
          floorMap: unselectedButtonIconColor,
          SimulataneousStay: unselectedButtonIconColor,
        },
      });
    } else if (pathname === paths.stayer.$url().pathname) {
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
        iconColors: {
          stayer: selectedButtonIconColor,
          roomHistory: unselectedButtonIconColor,
          userInformation: unselectedButtonIconColor,
          floorMap: unselectedButtonIconColor,
          SimulataneousStay: unselectedButtonIconColor,
        },
      });
    } else if (pathname === paths.roomHistory.$url().pathname) {
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
        iconColors: {
          stayer: unselectedButtonIconColor,
          roomHistory: selectedButtonIconColor,
          userInformation: unselectedButtonIconColor,
          floorMap: unselectedButtonIconColor,
          SimulataneousStay: unselectedButtonIconColor,
        },
      });
    } else if (pathname === paths.userInformation.$url().pathname) {
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
        iconColors: {
          stayer: unselectedButtonIconColor,
          roomHistory: unselectedButtonIconColor,
          userInformation: selectedButtonIconColor,
          floorMap: unselectedButtonIconColor,
          SimulataneousStay: unselectedButtonIconColor,
        },
      });
    } else if (pathname === paths.floorMap.$url().pathname) {
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
        iconColors: {
          stayer: unselectedButtonIconColor,
          roomHistory: unselectedButtonIconColor,
          userInformation: unselectedButtonIconColor,
          floorMap: selectedButtonIconColor,
          SimulataneousStay: unselectedButtonIconColor,
        },
      });
    } else if (pathname === paths.simulataneousStay.$url().pathname) {
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
        iconColors: {
          stayer: unselectedButtonIconColor,
          roomHistory: unselectedButtonIconColor,
          userInformation: unselectedButtonIconColor,
          floorMap: unselectedButtonIconColor,
          SimulataneousStay: selectedButtonIconColor,
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
