import logo from "./logo.svg";
import "./App.css";
import TabNav from "./components/Navs/TabNav";
import styled from "styled-components";
import Topbar from "./components/Navs/Topbar";
import TopbarBig from "./components/Navs/TopbarBig";
import { Routes, Route, Navigate } from "react-router-dom";
// import Sidenav from "./components/Navs/Sidenav";
import Payment from "./components/MainBody/Payment";
import PaymentTable from "./components/MainBody/PaymentTable";
import Home from "./components/MainBody/Home.js/Home";
import HomeApi from "./components/MainBody/Home.js/HomeApi";
import SmallMenu from "./components/Navs/SmallMenu";
import { useState } from "react";
import HomeOverview from "./components/MainBody/Home.js/HomeOverview";
import HomeCredential from "./components/MainBody/Home.js/HomeCredentials";
import HomeMetric from "./components/MainBody/Home.js/HomeMetric";
import HomeQuotas from "./components/MainBody/Home.js/HomeQuotas";
import ExtractCredential from "./ExtractCredential";

const Component = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  // const navigate = useNavigate();
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  const toggleOpen = () => setOpenSmallMenu(!openSmallMenu);
  const [homeActiveKey, setHomeActiveKey] = useState("1");
  const [userUpdated, setUserUpdated] = useState(false);

  return (
    <Routes>
      <Route
        path="/home"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav /> */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <Home
              homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey}
            />
          </Component>
        }
      ></Route>
      <Route
        path="/home/overview"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav />{" "} */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <HomeOverview
              homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey}
            />
          </Component>
        }
      />
      <Route
        path="/home/api"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav />{" "} */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <HomeApi />
          </Component>
        }
      />
      <Route
        path="/home/credentials"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav />{" "} */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <HomeCredential />
          </Component>
        }
      />
      <Route
        path="/home/metrics"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav />{" "} */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <HomeMetric />
          </Component>
        }
      />
      <Route
        path="/home/quotas"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav />{" "} */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <HomeQuotas />
          </Component>
        }
      />
      <Route
        path="/projects"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav /> */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <Payment />
          </Component>
        }
      ></Route>
      <Route
        path="/projects/table"
        exact
        element={
          <Component>
            <TopbarBig userUpdated={userUpdated} />
            {/* <TabNav /> */}
            <Topbar
              openSmallMenu={openSmallMenu}
              setOpenSmallMenu={toggleOpen}
            />
            <SmallMenu openSmallMenu={openSmallMenu} homeActiveKey={homeActiveKey}
              setHomeActiveKey={setHomeActiveKey} setOpenSmallMenu={toggleOpen} />
            <PaymentTable />
          </Component>
        }
      ></Route>

      <Route
        path="/"
        element={
          <ExtractCredential
            userUpdated={userUpdated}
            setUserUpdated={setUserUpdated}
          />
        }
      />
      <Route
        path="/:token"
        element={
          <ExtractCredential
            userUpdated={userUpdated}
            setUserUpdated={setUserUpdated}
          />
        }
      />
    </Routes>
  );
}

export default App;
