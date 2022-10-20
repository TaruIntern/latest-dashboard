import React from "react";
import styled from "styled-components";
// import Sidenav from "../Navs/Sidenav";
import FirstTable from "./Tables/FirstTable";

const Component = styled.div`
  width: 100%;
  display: flex;
`;
const MainBody = styled.div`
  @media (min-width: 993px) {
    width: calc(100% - 300px);
  }
`;
const PaymentTable = () => {
  return (
    <Component>
      {/* <Sidenav /> */}
      <MainBody>
        <FirstTable />
      </MainBody>
    </Component>
  );
};

export default PaymentTable;
