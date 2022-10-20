import { Button, Empty, Modal, Skeleton, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { user } from "../../../userConfig";
import "./CustomTable.css";

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
    name: "Maps API Key",

    creationDate: "Aug 4, 2022",
    restrictions: "None",
    apiKey: "",
  },
  {
    key: "2",
    name: "Maps API Key",

    creationDate: "Aug 4, 2022",
    restrictions: "None",
    apiKey: "",
  },
  {
    key: "3",
    name: "Maps API Key",

    creationDate: "Aug 4, 2022",
    restrictions: "None",
    apiKey: "",
  },
];

const ApiMetric = () => {
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
      width: "20%",
    },
    {
      title: "Requests",
      dataIndex: "requests",
      key: "requests",
      width: "20%",
      // responsive: ["sm"],
    },
    {
      title: "Errors",
      dataIndex: "errors",
      key: "errors",
      width: "20%",
    },
    {
      title: "Avg Latency (ms)",
      key: "latency",
      dataIndex: "avgLatencyMs",
      align: "center",
      width: "20%",
    },
    {
      title: "99% latency (ms)",
      key: "latency99",
      dataIndex: "latency99",
      align: "center",
      width: "1",
      render: (_, { apiKey }) => (
        <Latency>
          <ApiSpan>{apiKey ? apiKey : "-"}</ApiSpan>
          {/* <DefaultSpan>
          Default
          </DefaultSpan>  */}
        </Latency>
      ),
    },
  ];
  return (
    <div className="apiMetric">
      <CustomizedTable
        // className="apiMetric"
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
    </div>
  );
};

export default ApiMetric;
