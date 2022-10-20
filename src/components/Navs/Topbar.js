import { ArrowRightOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import Sidenav from "./Sidenav";
import { user, userDetailsLocal } from "../../userConfig";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Space,
  Typography,
} from "antd";

const Component = styled.div`
  height: 10vh; 
  display: none;
  @media (max-width: 992px) {
    position: fixed;
    display: flex;
    z-index: 100;
    width: 100%;
    background-color: hsl(0deg 0% 100%);
    border-bottom: 1px solid hsl(213deg 24% 91%);
  }
`;
const MenuComponent = styled.div`
  position: fixed;
  display: flex;
  z-index: 100;
  width: 100%;
  top: 0;
  background-color: hsl(0deg 0% 100%);
  border-bottom: 1px solid hsl(213deg 24% 91%);
  padding: 1.5rem 2rem;
  align-items: center;
  justify-content: space-between;
`;
const Menu = styled.div``;
const MenuIcon = styled(MenuOutlined)`
  margin: 0 0.5rem;
`;
const SignIn = styled.div``;

const Topbar = ({ setOpenSmallMenu, openSmallMenu }) => {

  const ref = useRef();
  const [userData, setUserData] = useState();
  const getUser = () => { };

  const getUserData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.access);

    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://sender.paplilabs.com/login_api/ManualToken/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const userDataExtract = {
          email: result.email,
          name:
            result.user_profile[0].first_name +
            " " +
            result.user_profile[0].last_name,
          phoneNo: result.user_profile[0].phone_number,
        };
        localStorage.setItem("userDetails", JSON.stringify(userDataExtract));
        // navigate("/home/overview");
        setUserData(userDataExtract);
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    setTimeout(() => {
      if (!userDetailsLocal && user) {
        getUserData();
      } else {
        setUserData(userDetailsLocal);
      }
    }, 3000);
    if (!userDetailsLocal && user) {
      getUserData();
    } else {
      setUserData(userDetailsLocal);
    }
    // setWidth(ref.current.clientWidth / 2);
  }, []);


  // console.log("information", userData)
  return (
    <Component>
      <MenuComponent>
        <Menu onClick={() => setOpenSmallMenu()} className="flex justify-center items-center gap-2">
          <MenuIcon />
          <p className="text-lg font-sf-medium my-auto">Menu</p>
        </Menu>

        {userData ? (
          <div>
            <Avatar>{userData.name[0]}</Avatar>
          </div>
        ) : (
          <div className="flex gap-4">
            <a href="https://auth.novaeavenue.com/signup" className="hover:text-amber-300 font-sf-regular">
              Create Account
            </a>
            <a href="https://auth.novaeavenue.com/signin" className="hover:text-amber-300 font-sf-regular">
              <SignIn>Sign In</SignIn>
            </a>
          </div>
        )}


      </MenuComponent>
      {/* <SidenavComponent /> */}
    </Component>
  );
};

export default Topbar;
