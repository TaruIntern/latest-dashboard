import { Typography } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { data } from "../../Data/Data";
import { useNavigate } from "react-router-dom";

const Component = styled.div``;
const Ul = styled.ul`
  padding: 1rem 1rem;
  list-style-type: none;
  /* border: 1px solid ; */
`;
const Title = styled(Typography.Title)``;
const Desc = styled(Typography.Paragraph)``;
const Li = styled.li`
  /* height: ; */
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: 200ms ease-in;
  &:hover {
    background-color: blue;
    ${Title} {
      color: white !important;
    }
    ${Desc}{
      color: white !important;
    }
  }
`;
const SearchData = (props) => {
  const navigation = useNavigate();
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(
      data.filter((el) => {
        if (props.input === "") {
          return el;
        } else {
          return (
            el.title.toLowerCase().includes(props.input) ||
            el.desc.toLowerCase().includes(props.input)
          );
        }
      })
    );
  }, [props]);
  // console.log(props.input);
  return (
    <Ul>
      {filteredData.map((item) => (
        // <Link to={item.link}>
        <Li key={item.id} onClick={() => navigation('payment')}>
          <Title level={5}>{item.title}</Title>
          <Desc>{item.desc}</Desc>
        </Li>
        // </Link>
      ))}
    </Ul>
  );
};

export default SearchData;
