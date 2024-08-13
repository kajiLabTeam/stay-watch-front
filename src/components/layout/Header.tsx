'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Profile } from '@/components/layout/Profile';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useHeaderButtonColor } from '@/hooks/commonhook';
import { paths } from '@/utils/path';

const Header = () => {
  const buttonColors = useHeaderButtonColor();
  const community = useCommunityState();

  return (
    <div className='flex h-20 items-center justify-around bg-staywatch-main text-xs font-bold shadow-md md:text-lg lg:text-2xl'>
      <div className='flex h-full items-center gap-8'>
        <div className='mt-2 cursor-pointer'>
          <Link href={paths.stayer.$url()} passHref>
            <Image src='/logo.png' width={248} height={70} alt='logo' />
          </Link>
        </div>
        {/* <p className={`bg-staywatch-accent text-staywatch-accent`}>選択したボタンの背景色と文字色が変化</p> */}
        <Link href={paths.stayer.$url()}>
          <div
            className={`rounded-md ${buttonColors.bgColors.stayer} p-3 ${buttonColors.textColors.stayer}`}
          >
            滞在者
          </div>
        </Link>
        <Link href={paths.roomHistory.$url()}>
          <div
            className={`rounded-md ${buttonColors.bgColors.roomHistory} p-3 ${buttonColors.textColors.roomHistory}`}
          >
            滞在履歴
          </div>
        </Link>
        <Link href={paths.userInformation.$url()}>
          <div
            className={`rounded-md ${buttonColors.bgColors.userInformation} p-3 ${buttonColors.textColors.userInformation}`}
          >
            利用者情報
          </div>
        </Link>
        <Link href={paths.floorMap.$url()}>
          <div
            className={`rounded-md ${buttonColors.bgColors.floorMap} p-3 ${buttonColors.textColors.floorMap}`}
          >
            滞在者マップ
          </div>
        </Link>
      </div>
      <div className='text-center'>
        <p className='text-xl'>{community.communityName}</p>
        <Profile />
      </div>
    </div>
  );
};
export default Header;
