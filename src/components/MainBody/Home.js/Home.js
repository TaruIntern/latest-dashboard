import React from "react";
import styled from "styled-components";
import HomeSideNav from "../../Navs/SideNavs/Home";
// import Sidenav from "../../Navs/Sidenav";
import FirstTable from "../Tables/FirstTable";

const Component = styled.div`
  width: 100%;
  display: flex;
`;
const MainBody = styled.div`
  @media (min-width: 993px) {
    width: calc(100% - 256px);
  }
`;
const Home = () => {
  return (
    <Component>
      <HomeSideNav />
      <MainBody>

        <FirstTable />
      </MainBody>
    </Component>
  );
};

export default Home;
