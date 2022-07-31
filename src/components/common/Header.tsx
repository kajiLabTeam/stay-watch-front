import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { useWindowSize } from "usehooks-ts";
import { Profile } from "@/components/common/Profile";
import { useBgColor } from "@/components/common/commonhook";
import userState from "@/utils/Auth";

const Header = () => {
  const { width, height } = useWindowSize();
  const bgColors = useBgColor();
  const user = useRecoilValue(userState);
  console.log(user);

  //デスクトップ
  if (width > 853) {
    return (
      <div>
        <div className="flex  justify-around items-center  h-20 text-xs text-white bg-blue-400 md:text-lg lg:text-2xl">
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
          </div>
          <Profile />
          {/* {user == null ? <LoginButton /> : <Profile />} */}
          {/* <Option /> */}
        </div>
      </div>
    );
    //モバイル
  } else {
    return (
      <div>
        <div className="py-2 text-3xl font-bold text-center text-white bg-blue-400">
          <Link href="/">
            <a> New! Stay Watch</a>
          </Link>
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
