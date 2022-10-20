import { SearchOutlined, SwapRightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
  Typography,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { baseBucketUrl } from "../../Data/config";
import { user, userDetailsLocal } from "../../userConfig";
import SearchData from "./SearchData";

const Component = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  display: flex;
  background: #091e32;
  margin: 0 !important;

  border-bottom: 4px solid #091e32;
  @media (max-width: 992px) {
    display: none;
  }
`;
const LeftComponent = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  position: relative;
`;
const Logo = styled.img`
  margin: 0 !important;
  height: 80%;
`;
const SearchBar = styled(Input.Search)``;
const SearchComponent = styled.div`
  position: relative;
  width: 50%;
  margin-left: 1rem;
`;
const SearchBox = styled.div`
  width: ${(props) => props.width}px;
  position: absolute;
  /* min-height: 100px; */
  background-color: white;
  border: 1px solid hsl(213deg 24% 91%);
  top: 50px;
  /* left: 13%; */
  z-index: 100;
  display: ${(props) => (props.isSearched ? "block" : "none")};
`;
const RightComponent = styled.div`
  /* width:; */
`;
const CreateAcc = styled(Button)`
  color: #fff !important;
`;
const SignIn = styled(Button)``;
const UserComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* width: 50%; */
`;
const SearchIcon = styled.img`
  height: 0.9rem;
  margin: 0 0.7rem;
`;
const HelpIcon = styled.img`
  height: 0.9rem;
  margin: 0 0.7rem;
`;
const BadgeIcon = styled.img`
  height: 1rem;
  margin: 0 0.5rem;
`;
const UserDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4ch;
`;
const UserName = styled(Typography.Title)`
  font-family: "SF Pro Display", sans-serif !important;
  font-style: normal !important;
  font-weight: 400 !important;
  color: ${(props) => (props.color == "#000" ? "#000" : "#fff")} !important;
  display: inline;
  margin: 0 !important;
  margin: 0 0.4rem !important;
`;
const TopbarBig = ({ userUpdated }) => {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [isSearched, setIsSearched] = useState(0);
  const [quary, setQuary] = useState("");
  const [userData, setUserData] = useState();
  const getUser = () => {};

  const onSearch = (e) => setQuary(e.target.value.toLowerCase());

  const inFocus = () => {
    setIsSearched(true);
  };
  const inFocusOut = () => {
    setIsSearched(!true);
  };
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
    setWidth(ref.current.clientWidth / 2);
  }, [userUpdated]);
  // console.log(userUpdated);
  const menu = (
    <Menu>
      <Menu.Item>
        <Avatar>{userData && userData.name[0]}</Avatar>
        {/* <Space> */}
        {/* Click me */}
        <UserName color="#000" level={5}>
          {userData && userData.name}
        </UserName>
        {/* <DownOutlined /> */}
        {/* </Space> */}
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Component>
      <LeftComponent ref={ref}>
        <Logo src={baseBucketUrl + "/logo.png"} />
        {/* <SearchComponent>
            <SearchBar
              prefix={<SearchOutlined />}
              enterButton={<SwapRightOutlined />}
              placeholder="input search text"
              onChange={onSearch}
              onFocus={inFocus}
              onBlur={inFocusOut}
              style={{
                width: "100%",
                // padding: "1rem"
              }}
            />
            <SearchBox isSearched={isSearched} width={width}>
              <SearchData input={quary} />
            </SearchBox>
          </SearchComponent> */}
      </LeftComponent>
      <RightComponent>
        {userData ? (
          <UserComponent>
            {/* <SearchIcon src="/images/search.svg" />
            <HelpIcon src="/images/help.svg" />
            <Badge size="small"  count={15} >
              <BadgeIcon src="/images/badge.svg" />
            </Badge> */}
            <UserDiv>
              <Avatar>{userData.name[0]}</Avatar>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {/* Click me */}
                    <UserName level={5}>{userData.name}</UserName>
                    {/* <DownOutlined /> */}
                  </Space>
                </a>
              </Dropdown>
            </UserDiv>
          </UserComponent>
        ) : (
          <>
            <CreateAcc href="https://auth.novaeavenue.com/signup" type="link">
              Create Account
            </CreateAcc>
            <a href="https://auth.novaeavenue.com/signin">
              <SignIn>Sign In</SignIn>
            </a>
          </>
        )}
      </RightComponent>
    </Component>
  );
};

export default TopbarBig;
