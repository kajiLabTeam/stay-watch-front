import type { NextPage } from "next";
import Layout from "components/common/Layout";
import Stayer from "components/stayer/Stayer";

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <Stayer />
      </div>
    </Layout>
  );
};

export default Home;
