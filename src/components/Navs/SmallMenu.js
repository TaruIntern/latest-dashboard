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

const Component = styled.div`
    /* width: ${(props) => (!props.collapsed ? "256px" : "100px")}; */
    transform: ${props => props.open ? "translateX(0)" : "translateX(-100%)"};
    position: absolute;
    transition: 500ms ease;
    /* height: calc(100vh - 50px - 70px); */
    width: 100%;
    z-index: 100;
    min-height: 90vh;
    min-width: 100vw;
    background-color: #fff;
    top: 75px;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    padding-top: 2rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    @media (min-width: 993px) {
      display: none;
    }
  `;
const Overview = styled(Menu.Item)`
    /* width: 100%;
    display: flex;
    justify-content: space-between; */
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

const SmallMenu = ({ openSmallMenu, homeActiveKey, setHomeActiveKey, setOpenSmallMenu }) => {
  const [activeKey, setActiveKey] = useState("1");

  console.log("home", homeActiveKey)
  return (
    <Component open={openSmallMenu}>
      <Menu
        selectedKeys={[activeKey]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"

        className="sidenav"
      >

        <FullWidthLink
          homeActiveKey={homeActiveKey === "1"}
          to="/home/overview"
          onClick={() => { setOpenSmallMenu(); setHomeActiveKey("1") }}
        >
          <p class="font-sf-regular text-xl my-4 border-b-2 pb-2">Overview</p>
        </FullWidthLink>

        <FullWidthLink
          homeActiveKey={homeActiveKey === "2"}
          to="/home/api"
          onClick={() => { setOpenSmallMenu(); setHomeActiveKey("2") }}
        >
          <p class="font-sf-regular text-xl my-4 border-b-2 pb-2">Apis</p>
        </FullWidthLink>

        <FullWidthLink
          homeActiveKey={homeActiveKey === "3"}
          to="/home/metrics"
          onClick={() => { setOpenSmallMenu(); setHomeActiveKey("3") }}
        >
          <p class="font-sf-regular text-xl my-4 border-b-2 pb-2">Metrics</p>
        </FullWidthLink>

        <FullWidthLink
          homeActiveKey={homeActiveKey === "4"}
          to="/home/quotas"
          onClick={() => { setOpenSmallMenu(); setHomeActiveKey("4") }}
        >
          <p class="font-sf-regular text-xl my-4 border-b-2 pb-2">Quotas</p>
        </FullWidthLink>
        <FullWidthLink
          homeActiveKey={homeActiveKey === "5"}
          to="/home/support"
          onClick={() => { setOpenSmallMenu(); setHomeActiveKey("5") }}
        >
          <p class="font-sf-regular text-xl my-4 border-b-2 pb-2">Help + Support</p>
        </FullWidthLink>

      </Menu>
    </Component>
  );
};

export default SmallMenu;
