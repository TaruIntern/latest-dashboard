import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
const columns = [
    {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    // minWidth:"1000px"
    // responsive: ["sm"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    // responsive: ["sm"],
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    // responsive: ["sm"],
  },
  {
    title: "Tags",
    key: "tags",
    responsive: ["sm"],
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";

          if (tag === "loser") {
            color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    responsive: ["sm"],
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const FirstTable = () => {
  const [scroll, setScroll] = useState({});
  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 992) {
      setScroll({
        x: "calc(100vw)",
      });
    }
  }, [window.innerWidth]);

  return <Table columns={columns} scroll={scroll} dataSource={data} />;
};

export default FirstTable;
