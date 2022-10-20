import React from "react";
import styled from "styled-components";
// import Sidenav from "../Navs/Sidenav";

const Component = styled.div`
  width: 100%;
  /* display: flex; */
`;
const MainBody = styled.div`
  /* width: calc(100% - 336px); */
`;
const Payment = () => {
  return (
    <Component>
      {/* <Sidenav /> */}
      <MainBody />
    </Component>
  );
};

export default Payment;
