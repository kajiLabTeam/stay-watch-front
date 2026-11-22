import { Link } from '@tanstack/react-router';
import { Profile } from '@/components/layout/Profile';
import { useCommunityState } from '@/atoms/communityAtom';
import { HeaderLink } from './HeaderLink';

const Header = () => {
  const community = useCommunityState();

  return (
    <div className='flex h-20 items-center justify-around bg-staywatch-main text-xs font-bold shadow-md md:text-lg lg:text-2xl'>
      <div className='flex h-full items-center gap-2 md:gap-4 lg:gap-8'>
        <div className='mt-2 cursor-pointer'>
          <Link to='/stayer'>
            <img src='/logo.png' width={248} height={70} alt='logo' />
          </Link>
        </div>
        <HeaderLink to='/stayer' label='滞在者' />
        <HeaderLink to='/roomHistory' label='滞在履歴' />
        <HeaderLink to='/userInformation' label='利用者情報' />
        <HeaderLink to='/floorMap' label='滞在者マップ' />
        <HeaderLink to='/activityHeatmap' label='活動予報' />
      </div>
      <div className='text-center'>
        <p className='text-xl'>{community.communityName}</p>
        <Profile />
      </div>
    </div>
  );
};
export default Header;
