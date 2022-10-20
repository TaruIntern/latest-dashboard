import React from "react";
import styled from "styled-components";
import HomeSideNav from "../../Navs/SideNavs/Home";
import FirstTable from "../Tables/FirstTable";
import FirstGraph from "../Graphs/FirstGraph";
import { useRef } from "react";
import { useEffect } from "react";
import { Alert, Typography } from "antd";
import CredentialTable from "../Tables/CredentialTable";

const Component = styled.div`
  width: 100%;
  display: flex;
`;
const MainBody = styled.div`
  padding: 1rem 4rem;
  /* margin-top: 1rem; */
  width: 100%;
  @media (min-width: 993px) {
    /* width: calc(100% - 256px); */
  }
`;
const MainBodyInside = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;
const Title = styled(Typography.Title)`
  margin: 0 !important;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;

  /* Character/Primary .85 */

  color: rgba(0, 0, 0, 0.85);
`;
const ViewCred = styled(Typography.Title)`
  margin: 5px 0 !important;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 400 !important;
  font-size: 1.3rem !important;
  letter-spacing: 0.015em;
  margin-bottom: 2rem !important;
  line-height: 2.2rem;

  color: #3d4255 !important;
`;
const CredLink = styled(Typography.Link)`
  color: #446bd0 !important;
  font-size: 1.3rem !important;
  text-decoration: underline !important;
`;

const HomeCredential = () => {
  const ref = useRef();
  useEffect(() => {}, []);

  return (
    <Component>
      <HomeSideNav homeActiveKey={"5"} />
      <MainBody ref={ref}>
        <MainBodyInside>
          <Title level={2}>Credentials compatible with this API</Title>
          <ViewCred level={5}>
            To view all credentials visit{" "}
            <CredLink href="#">Credentials in APIs & Services</CredLink>
          </ViewCred>
          <CredentialTable />
        </MainBodyInside>
      </MainBody>
    </Component>
  );
};

export default HomeCredential;
