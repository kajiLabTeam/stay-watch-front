'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useHeaderButtonColor } from '@/hooks/commonhook';
import { paths } from '@/utils/path';

const Footer = () => {
  const buttonColors = useHeaderButtonColor();
  const community = useCommunityState();

  return (
    <div>
      <div className='h-12 bg-staywatch-main text-center shadow-md'>
        <div className='pt-1'>
          <Link href={paths.stayer.$url()} passHref>
            <Image src='/logo.png' width={136} height={39} alt='logo' className='mx-auto' />
          </Link>
        </div>
      </div>
      <p className='mr-8 text-right text-xl text-gray-400'>{community.communityName}</p>
      <div className='fixed bottom-0 z-50 w-full'>
        <div className='flex h-16 items-center justify-evenly bg-staywatch-main text-white'>
          <Link href='/'>
            <div>
              <div
                className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${buttonColors.bgColors.stayer} ${buttonColors.textColors.stayer}`}
              >
                <Image
                  src={`/home-${buttonColors.iconColors.stayer}.png`}
                  alt='stayer'
                  width={20}
                  height={20}
                />
                <div>滞在者</div>
              </div>
            </div>
          </Link>
          <Link href={paths.roomHistory.$url()}>
            <div>
              <div
                className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${buttonColors.bgColors.roomHistory} ${buttonColors.textColors.roomHistory}`}
              >
                <Image
                  src={`/history-${buttonColors.iconColors.roomHistory}.png`}
                  alt='history'
                  width={20}
                  height={20}
                />
                <div>滞在履歴</div>
              </div>
            </div>
          </Link>
          <Link href={paths.userInformation.$url()}>
            <div>
              <div
                className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${buttonColors.bgColors.userInformation} ${buttonColors.textColors.userInformation}`}
              >
                <Image
                  src={`/userinfo-${buttonColors.iconColors.userInformation}.png`}
                  alt='userInfo'
                  width={15}
                  height={20}
                />
                <div>利用者情報</div>
              </div>
            </div>
          </Link>
          <Link href={paths.floorMap.$url()}>
            <div>
              <div
                className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${buttonColors.bgColors.floorMap} ${buttonColors.textColors.floorMap}`}
              >
                <Image
                  src={`/map-${buttonColors.iconColors.floorMap}.png`}
                  alt='map'
                  width={20}
                  height={20}
                />
                <div>滞在者マップ</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
