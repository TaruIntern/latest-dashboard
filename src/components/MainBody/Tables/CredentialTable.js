import {
  Button,
  Dropdown,
  Empty,
  Menu,
  message,
  Modal,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";

import "./CustomTable.css";
import { user } from "../../../userConfig";
import { DownOutlined } from "@ant-design/icons";

const CustomizedTable = styled(Table)`
  padding: 0 0rem;
`;
const ButtonComponent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
`;
const ShowButton = styled(Button)`
  padding: 1rem 1.1rem !important;
  display: flex;
  align-items: center;
`;
const DotImage = styled.img`
  margin: 0;
  /* padding: 0.2rem 0rem !important; */
  margin-left: 5px;
  align-self: center;
  /* height: ; */
  width: auto;
  /* height: 100%; */
`;
const Span = styled.span`
  margin-right: 5px;
  color: #3f68cf;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 500;
`;
const StyledModal = styled(Modal)`
  width: 40rem !important;
  padding: 1.5rem !important;
`;
const Title = styled.h2`
  font-family: "SF Pro Display", sans-serif !important;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.015em;

  color: #3d4255;
`;
const Parameter = styled.h5`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.95rem;
  color: #3d4255;
`;
const Code = styled.code`
  background: #f7f7f7;
  padding: 0.5rem 0.5rem;
  color: #3d4255;
`;
const CopyImage = styled.img`
  position: absolute;
  right: 10px;
  top: 40px;
`;
const Key = styled.p`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 500;
`;
const StyledLink = styled(Typography.Link)`
  color: #446bd0 !important;
  /* font-size: 1.3rem !important; */
  text-decoration: underline !important;
`;
// const data = [
//   {
//     key: "1",
//     name: "Maps API Key",

//     creationDate: "Aug 4, 2022",
//     restrictions: "None",
//     apiKey: "AIzaSyA12m9nZGMGgyVWd4LllVgh2oH6Q6KG0uM",
//   },
//   {
//     key: "2",
//     name: "Maps API Key",

//     creationDate: "Aug 4, 2022",
//     restrictions: "None",
//     apiKey: "AIzaSyA12m9nZGMGgyVWd4LllVgh2oH6Q6KG0uM",
//   },
//   {
//     key: "3",
//     name: "Maps API Key",

//     creationDate: "Aug 4, 2022",
//     restrictions: "None",
//     apiKey: "AIzaSyA12m9nZGMGgyVWd4LllVgh2oH6Q6KG0uM",
//   },
// ];

const CredentialTable = () => {
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [isKeyEnable, setIsKeyEnable] = useState(false);
  const success = (copyText) => {
    message.success("Your api key has been copied");
  };
  const handleDelete = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.access);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://receiver.paplilabs.com/receiver/userAvailableApis/?API_KEY=" +
        token,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((error) => console.log("error", error));
  };
  const disableEnableKey = (disabled, token) => {
    // console.log(a)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.access);

    var formdata = new FormData();
    formdata.append("enabled", "true");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://receiver.paplilabs.com/receiver/userAvailableApis/?API_KEY=" +
        token,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((error) => console.log("error", error));
  };
  // const menu = (

  // );
  const assembleMenu = (disabled, token) => {
    return (
      <Menu>
        <Menu.Item>Edit API key</Menu.Item>
        <Menu.Item onClick={() => handleDelete(token)}>
          Delete API key
        </Menu.Item>
        <Menu.Item onClick={() => disableEnableKey(disabled, token)}>
          {disabled ? "Enable API key" : "Disable API key"}
        </Menu.Item>
      </Menu>
    );
  };

  const copyToClipboard = (copyText) => {
    copy(copyText);
    // alert(`You have copied "${copyText}"`);
    success(copyText);
  };
  const showModal = (val) => {
    setValue(val);
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const getData = () => {
    var myHeaders = new Headers();
    setLoading(true);
    myHeaders.append("Authorization", "Bearer " + user.access);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://receiver.paplilabs.com/receiver/userAvailableApis/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        // if(result.data.length!==0){
        //   result.data.map(()=>{

        //   })
        // }
        setData(result.data);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, []);

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 992) {
      setScroll({
        x: "calc(100vw)",
      });
    }
  }, [window.innerWidth]);
  const columns = [
    {
      title: "Name",
      dataIndex: "api",
      key: "name",
      width: "2.5",
    },
    {
      title: "Creation date",
      dataIndex: "created_date",
      key: "acreationDatege",
      width: "2.5",
      render: (_, { token, name, isEnabled, created_date }) => (
        <ButtonComponent>
          {created_date.split("T")[1].split(".")[0]}{" "}
          {created_date.split("T")[0]}
        </ButtonComponent>
      ),
    },
    {
      title: "Restrictions",
      dataIndex: "restrictions",
      key: "restrictions",
      width: "2.5",
    },
    {
      title: "Actions",
      key: "apiKey",
      dataIndex: "apiKey",
      align: "right",
      width: 1,
      render: (_, { token, name, isEnabled }) => (
        <ButtonComponent>
          <>
            <ShowButton type="text" onClick={() => showModal(token)}>
              <Span>Show Key</Span>
            </ShowButton>
            {/* <ShowButton type="text"> */}
            <Dropdown
              placement="bottomRight"
              overlay={() => assembleMenu(isEnabled, token)}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DotImage src="/images/dot.svg" />
                  {/* Click me */}
                  {/* <DownOutlined /> */}
                </Space>
              </a>
            </Dropdown>
            {/* </ShowButton> */}
          </>
        </ButtonComponent>
      ),
    },
  ];
  // const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
  return (
    <>
      <CustomizedTable
        className="credentialTable"
        columns={columns}
        scroll={scroll}
        dataSource={data}
        locale={{
          emptyText: loading ? (
            <div>
              {[1, 2, 3].map((u) => (
                <Skeleton.Input
                  height={50}
                  style={{ marginTop: "10px", width: "100%" }}
                  active={true}
                />
              ))}
            </div>
          ) : (
            <Empty />
          ),
        }}
      />
      <StyledModal
        footer={[
          <Button onClick={handleCancel} type="link">
            Close
          </Button>,
        ]}
        visible={visible}
        onCancel={handleCancel}
        cancelButtonProps={{
          display: "none",
        }}
      >
        <Title>Maps API Key</Title>
        <Parameter>
          Use this key in your application by passing it with the{" "}
          <Code>key=API_KEY</Code> parameter.
        </Parameter>
        <div class="centered">
          <label>
            <input value={value} type="text" class="textfield" required />
            <span class="placeholder">Your Api Key</span>
            <CopyImage
              onClick={() => copyToClipboard(value)}
              src="/images/copy.svg"
            />
          </label>
        </div>
        <Key>
          This key is unrestricted. To prevent unauthorized use, we recommend
          restricting where and for which APIs it can be used.{" "}
          <StyledLink>Edit Api</StyledLink> key to add restrictions.{" "}
          <StyledLink>Learn more</StyledLink>
        </Key>
      </StyledModal>
    </>
  );
};

export default CredentialTable;
