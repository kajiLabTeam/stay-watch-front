import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";
import { useBgColor } from "@/hooks/commonhook";
import { pagesPath } from "@/utils/$path";

const Footer = () => {
    const { width, height } = useWindowSize();
    const bgColors = useBgColor();

    return (
        <div>
        <header className="bg-blue-400 py-2 text-center text-3xl font-bold text-white">
            <Link href={pagesPath.$url()}>
            <a> New! Stay Watch</a>
            </Link>
        </header>
        <div className="fixed bottom-0 w-full">
            <div className="flex h-16 items-center justify-evenly bg-blue-400 text-white">
            <Link href="/">
                <a>
                {/* <div className="flex flex-col items-center gap-1 px-2 py-1 rounded"> */}
                <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.stayer}`}>
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
            <Link href={pagesPath.roomHistory.$url()}>
                <a>
                <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.roomHistory}`}>
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
            <Link href={pagesPath.userInformation.$url()}>
                <a>
                <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.userInformation}`}>
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
            <Link href={pagesPath.floorMap.$url()}>
                <a>
                <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.floorMap}`}>
                    <Image src="/mapWhite.png" alt="map" width={20} height={20} />
                    <div>滞在者マップ</div>
                </div>
                </a>
            </Link>
            </div>
        </div>
        </div>
    );
  
};
export default Footer;