import type { NextPage } from "next";
import LayoutHOC from "../components/Layout/LayoutHOC";
import PartyListContainer from "../components/PartyList/PartyListContainer";


const Home: NextPage = () => {
  return (
    <LayoutHOC>
      <PartyListContainer />
    </LayoutHOC>
  );
};

export default Home;
