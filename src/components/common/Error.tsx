'use client';
// import { Loader, LoadingOverlay } from '@mantine/core';

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return <div>{message}</div>;
};
export default Error;
