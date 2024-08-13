'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  router.push('/stayer');
  router.refresh();

  return <></>;
};

export default Home;
