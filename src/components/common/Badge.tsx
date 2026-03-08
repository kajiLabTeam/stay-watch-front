import React from 'react';

type Props = {
  name: string;
};

export const Badge = ({ name }: Props) => {
  return (
    <span className='h-fit rounded-full bg-staywatch-accent/10 px-1 text-xs text-staywatch-accent md:px-2 md:text-base'>
      {name}
    </span>
  );
};
