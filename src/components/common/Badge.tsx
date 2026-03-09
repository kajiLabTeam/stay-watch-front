import React from 'react';

type Props = {
  name: string;
};

export const Badge = ({ name }: Props) => {
  return (
    <span
      className='
      h-fit rounded-full bg-staywatch-accent/10 px-1.5 py-px text-xs text-staywatch-accent
      md:px-2 md:py-0.5 md:text-base
    '
    >
      {name}
    </span>
  );
};
