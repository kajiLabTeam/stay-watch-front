import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import useSWR, { SWRConfig } from "swr";
import Layout from "../../components/common/Layout";
import UserInformation from "../../components/userInformation/UserInformation";
import User from "../../models/user";

import { baseURL } from "../../utils/api";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = `${baseURL}/user/v1/list`;
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
      <Layout>
        <UserInformation />
      </Layout>
    </SWRConfig>
  );
};

export default UserInformationIndex;
