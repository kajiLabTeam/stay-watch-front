//import { rem } from '@mantine/core'
//import { IconHome } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useCommunityState } from '@/globalStates/useCommunityState';
import { useHeaderButtonColor } from '@/hooks/commonhook';
import { pagesPath } from '@/utils/$path';

const Footer = () => {
  const buttonColors = useHeaderButtonColor();
  const community = useCommunityState();

  return (
    <div>
      <header className='h-12 bg-staywatch-main text-center shadow-md'>
        <div className='pt-1'>
          <Link href={pagesPath.$url()} passHref>
            <Image src='/logo.png' width={136} height={39} alt='logo' />
          </Link>
        </div>
      </header>
      <p className='mr-8 text-right text-xl text-gray-400'>{community.communityName}</p>
      <div className='fixed bottom-0 w-full'>
        <div className='flex h-16 items-center justify-evenly bg-staywatch-main text-white'>
          <Link href='/'>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${buttonColors.bgColors.stayer} ${buttonColors.textColors.stayer}`}
              >
                <Image
                  src={`/home-${buttonColors.iconColors.stayer}.png`}
                  alt='stayer'
                  width={20}
                  height={20}
                />
                {/* <IconHome/> */}
                <div>滞在者</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.roomHistory.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${buttonColors.bgColors.roomHistory} ${buttonColors.textColors.roomHistory}`}
              >
                <Image
                  src={`/history-${buttonColors.iconColors.roomHistory}.png`}
                  alt='history'
                  width={20}
                  height={20}
                />
                <div>滞在履歴</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.userInformation.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${buttonColors.bgColors.userInformation} ${buttonColors.textColors.userInformation}`}
              >
                <Image
                  src={`/userinfo-${buttonColors.iconColors.userInformation}.png`}
                  alt='userInfo'
                  width={15}
                  height={20}
                />
                <div>利用者情報</div>
              </div>
            </a>
          </Link>
          <Link href={pagesPath.floorMap.$url()}>
            <a>
              <div
                className={`flex flex-col items-center gap-1 rounded-md py-1 px-2 ${buttonColors.bgColors.floorMap} ${buttonColors.textColors.floorMap}`}
              >
                <Image
                  src={`/map-${buttonColors.iconColors.floorMap}.png`}
                  alt='map'
                  width={20}
                  height={20}
                />
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
