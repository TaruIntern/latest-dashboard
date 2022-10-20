import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
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
const QuatasRequestSecond = ({ width, apiData,selectedApi }) => {
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
        apiData[selectedApi || 0].value
      }=&queryType=daily`,
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
    if (apiData.length !== 0) {
      getData();
    }
  }, [apiData]);

  return (
    <Component>
      <AreaChart
        width={width - 50}
        height={320}
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        label={<>"Hello"</>}
        r={1000}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3F68CFCC" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3F68CFCC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3F68CFCC" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis axisLine={false} />
        <CartesianGrid strokeDasharray={"1"} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="requestsFailed"
          sroke="#3F68CFCC"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
          label={"No"}
        />
      </AreaChart>
    </Component>
  );
};

export default QuatasRequestSecond;
