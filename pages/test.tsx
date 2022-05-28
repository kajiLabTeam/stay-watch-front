import Layout from "components/common/Layout";
import MyTabs from "components/common/MyTabs";
import Option from "components/common/Option";
import { Stayer2 } from "components/stayer/Stayer2";

const test = () => {
  return (
    <Layout>
      <div className=" ">
        <Stayer2 />
        <MyTabs />
      </div>
    </Layout>
  );
};

export default test;
