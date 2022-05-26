// import {
//   GetServerSideProps,
//   InferGetServerSidePropsType,
//   NextPage,
// } from "next";
// import useSWR, { SWRConfig } from "swr";
// import Layout from "components/common/Layout";
// import RoomHistory from "components/roomHistory/RoomHistory";
// import { baseURL } from "utils/api";

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

// const RoomHistoryIndex: NextPage<Props> = (props) => {
//   const { fallback } = props;
//   return (
//     <SWRConfig value={{ fallback }}>
//       <Layout>
//         <RoomHistory />
//       </Layout>
//     </SWRConfig>
//   );
// };
// export default RoomHistoryIndex;

import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import useSWR, { SWRConfig } from "swr";
import Layout from "components/common/Layout";
import RoomHistory from "components/roomHistory/RoomHistory";
import Log from "models/log";
import { baseURL } from "utils/api";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = `${baseURL}/room/v1/log`;
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log("SSR");

  return {
    props: { data },
  };
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    console.log("fetcher");
    return res.json();
  });

const RoomHistoryIndex: NextPage<Props> = (props) => {
  // const { fallback } = props;
  const initialData = props.data;
  console.log("initialData", initialData);

  const { data } = useSWR(`${baseURL}/room/v1/log`, fetcher, {
    fallbackData: initialData,
  });
  console.log("data=", data);

  return (
    <SWRConfig>
      <Layout>
        {data.map((item: Log) => {
          return (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.startAt}</p>
            </div>
          );
        })}
      </Layout>
    </SWRConfig>
  );
};
export default RoomHistoryIndex;
