import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    stayer: "",
    roomHistory: "",
    userInformation: "",
    floorMap: "",
    SimulataneousStay: "",
  });

  useEffect(() => {
    if (pathname === "/") {
      setBgColors({
        stayer: "bg-red-400",
        roomHistory: "",
        userInformation: "",
        floorMap: "",
        SimulataneousStay: "",
      });
    } else if (pathname === "/roomHistory") {
      setBgColors({
        stayer: "",
        roomHistory: "bg-red-400",
        userInformation: "",
        floorMap: "",
        SimulataneousStay: "",
      });
    } else if (pathname === "/userInformation") {
      setBgColors({
        stayer: "",
        roomHistory: "",
        userInformation: "bg-red-400",
        floorMap: "",
        SimulataneousStay: "",
      });
    } else if (pathname === "/floorMap") {
      setBgColors({
        stayer: "",
        roomHistory: "",
        userInformation: "",
        floorMap: "bg-red-400",
        SimulataneousStay: "",
      });
    } else if (pathname === "/simulataneousStay") {
      setBgColors({
        stayer: "",
        roomHistory: "",
        userInformation: "",
        floorMap: "",
        SimulataneousStay: "bg-red-400",
      });
    }
  }, [pathname]);

  return bgColors;
};
