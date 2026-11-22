import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface FooterLinkProps {
  to: string;
  label: string;
  /** SVG アイコン．色は `currentColor` で親の文字色に追従する */
  children: ReactNode;
}

export function FooterLink({ to, label, children }: FooterLinkProps): React.JSX.Element {
  return (
    <Link
      to={to}
      className='flex flex-col items-center gap-0.5 rounded-md px-1.5 py-1 text-staywatch-accent data-[status=active]:bg-staywatch-accent data-[status=active]:text-white'
    >
      <div className='flex size-5 items-center justify-center [&>svg]:size-full'>{children}</div>
      <div>{label}</div>
    </Link>
  );
}
