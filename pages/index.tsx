import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Stayer from "../components/Stayer";
import styles from "../styles/Home.module.css";

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
