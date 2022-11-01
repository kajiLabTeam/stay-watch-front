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

  //デスクトップ
  // if (width > 853) {
  //   return (
      // <header>
      //   <div className="flex  h-20 items-center  justify-around bg-blue-400 text-xs text-white md:text-lg lg:text-2xl">
      //     <div className="flex h-full items-center gap-8">
      //       <Link href={pagesPath.$url()}>
      //         <a className="text-base font-bold md:text-xl lg:text-3xl">
      //           New! Stay Watch
      //         </a>
      //       </Link>
      //       <Link href={pagesPath.$url()}>
      //         <a className={`rounded-md py-2  ${bgColors.stayer}`}>滞在者</a>
      //       </Link>
      //       <Link href={pagesPath.roomHistory.$url()}>
      //         <a className={`rounded-md py-2 ${bgColors.roomHistory} `}>
      //           滞在履歴
      //         </a>
      //       </Link>
      //       <Link href={pagesPath.userInformation.$url()}>
      //         <a className={`rounded-md py-2 ${bgColors.userInformation}`}>
      //           利用者情報
      //         </a>
      //       </Link>
      //       <Link href={pagesPath.floorMap.$url()}>
      //         <a className={`rounded-md py-2 ${bgColors.floorMap}`}>
      //           滞在者マップ
      //         </a>
      //       </Link>
      //     </div>
      //     <Profile />
      //   </div>
      // </header>
  //   );
  //   //モバイル
  // } else {
  //   return (
  //     <div>
  //       <header className="bg-blue-400 py-2 text-center text-3xl font-bold text-white">
  //         <Link href={pagesPath.$url()}>
  //           <a> New! Stay Watch</a>
  //         </Link>
  //       </header>
  //       <div className="fixed bottom-0 w-full">
  //         <div className="flex h-16 items-center justify-evenly bg-blue-400 text-white">
  //           <Link href="/">
  //             <a>
  //               {/* <div className="flex flex-col items-center gap-1 px-2 py-1 rounded"> */}
  //               <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.stayer}`}>
  //                 <Image
  //                   src="/homeWhite.png"
  //                   alt="stayer"
  //                   width={20}
  //                   height={20}
  //                 />
  //                 <div>滞在者</div>
  //               </div>
  //             </a>
  //           </Link>
  //           <Link href={pagesPath.roomHistory.$url()}>
  //             <a>
  //               <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.roomHistory}`}>
  //                 <Image
  //                   src="/historyWhite.png"
  //                   alt="history"
  //                   width={20}
  //                   height={20}
  //                 />
  //                 <div>滞在履歴</div>
  //               </div>
  //             </a>
  //           </Link>
  //           <Link href={pagesPath.userInformation.$url()}>
  //             <a>
  //               <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.userInformation}`}>
  //                 <Image
  //                   src="/userInfoWhite.png"
  //                   alt="userInfo"
  //                   width={15}
  //                   height={20}
  //                 />
  //                 <div>利用者情報</div>
  //               </div>
  //             </a>
  //           </Link>
  //           <Link href={pagesPath.floorMap.$url()}>
  //             <a>
  //               <div className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${bgColors.floorMap}`}>
  //                 <Image src="/mapWhite.png" alt="map" width={20} height={20} />
  //                 <div>滞在者マップ</div>
  //               </div>
  //             </a>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};
export default Header;
