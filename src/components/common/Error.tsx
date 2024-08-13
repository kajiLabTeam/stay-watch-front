'use client';

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return <div>{message}</div>;
};
export default Error;
