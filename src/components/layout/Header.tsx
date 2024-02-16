import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/components/layout/Profile';
import { useCommunityState } from '@/globalStates/useCommunityState';
//import { useBgColor } from '@/hooks/commonhook';
import { pagesPath } from '@/utils/$path';

const Header = () => {
  //const bgColors = useBgColor();
  const community = useCommunityState();

  return (
    <header>
      <div className='flex h-20 items-center justify-around bg-staywatch-header text-xs text-white shadow-md md:text-lg lg:text-2xl'>
        <div className='flex h-full items-center gap-8'>
          <div className="mt-2 cursor-pointer">
            <Link href={pagesPath.$url()} passHref>
              <Image src="/logo.png" width={248} height={70} alt='logo'/>
              {/* <a className='text-base font-bold md:text-xl lg:text-3xl text-gray-900'>New! Stay Watch</a> */}
            </Link>
          </div>
          <Link href={pagesPath.$url()}>
            {/* <a className={`rounded-md p-2  ${bgColors.stayer}`}>滞在者</a> */}
            <a className="rounded-md bg-staywatch-button p-2 shadow-sm">滞在者</a>
          </Link>
          <Link href={pagesPath.roomHistory.$url()}>
            {/* <a className={`rounded-md p-2 ${bgColors.roomHistory} `}>滞在履歴</a> */}
            <a className="rounded-md border-2 border-staywatch-button bg-staywatch-header p-2 text-staywatch-button">滞在履歴</a>
          </Link>
          <Link href={pagesPath.userInformation.$url()}>
            {/* <a className={`rounded-md p-2 ${bgColors.userInformation}`}>利用者情報</a> */}
            <a className="rounded-md border-2 border-staywatch-button bg-staywatch-header p-2 text-staywatch-button">利用者情報</a>
          </Link>
          <Link href={pagesPath.floorMap.$url()}>
            {/* <a className={`rounded-md p-2 ${bgColors.floorMap}`}>滞在者マップ</a> */}
            <a className="rounded-md border-2 border-staywatch-button bg-staywatch-header p-2 text-staywatch-button">滞在者マップ</a>
          </Link>
        </div>
        <div className='text-center'>
          <p className='text-xl'>{community.communityName}</p>
          <Profile />
        </div>
      </div>
    </header>
  );
};
export default Header;
