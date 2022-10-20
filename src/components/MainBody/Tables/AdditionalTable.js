import { Button, Modal, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import './CustomTable.css'

const CustomizedTable = styled(Table)`
    padding: 0 0rem;
`;

const Latency=styled.div`
  /* width: 50%; */
  display: flex;
  justify-content: flex-end;
  
`
const ApiSpan=styled.span`
  align-self: center;
  justify-self: center;
  `
const DefaultSpan=styled.span`
justify-self: flex-end;
margin-left: 50px;
`
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

const AdditionalTable = () => {
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
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
      dataIndex: "name",
      key: "name",
      width:"25%"
    },
    {
      title: "Requests",
      dataIndex: "requests",
      key: "requests",
      width:"25%"
      // responsive: ["sm"],
    },
    {
      title: "Errors",
      dataIndex: "errors",
      key: "errors",
      width:"25%"
    },
    {
      title: "Avg Latency (ms)",
      key: "latency",
      dataIndex: "latency",
      align:"center",
      width: "1",
      render: (_, { apiKey }) => (
        <Latency>
         <ApiSpan>
          {apiKey?apiKey:'-'} 
          </ApiSpan> 
         <DefaultSpan>
          Default
          </DefaultSpan> 
        </Latency>
      ),
    },
  ];
  return (
    <>
      <CustomizedTable columns={columns} scroll={scroll} dataSource={data} />
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

export default AdditionalTable;
