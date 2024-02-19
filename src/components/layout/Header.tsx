import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/components/layout/Profile';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useHeaderButtonColor } from '@/hooks/commonhook';
import { pagesPath } from '@/utils/$path';

const Header = () => {
  const buttonColors = useHeaderButtonColor();
  const community = useCommunityState();

  return (
    <header>
      <div className='flex h-20 items-center justify-around bg-staywatch-yellow text-xs shadow-md md:text-lg lg:text-2xl'>
        <div className='flex h-full items-center gap-8'>
          <div className='mt-2 cursor-pointer'>
            <Link href={pagesPath.$url()} passHref>
              <Image src='/logo.png' width={248} height={70} alt='logo' />
            </Link>
          </div>
          {/* <p className={`bg-staywatch-orange text-staywatch-orange`}>aaa</p> */}
          <Link href={pagesPath.$url()}>
            <a
              className={`rounded-md border-2 border-staywatch-orange ${buttonColors.bgColors.stayer} p-2 ${buttonColors.textColors.stayer} shadow-sm`}
            >
              滞在者
            </a>
          </Link>
          <Link href={pagesPath.roomHistory.$url()}>
            <a
              className={`rounded-md border-2 border-staywatch-orange ${buttonColors.bgColors.roomHistory} p-2 ${buttonColors.textColors.roomHistory} shadow-sm`}
            >
              滞在履歴
            </a>
          </Link>
          <Link href={pagesPath.userInformation.$url()}>
            <a
              className={`rounded-md border-2 border-staywatch-orange ${buttonColors.bgColors.userInformation} p-2 ${buttonColors.textColors.userInformation} shadow-sm`}
            >
              利用者情報
            </a>
          </Link>
          <Link href={pagesPath.floorMap.$url()}>
            <a
              className={`rounded-md border-2 border-staywatch-orange ${buttonColors.bgColors.floorMap} p-2 ${buttonColors.textColors.floorMap} shadow-sm`}
            >
              滞在者マップ
            </a>
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
