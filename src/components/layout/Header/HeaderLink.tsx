import { Link } from '@tanstack/react-router';

interface HeaderLinkProps {
  to: string;
  label: string;
}

export function HeaderLink({ to, label }: HeaderLinkProps): React.JSX.Element {
  return (
    <Link
      to={to}
      className='rounded-md p-1.5 text-staywatch-accent data-[status=active]:bg-staywatch-accent data-[status=active]:text-white md:p-2 lg:p-3'
    >
      {label}
    </Link>
  );
}
