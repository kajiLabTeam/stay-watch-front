import { Link } from '@tanstack/react-router';

export function FooterLogo(): React.JSX.Element {
  return (
    <div className='h-12 bg-staywatch-main text-center shadow-md'>
      <div className='pt-1'>
        <Link to='/stayer'>
          <img src='/logo.png' width={136} height={39} alt='logo' className='mx-auto' />
        </Link>
      </div>
    </div>
  );
}
