import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Stayer from "../stayer/Stayer";
import Option from "./Option";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const { width, height } = useWindowSize();

  const [bgColors, setBgColors] = useState({
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

  //デスクトップ
  if (width > 853) {
    return (
      <div>
        <div className="flex justify-around items-center h-20  text-xs text-white bg-blue-400 md:text-lg lg:text-2xl">
          <div className="flex gap-8 items-center h-full ">
            <Link href="/">
              <a className="text-base font-bold md:text-xl lg:text-3xl">
                New! Stay Watch
              </a>
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
            {/* <Link href="/simulataneousStay">
            <a className={`py-2 rounded-md ${bgColors.SimulataneousStay}`}>
              同時滞在ログ
            </a>
          </Link> */}
          </div>
          <div>
            <Option />
          </div>
        </div>
      </div>
    );
    //モバイル
  } else {
    return (
      <div>
        <div className="py-2 text-3xl font-bold text-center text-white bg-blue-400">
          New! Stay Watch
        </div>
        <div className="fixed bottom-0 w-full">
          <div className="flex justify-evenly items-center h-16 text-white bg-blue-400">
            <Link href="/">
              <a>
                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src="/homeWhite.png"
                    alt="stayer"
                    width={20}
                    height={20}
                  />
                  <div>滞在者</div>
                </div>
              </a>
            </Link>
            <Link href="/roomHistory">
              <a>
                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src="/historyWhite.png"
                    alt="history"
                    width={20}
                    height={20}
                  />
                  <div>滞在履歴</div>
                </div>
              </a>
            </Link>
            <Link href="/userInformation">
              <a>
                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src="/userInfoWhite.png"
                    alt="userInfo"
                    width={15}
                    height={20}
                  />
                  <div>利用者情報</div>
                </div>
              </a>
            </Link>
            <Link href="/floorMap">
              <a>
                <div className="flex flex-col gap-1 items-center">
                  <Image src="/mapWhite.png" alt="map" width={20} height={20} />
                  <div>滞在者マップ</div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default Header;
