import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import useSWR, { SWRConfig } from "swr";
import Layout from "components/common/Layout";
import RoomHistory from "components/roomHistory/RoomHistory";
import { baseURL } from "utils/api";

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
// export const getServerSideProps: GetServerSideProps = async () => {
//   const API_URL = `${baseURL}/room/v1/log`;
//   const res = await fetch(API_URL);
//   const data = await res.json();

//   console.log("SSR");

//   return {
//     props: {
//       fallback: {
//         [API_URL]: data,
//       },
//     },
//   };
// };

const RoomHistoryIndex: NextPage = () => {
  // const { fallback } = props;
  return (
    <SWRConfig>
      <Layout>
        <RoomHistory />
      </Layout>
    </SWRConfig>
  );
};
export default RoomHistoryIndex;
