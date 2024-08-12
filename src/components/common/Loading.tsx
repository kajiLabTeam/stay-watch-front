'use client';
import { Loader, LoadingOverlay } from '@mantine/core';

type LoadingProps = {
  message: string;
};

const Loading = ({ message }: LoadingProps) => {
  return (
    <LoadingOverlay
      visible
      overlayProps={{ radius: 'sm', backgroundOpacity: 0 }}
      loaderProps={{ children: LoadingContent(message) }}
    />
  );
};
export default Loading;

const LoadingContent = (message: string) => {
  return (
    <div className='flex flex-col text-center'>
      <Loader className='mx-auto mb-2' color='rgba(30, 82, 102, 0.8)' size={50} />
      <p className='mx-auto md:text-sm lg:text-lg'>{message}</p>
    </div>
  );
};
