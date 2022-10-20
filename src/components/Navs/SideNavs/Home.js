import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  GoogleOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Typography } from "antd";
// import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Home.css";

import { RiHomeLine, RiHomeFill } from 'react-icons/ri';

const Component = styled.div`
  width: ${(props) => (!props.collapsed ? "256px" : "100px")};
  margin-top: 0.4rem;
  height: calc(100vh  - 80px);
  @media (max-width: 992px) {
    display: none;
  }
`;
const Manu = styled(Menu)``;
const Item = styled(Menu.Item)`
  display: flex !important;
  flex-direction: row-reverse !important;
`;
const Submenu = styled(Menu.SubMenu)`
  /* width: 30% !important; */
  /* display: flex;
    flex-direction: column !important; */
  display: ${(props) => (props.collapsed ? "none" : "inline")};
`;
const Overview = styled(Menu.Item)`
  /* width: 100%;
    display: flex;
    justify-content: space-between; */
`;
const OverviewText = styled.span`
  display: ${(props) => (props.collapsed ? "none" : "inline")};
`;
const MenuOpen = styled(MenuUnfoldOutlined)`
  /* font-size:10px; */
`;
const MenuClose = styled(MenuFoldOutlined)`
  /* font-size:10px !important; */
`;
const LastNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-bottom: 1rem;
  padding: 1rem 0;
  padding-left: 24px;
  box-shadow: inset 0px 1px 0px #f0f0f0;
`;
const LastNavItem = styled.div`
  padding: 0.1rem 0;
  width: 100%;
  display: flex;
  font-size: 1rem;
  align-items: center;
`;
const LastNavItemText = styled.h6`
  font-size: 0.9rem;
  margin: 0;
  margin-left: 5px;
  width: 100%;
  color: #6b7384 !important;
  font-family: sf-regular;
  font-style: normal;

  /* font-weight: 500; */
  color: ${(props) =>
    props.homeActiveKey ? " #3D4255 !important" : "#6b7384 !important"};

  display: ${(props) => (props.collapsed ? "none" : "inline")};
`;
const Google = styled(GoogleOutlined)`
  font-size: 1rem;
  margin: 0;
`;
const Message = styled(MessageOutlined)`
  font-size: 1rem;
  margin: 0;
`;
const FullWidthLink = styled(Link)`
  width: 100%;
  color: #6b7384 !important;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: ${(props) =>
    props.homeActiveKey ? "700 !important" : "500 !important"};
  /* font-weight: 500; */
  color: ${(props) =>
    props.homeActiveKey ? " #3D4255 !important" : "#6b7384 !important"};
`;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const HomeSideNav = ({ homeActiveKey, setHomeActiveKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  var today = new Date();
  today = today.toISOString().slice(0, 10);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  console.log(homeActiveKey);
  return (
    <Component collapsed={collapsed}>
      <Menu
        selectedKeys={[]}
        expandIcon={<></>}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        style={{
          height: "calc(100% - 80px)",
          width: "100%",
          overflow: "hidden",
          overflowY: !collapsed && "auto",
          // paddingRight: "1rem",
          paddingTop: "1rem"
        }}
        inlineCollapsed={collapsed}
        className="sidenav"
      >
        <Button
          type="text"
          onClick={toggleCollapsed}
          style={{
            //   margin: "0.4rem 0",
            padding: 0,
            marginLeft: collapsed ? '4rem' : '12rem',
            // marginBottom: '0.1rem',
            marginTop: '0rem'
          }}
        >

          {collapsed ? <MenuOpen /> : <img src="/images/sideBarBack.svg" style={{ height: "1rem", width: "0.9rem" }} />}
        </Button>
        <Overview onClick={() => setHomeActiveKey("1")} key={"1"}>
          <OverviewText collapsed={collapsed}>
            <div className="flex gap-2 items-center" style={{ paddingLeft: '0.23rem' }}>
              {homeActiveKey === "1" ? <img src="/images/homefill.svg" style={{ height: "1.25rem", width: "1.25rem" }} /> : <img src="/images/homeline.svg" style={{ height: "1.25rem", width: "1.25rem" }} />}
              <FullWidthLink
                homeActiveKey={homeActiveKey === "1"}
                to="/home/overview"
              >
                Overview
              </FullWidthLink>
            </div>
          </OverviewText>
        </Overview>

        <Submenu
          onTitleClick={() => setHomeActiveKey("2")}
          onClick={() => setHomeActiveKey("2")}
          onHover={({ key }) => setActiveKey(key)}
          collapsed={collapsed}
          icon={<></>}
          title={
            <div className="flex gap-2 items-center" style={{ paddingLeft: '0.01rem' }}>
              {homeActiveKey === "2" ? <img src="/images/serviceRunning.svg" style={{ height: "1.6rem", width: "1.6rem", paddingLeft: '2px' }} /> : <img src="/images/serviceStopped.svg" style={{ height: "1.6rem", width: "1.6rem", paddingLeft: '2px' }} />}
              <FullWidthLink homeActiveKey={homeActiveKey === "2"} to="/home/api">
                Apis
              </FullWidthLink>
            </div>
          }
          key="2"
          style={{}}
        >
        </Submenu>
        <Submenu
          onTitleClick={() => setActiveKey("3")}
          onHover={({ key }) => setActiveKey(key)}
          collapsed={collapsed}
          icon={<></>}
          title={
            <div className="flex gap-1 items-center">
              <img src="/images/metrics.svg" style={{ height: "1.7rem", width: "1.8rem", marginRight: '0.06rem' }} />
              <FullWidthLink
                homeActiveKey={homeActiveKey === "3"}
                to="/home/metrics"
              >
                Metrics
              </FullWidthLink>
            </div>
          }
          key="3"
          style={{}}
        >
        </Submenu>
        <Submenu
          onTitleClick={() => setActiveKey("4")}
          onHover={({ key }) => setActiveKey(key)}
          collapsed={collapsed}
          icon={<></>}
          title={
            <div className="flex gap-2 items-center pl-1">
              <img src="/images/quotas.svg" style={{ height: "1.25rem", width: "1.25rem" }} />
              <FullWidthLink
                homeActiveKey={homeActiveKey === "4"}
                to="/home/quotas"
              >
                Quotas
              </FullWidthLink>
            </div>
          }
          key="4"
          style={{}}
        >
        </Submenu>
        <Submenu
          onTitleClick={() => setActiveKey("5")}
          onHover={({ key }) => setActiveKey(key)}
          collapsed={collapsed}
          icon={<></>}
          title={
            <div className="flex gap-2 items-center pl-1">
              <img src="/images/support.svg" style={{ height: "1.25rem", width: "1.25rem" }} />
              <FullWidthLink
                homeActiveKey={homeActiveKey === "5"}
                to="/home/support"
              >
                Help + Support
              </FullWidthLink>
            </div>
          }
          key="6"
          style={{}}
        >
        </Submenu>

      </Menu>
      <LastNav>
        <LastNavItem>
          {/* <Google /> */}
          <img src="/images/feedback.svg" />
          <LastNavItemText collapsed={collapsed}>
            Feedback
          </LastNavItemText>
        </LastNavItem>
        <LastNavItem>
          {/* <Message /> */}
          <LastNavItemText collapsed={collapsed}>
            {today}
          </LastNavItemText>
        </LastNavItem>
      </LastNav>
    </Component >
  );
};

export default HomeSideNav;
