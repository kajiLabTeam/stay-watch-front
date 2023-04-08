import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { SWRConfig } from 'swr';
import UserInformation from '@/features/userInformation/UserInformation';
import { endpoints } from '@/utils/api';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = `${endpoints.users}`;
  const res = await fetch(API_URL);
  const data = await res.json();
  return {
    props: {
      fallback: {
        [API_URL]: data,
      },
    },
  };
};

const UserInformationIndex: NextPage<Props> = (props) => {
  const { fallback } = props;
  return (
    <SWRConfig value={{ fallback }}>
      <UserInformation />
    </SWRConfig>
  );
};

export default UserInformationIndex;
