import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Line,
  Legend,
  LineChart,
} from "recharts";
import styled from "styled-components";
import { user } from "../../../userConfig";

const Component = styled.div`
  /* width: 100%;
  padding: 0.5rem 1rem;
  background: #fcfcfc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14); */
  margin-top: 1.3rem;
`;
const QuatasRequestFirst = ({ width, apiData, seletedApi }) => {
  const [data, setData] = useState([]);
  const getData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.access);
    // var formdata = new FormData();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://receiver.paplilabs.com/receiver/userAvailableApis/?API_KEY=${
        apiData[seletedApi || 0].value
      }&queryType=daily`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // console.log("Hi");
    if (user && apiData && apiData.length !== 0) {
      getData();
    }
  }, [apiData]);

  return (
    <Component>
      <LineChart
        width={width - 50}
        height={320}
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        label={<>"Hello"</>}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="requests" stroke="#8884d8" />
        <Line type="monotone" dataKey="errors" stroke="#82ca9d" />
      </LineChart>
    </Component>
  );
};

export default QuatasRequestFirst;
