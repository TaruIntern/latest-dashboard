import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Tabs, Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Routes, Route, Link } from "react-router-dom";
import "./Tab.css"
const { TabPane } = Tabs;

const Component = styled.div`
  /* padding: 1rem 0; */
  /* height: 100vh; */

  background: #091e32;
  margin: 0 !important;
  /* border-bottom: 1px solid #e4e8ed; */
  @media (max-width: 992px) {
    display: none;
  }
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownItem = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  /* align-self: stretch; */
`;

const ClickMe = styled(Typography.Text)`
  margin: 0 5px;
`;
const SupportButton = styled(Button)`
  margin-left: 20px;
`;
const TabPanel = styled(TabPane)`
  padding: 0 !important;
  /* height: 80vh; */
`;
const FullWidthLink = styled(Link)`
  width: 100%;
  height: 100% !important;
  padding: 1rem 0;
  color: #D5DAF4 !important;
`;

const menu = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: "0",
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: "3rd menu item",
        key: "3",
      },
    ]}
  />
);
const operations = (
  <RightContainer>
    <Dropdown overlay={menu} trigger={["click"]}>
      {/* <a className="dropdown-a" onClick={(e) => e.preventDefault()}> */}
      {/* <Space  style={{
        color: "blue !important",
        display: "flex",
        alignItems:"center !important"
      }}> */}
      <DropdownItem>
        <ClickMe>Api docs</ClickMe>
        <DownOutlined />
      </DropdownItem>
      {/* </Space> */}
      {/* </a> */}
    </Dropdown>
    <SupportButton
      href="#"
      type="link"
      style={{
        color: "black",
      }}
      margin="5px"
    >
      Support
    </SupportButton>
  </RightContainer>
);
const TabNav = () => {
  const navigate = useNavigate();
  return (
    <Component>
      <Tabs
        tabBarStyle={{
          padding: "0rem 2rem",
          height: "50px",
          margin: 0,
        }}
        // tabBarExtraContent={operations}
        // activeKey={"1"}
      
      >
        <TabPanel
          tab={<FullWidthLink to="/home/overview">Home</FullWidthLink>}
          key="1"
          onClick={() => console.log("/home")}
        ></TabPanel>
        <TabPanel
          tab={<FullWidthLink to="/projects">Projects</FullWidthLink>}
          key="2"
        ></TabPanel>
        <TabPanel
          tab={<FullWidthLink to="/applications">Applications</FullWidthLink>}
          key="3"
        ></TabPanel>
      </Tabs>
    </Component>
  );
};

export default TabNav;
