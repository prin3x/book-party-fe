import type { NextPage } from "next";
import LayoutHOC from "../components/Layout/LayoutHOC";
import PartyListContainer from "../components/PartyList/PartyListContainer";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Party List</title>
      </Head>
      <LayoutHOC>
        <PartyListContainer />
      </LayoutHOC>
    </>
  );
};

export default Home;
