import { NextPage } from "next";
import { SWRConfig } from "swr";
import RoomHistory from "@/components/roomHistory/RoomHistory";

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
// export const getServerSideProps: GetServerSideProps = async () => {
//   const API_URL = `${baseURL}/room/v1/log`;
//   const res = await fetch(API_URL);
//   const data = await res.json();

//

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
      <RoomHistory />
    </SWRConfig>
  );
};
export default RoomHistoryIndex;
