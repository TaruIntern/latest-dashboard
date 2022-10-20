import { Button, Empty, Modal, Skeleton, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { user } from "../../../userConfig";
import "./CustomTable.css";

const CustomizedTable = styled(Table)`
  padding: 0 0rem;
  a {
    font-family: "SF Pro Display" !important;
    font-style: normal;
    font-weight: 600 !important;
    color: #446bd0 !important;
  }
`;

const Latency = styled.div`
  /* width: 50%; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const ApiSpan = styled.span`
  align-self: center;
  justify-self: center;
  margin-right: 20px;
`;
const DefaultSpan = styled.span`
  justify-self: flex-end;
  margin-left: 20px;
`;

const ApiTable = () => {
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const showModal = () => {
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
    // console.log("Clicked cancel button");
    setVisible(false);
  };
  const generateKey = (name) => {
    setLoading(true);
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + user.access);
    myHeaders.append("content-type", "application/json");

    // var formdata = new FormData();
    // formdata.append("name", name);
    const data = {
      name: name,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,

      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(
      "https://receiver.paplilabs.com/receiver/generateToken/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        getData();
      })
      .catch((error) => console.log("error", error));
  };
  const getData = () => {
    var myHeaders = new Headers();
    setTableLoading(true);
    myHeaders.append("Authorization", "Bearer " + user.access);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://receiver.paplilabs.com/receiver/availableApis/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result.data);
      })
      .catch((error) => {
        setTableLoading(false);
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (user) {
      getData();
    }
  }, []);

  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.innerWidth <= 992) {
      setScroll({
        x: "calc(100vw)",
      });
    }
  }, [window.innerWidth]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Requests",
      dataIndex: "requests",
      key: "requests",
      width: "25%",
      // responsive: ["sm"],
    },
    {
      title: "Errors",
      dataIndex: "errors",
      key: "errors",
      width: "25%",
    },
    {
      title: "Avg Latency (ms)",
      key: "latency",
      dataIndex: "latency",
      align: "left",
      width: "1",
      render: (_, { name, apiKey, enabled }) => (
        <Latency className="enable">
          <ApiSpan>{apiKey ? apiKey : "-"}</ApiSpan>
          {!enabled && (
            <Button
              loading={loading}
              type="link"
              className="enable-key"
              onClick={() => generateKey(name)}
            >
              Enable Key
            </Button>
          )}
          <DefaultSpan>Default</DefaultSpan>
        </Latency>
      ),
    },
  ];
  return (
    <>
      <CustomizedTable
        className="apiTable"
        rowClassName={(record, index) => {
          // console.log(record);
          return record.lenght !== 0 && record.enabled
            ? "table-row-light"
            : "table-row-dark";
        }}
        locale={{
          emptyText: tableLoading ? (
            [1, 2, 3, 4].map((u) => (
              <Skeleton.Input
                height={100}
                style={{ marginTop: "10px", width: "100%" }}
                active={true}
              />
            ))
          ) : (
            <Empty />
          ),
        }}
        columns={columns}
        scroll={scroll}
        dataSource={data}
      />
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default ApiTable;
