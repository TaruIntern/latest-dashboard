import React from "react";
import styled from "styled-components";
import HomeSideNav from "../../Navs/SideNavs/Home";
import FirstTable from "../Tables/FirstTable";
import FirstGraph from "../Graphs/FirstGraph";
import { useRef } from "react";
import { useEffect } from "react";
import { Alert, Select, Typography } from "antd";
import "./Home.css";
import CredentialTable from "../Tables/CredentialTable";
import ApiTable from "../Tables/ApiTable";
import AdditionalTable from "../Tables/AdditionalTable";
import MetricGraph from "../Graphs/MetricGraph";
import { useState } from "react";
import ApiMetric from "../Tables/ApiMetric";
import { apiList, storeApiList, user } from "../../../userConfig";

const Option = { Select };

const Component = styled.div`
  width: 100%;
  display: flex;
`;
const MainBody = styled.div`
  @media (min-width: 993px) {
    /* width: calc(100% - 256px); */
  }
  width: 100%;
  padding: 1rem 2.5rem;
  /* margin-top: 1rem; */
  @media (min-width: 993px) {
    height: calc(100vh - 55px);
  }
  height: calc(100vh - 50px);
  /* height: 100%; */
  margin-bottom: 5rem;
  overflow-y: scroll !important;
`;
const MainBodyInside = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;
const ApiComponent = styled.div`
  margin-bottom: 2rem;
`;
const ApiLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const Title = styled(Typography.Title)`
  margin: 0 !important;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.6rem !important;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;

  /* Character/Primary .85 */

  color: rgba(0, 0, 0, 0.85);
  margin-right: 8rem !important;
`;
const MessageDiv = styled.div`
  width: 100%;
  /* height: 50px !important; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MessageLeftText = styled.p`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.85);
  margin: 0;
  text-align: right;
`;
const MessageRightText = styled.h6`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0;
  color: #c3291c;
  text-align: left;
`;

const TitleSmall = styled(Title)`
  font-size: 1.2rem !important;
  margin-bottom: 1rem !important;
  margin-top: 2.4rem !important;
`;
const HomeMetric = () => {
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const ref = useRef();
  const getWidth = () => {
    setWidth(ref.current.clientWidth);
  };
  const extractData = (apis) => {
    let parseData = [];
    apis.map((api) => {
      parseData.push({
        label: api.api,
        value: api.token,
      });
    });
    setData(parseData);
    localStorage.setItem("apiList", JSON.stringify(parseData));
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
        extractData(result.data);
        // setData(result.data);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(apiList)
    if (!apiList && user) {
      getData();
    } else {
      setData(apiList);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    getWidth();
    return () => window.removeEventListener("resize", getWidth);
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const Message = (
    <MessageDiv>
      <MessageLeftText>You should secure your new API key</MessageLeftText>
      <MessageRightText>SECURE CREDENTIALS</MessageRightText>
    </MessageDiv>
  );

  return (
    <Component className="home-api">
      <HomeSideNav homeActiveKey={"3"} />
      <MainBody>
        <MainBodyInside ref={ref}>
          <ApiComponent>
            <ApiLine>
              <Title level={2}>Metrics</Title>
              <Select
                defaultValue="default"
                style={{
                  width: 220,
                  border: "none !important",
                  padding: "100px !important",
                }}
                onChange={handleChange}
                suffixIcon={<img src="/images/dropdown.svg" />}
              >
                <Option value="default">Default</Option>
                <Option value="lucy">Lucy</Option>

                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </ApiLine>
            <MetricGraph width={width} apiData={data} />
          </ApiComponent>
          <TitleSmall level={4}>APIs</TitleSmall>
          <ApiMetric />
        </MainBodyInside>
      </MainBody>
    </Component>
  );
};

export default HomeMetric;
