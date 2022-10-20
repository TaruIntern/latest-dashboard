import { Select, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import QuatasRequestFirst from "../Graphs/QuatasRequestFirst";
import QuatasRequestSecond from "../Graphs/QuatasRequestSecond";
import Quotas from "../Tables/Quotas";

const { Option } = Select;
const Component = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
  padding: 0.8rem 1rem;
`;
const Title = styled(Typography.Title)`
  margin: 0 !important;
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.6rem !important;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
    margin: 1rem 0 !important;
  /* Character/Primary .85 */

  color: rgba(0, 0, 0, 0.85);
  margin-right: 8rem !important;
`;
const QuotasTitle = styled(Typography.Title)`
  color: #3e4355 !important;
  font-family: "SF Pro Display", sans-serif !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 0.9rem !important ;
  margin: 2rem 0;
`;
const HomeQuotasRequest = ({apiData}) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  const getWidth = () => {
    setWidth(ref.current.clientWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", getWidth);
    getWidth();
    return () => window.removeEventListener("resize", getWidth);
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Component ref={ref} className="home-quotas">
      <Title>Requests</Title>
      <Select
        defaultValue="default"
        style={{
          width: 220,
        }}
        onChange={handleChange}
        suffixIcon={<img src="/images/arrowDown.svg" />}
      >
        <Option value="default">Default</Option>
        <Option value="lucy">Lucy</Option>

        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <QuatasRequestFirst width={width} apiData={apiData} />
      {/* <QuotasTitle>
        Quota exceeded errors count (3hr) - Requests per day
      </QuotasTitle> */}
      {/* <QuatasRequestSecond width={width} apiData={apiData}/> */}
      <Quotas/>
    </Component>
  );
};

export default HomeQuotasRequest;
