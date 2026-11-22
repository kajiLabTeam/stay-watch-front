import { Link } from '@tanstack/react-router';
import { useCommunityState } from '@/atoms/communityAtom';
import { ActivityHeatmapIcon } from '@/components/icons/ActivityHeatmap';
import { paths } from '@/utils/path';
import { FooterLink } from './FooterLink';
import { WatchIcon } from '@/components/icons/Watch';
import { HouseIcon } from '@/components/icons/House';
import { PersonIcon } from '@/components/icons/Person';
import { MapIcon } from '@/components/icons/Map';

const Footer = () => {
  const community = useCommunityState();

  return (
    <div>
      <div className='h-12 bg-staywatch-main text-center shadow-md'>
        <div className='pt-1'>
          <Link to={paths.stayer.$url().pathname}>
            <img src='/logo.png' width={136} height={39} alt='logo' className='mx-auto' />
          </Link>
        </div>
      </div>
      <p className='mr-8 text-right text-xl text-gray-400'>{community.communityName}</p>
      <div className='fixed bottom-0 z-50 w-full'>
        <div className='flex h-16 items-center justify-evenly bg-staywatch-main text-xs text-white'>
          <FooterLink to='/' label='滞在者'>
            <HouseIcon />
          </FooterLink>
          <FooterLink to={paths.roomHistory.$url().pathname} label='滞在履歴'>
            <WatchIcon />
          </FooterLink>
          <FooterLink to={paths.userInformation.$url().pathname} label='利用者情報'>
            <PersonIcon />
          </FooterLink>
          <FooterLink to={paths.floorMap.$url().pathname} label='滞在者マップ'>
            <MapIcon />
          </FooterLink>
          <FooterLink to={paths.activityHeatmap.$url().pathname} label='活動予報'>
            <ActivityHeatmapIcon />
          </FooterLink>
        </div>
      </div>
    </div>
  );
};
export default Footer;
