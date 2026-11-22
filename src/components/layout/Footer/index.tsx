import { ActivityHeatmapIcon } from '@/components/icons/ActivityHeatmap';
import { FooterCommunityName } from './CommunityName';
import { FooterLink } from './Link';
import { FooterLogo } from './Logo';
import { WatchIcon } from '@/components/icons/Watch';
import { HouseIcon } from '@/components/icons/House';
import { PersonIcon } from '@/components/icons/Person';
import { MapIcon } from '@/components/icons/Map';

const Footer = () => {
  return (
    <div>
      <FooterLogo />
      <FooterCommunityName />
      <div className='fixed bottom-0 z-50 w-full'>
        <div className='flex h-16 items-center justify-evenly bg-staywatch-main text-xs text-white'>
          <FooterLink to='/' label='滞在者'>
            <HouseIcon />
          </FooterLink>
          <FooterLink to='/roomHistory' label='滞在履歴'>
            <WatchIcon />
          </FooterLink>
          <FooterLink to='/userInformation' label='利用者情報'>
            <PersonIcon />
          </FooterLink>
          <FooterLink to='/floorMap' label='滞在者マップ'>
            <MapIcon />
          </FooterLink>
          <FooterLink to='/activityHeatmap' label='活動予報'>
            <ActivityHeatmapIcon />
          </FooterLink>
        </div>
      </div>
    </div>
  );
};
export default Footer;
