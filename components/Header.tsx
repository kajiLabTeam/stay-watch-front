import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Admin from "./Admin";
import Stayer from "./Stayer";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const [bgColors, setBgColors] = useState({
    stayer: "",
    roomHistory: "",
    userInformation: "",
    floorMap: "",
    SimulataneousStay: "",
  });

  console.log(pathname);

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

  return (
    <div>
      <div className="flex justify-around items-center h-20  text-xs text-white bg-blue-400 md:text-lg lg:text-2xl">
        <div className="flex gap-8 items-center h-full ">
          <Link href="/">
            <a className="text-base md:text-xl lg:text-3xl">New! Stay Watch</a>
          </Link>
          <Link href="/">
            <a className={`py-2 rounded-md ${bgColors.stayer}`}>在室者</a>
          </Link>
          <Link href="/roomHistory">
            <a className={`py-2 rounded-md ${bgColors.roomHistory} `}>
              在室履歴
            </a>
          </Link>

          <Link href="/userInformation">
            <a
              href=""
              className={`py-2 rounded-md ${bgColors.userInformation}`}
            >
              利用者情報
            </a>
          </Link>
          <Link href="/floorMap">
            <a className={`py-2 rounded-md ${bgColors.floorMap}`}>
              滞在者マップ
            </a>
          </Link>
          <Link href="/simulataneousStay">
            <a className={`py-2 rounded-md ${bgColors.SimulataneousStay}`}>
              同時滞在ログ
            </a>
          </Link>
        </div>
        <div>
          <Admin />
        </div>
      </div>
    </div>
  );
};
export default Header;
