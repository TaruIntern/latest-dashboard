import { Button, Empty, Modal, Skeleton, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { user } from "../../../userConfig";
import "./CustomTable.css";

const Component = styled.div`
  margin: 2rem 3rem;
  width: 40%;
`;
const CustomizedTable = styled(Table)`
  padding: 0 0rem;
`;

const Latency = styled.div`
  /* width: 50%; */
  display: flex;
  justify-content: flex-end;
`;
const ApiSpan = styled.span`
  align-self: center;
  justify-self: center;
`;
const DefaultSpan = styled.span`
  justify-self: flex-end;
  margin-left: 50px;
`;
const data = [
  {
    key: "1",
    quotaName: "Requests per day",
    limit: "Unlimited",
  },
  {
    key: "2",
    quotaName: "Requests per minute",
    limit: "3000",
  },
  {
    key: "3",
    quotaName: "Requests per minute per user",
    limit: "Unlimited",
  },
];

const Quotas = () => {
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedApi = "Potholes Country API";
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
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const extractTable = (data) => {
    // const
    // console.log(data);
    let extractedData = [];
    data.map((ele) => {
      if (ele.api === selectedApi) {
        extractedData.push({
          name: "Requests per Minute",
          limit: ele.maxQuotaOfRequestsPerMinute,
        });
        extractedData.push({
          name: "Requests per day",
          limit: ele.maxQuotaOfRequestsPerDay || "Unlimited",
        });
        extractedData.push({
          name: "Requests per minute per user",
          limit: ele.maxQuotaOfRequestsPerMinutePerUser || "Unlimited",
        });
      }
    });
    setData(extractedData);
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
        extractTable(result.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (user) {
      getData();
    }
    console.log(window.innerWidth);
    if (window.innerWidth <= 992) {
      setScroll({
        x: "calc(100vw)",
      });
    }
  }, [window.innerWidth]);
  const columns = [
    {
      title: "Quota Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
      width: "20%",
      // responsive: ["sm"],
    },
  ];
  return (
    <Component className="quotasApi">
      <CustomizedTable
        pagination={false}
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
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </Component>
  );
};

export default Quotas;
