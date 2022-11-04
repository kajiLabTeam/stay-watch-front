import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";
import { Profile } from "@/components/layout/Profile";
import { useBgColor } from "@/hooks/commonhook";
import { pagesPath } from "@/utils/$path";

const Header = () => {
  const { width, height } = useWindowSize();
  const bgColors = useBgColor();

  return(
    <header>
        <div className="flex  h-20 items-center  justify-around bg-blue-400 text-xs text-white md:text-lg lg:text-2xl">
          <div className="flex h-full items-center gap-8">
            <Link href={pagesPath.$url()}>
              <a className="text-base font-bold md:text-xl lg:text-3xl">
                New! Stay Watch
              </a>
            </Link>
            <Link href={pagesPath.$url()}>
              <a className={`rounded-md py-2  ${bgColors.stayer}`}>滞在者</a>
            </Link>
            <Link href={pagesPath.roomHistory.$url()}>
              <a className={`rounded-md py-2 ${bgColors.roomHistory} `}>
                滞在履歴
              </a>
            </Link>
            <Link href={pagesPath.userInformation.$url()}>
              <a className={`rounded-md py-2 ${bgColors.userInformation}`}>
                利用者情報
              </a>
            </Link>
            <Link href={pagesPath.floorMap.$url()}>
              <a className={`rounded-md py-2 ${bgColors.floorMap}`}>
                滞在者マップ
              </a>
            </Link>
          </div>
          <Profile />
        </div>
      </header>
  );
};
export default Header;
