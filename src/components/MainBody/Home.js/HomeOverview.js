import React, { useState } from "react";
import styled from "styled-components";
import HomeSideNav from "../../Navs/SideNavs/Home";
import FirstTable from "../Tables/FirstTable";
import FirstGraph from "../Graphs/FirstGraph";
import { useRef } from "react";
import { useEffect } from "react";
import { Alert } from "antd";
import { user } from "../../../userConfig";
import ResourceTable from "../Tables/ResourcesTable";

const Component = styled.div`
  width: 100%;
  display: flex;
`;
const MainBody = styled.div`
  padding: 0 2.5rem;
  margin-top: 1.5rem;
  width: 100%;
  /* max-width: 1400px; */
  justify-content: center;
  @media (min-width: 993px) {
    /* width: calc(100% - 256px); */
  }
`;
const MainBodyInside = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2.25rem;
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

const CredentialAlert = styled(Alert)`
  background: #ffeae8;
  border: 1px solid #c3291c;
  border-radius: 2px;
  /* padding: 0; */
  padding: 0.7rem 1rem;
`;

const Title = styled.h2`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  margin: 0;
  color: black;
  text-align: left;
  margin-bottom: 3vh;
`

const ResourcesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
`

const ResourceCard = styled.div`
  border-width: 0.2rem;
  width: 10rem;
  border-image: linear-gradient(to bottom left, ${(props) => (props.fromColor)}, ${(props) => (props.toColor)});
  border-image-slice: 1;
  min-height: 14rem;
`

function getData(name) {
  if (name == "Potholes Country API") {
    return {
      fromColor: 'rgba(71, 73, 227, 1)',
      toColor: 'rgba(71, 73, 227, 0.25)',
      img: 'potholeVector.svg'
    }
  }
  if (name == "Barricade API") {
    return {
      fromColor: 'rgba(212, 15, 15, 1)',
      toColor: 'rgba(212, 15, 15, 0.25)',
      img: 'roadblockVector.svg'
    }
  }
  if (name == "Waterlogging API") {
    return {
      fromColor: 'rgba(28, 124, 166, 1)',
      toColor: 'rgba(28, 124, 166, 0.25)',
      img: 'terrainVector.svg'
    }
  }
  if (name == "Road Accident API") {
    return {
      fromColor: 'rgba(0, 0, 0, 1)',
      toColor: 'rgba(0, 0, 0, 0.25)',
      img: 'terrainVector.svg'
    }
  }
  if (name == "Abnormal Road") {
    return {
      fromColor: 'rgba(254, 191, 0, 1)',
      toColor: 'rgba(254, 191, 0, 1)',
      img: 'terrainVector.svg'
    }
  }
}

const HomeOverview = ({ homeActiveKey, setHomeActiveKey }) => {
  const ref = useRef();
  const [key, setKey] = useState("1");
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [resources, setResources] = useState([]);

  const [apiList, setApiList] = useState([
  ]);

  useEffect(() => {
    // setTimeout(() => {
    //   if (!localStorage.getItem("isReloaded")) {
    //     window.location.reload();
    //     localStorage.setItem("isReloaded", 1);
    //   }
    // }, 1000);

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NTc3Njk2LCJqdGkiOiIwZTFlOTg4OGYyYjc0NTY5OTMxMDI5M2RhMGYyNGFhZiIsInVzZXJfaWQiOiJoaXBwdUBnbWFpbC5jb20ifQ.0CurTAa9fvMQfbmCfg4-Oyo-6M-SLhHXwNrweBdmSn4"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://receiver.paplilabs.com/receiver/userAvailableApis/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setResources(result.data);
        // console.log(result.data)
        var apis = [];
        let data = result.data;
        for (let i = 0; i < data.length; i++) {
          let name = 'API' + i;
          let type = 'API';
          let requests = data[i].requests;
          let error = data[i].requestsFailed;
          let plan = "Pro Plan";
          let location = "New Delhi";
          let status = data[i].status == "DEL" ? 'Stopped' : 'Running'
          apis.push({ name, type, requests, error, plan, location, status })
        }
        setApiList(apis)

      }).catch((error) => { console.log(error) })

  }, []);

  const Message = (
    <MessageDiv>
      <MessageLeftText>You should secure your new API key</MessageLeftText>
      <MessageRightText>SECURE CREDENTIALS</MessageRightText>
    </MessageDiv>
  );

  return (
    <Component>
      <HomeSideNav
        homeActiveKey={"1"}
        setHomeActiveKey={setHomeActiveKey}
        key={key}
      />
      <MainBody ref={ref}>
        <MainBodyInside>
          {token == undefined && (
            <CredentialAlert message={Message} type="error" />
          )}
          {token && (
            <>
              <p className="text-2xl font-sf-medium mb-12">Welcome To Novae Avenue</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 mb-12">

                <div class="h-48 w-36 bg-gradient-to-bl from-yellow-400 to-yellow-200 rounded-md mr-5">
                  <div class="bg-white h-full w-full flex flex-col items-center text-center">
                    <img src="/images/Plus.svg" className="h-12 w-12" />
                    <p className="text-xl font-sf-regular">
                      Create a Resource
                    </p>
                  </div>
                </div>

                {resources.map((resource, idx) => {

                  const data = getData(resource.name);

                  return (
                    <div class="rounded-lg mr-12 mb-8 w-full">
                      <ResourceCard fromColor={data.fromColor} toColor={data.toColor}>
                        <div class="w-full flex flex-row justify-end pt-2 px-4"><p className="text-sm font-sf-regular">v1.1</p></div>
                        <div class="flex flex-row justify-start h-20 w-full px-3">
                          <div className='h-12 w-12 rounded-full flex justify-center items-center' style={{ backgroundColor: data.fromColor }}>
                            <img src={'/images/' + data.img} className="h-8 w-8" />
                          </div>
                        </div>
                        <div class="flex flex-row justify-start h-20 w-full px-4">
                          <p className="text-xl font-sf-medium">
                            {resource.name}
                          </p>
                        </div>
                      </ResourceCard>
                    </div>
                  )
                })}
              </div>

              <p className="text-2xl font-sf-medium mb-4">Resources</p>
              <div className="flex flex-row px-2">
                <p className="text-md font-sf-medium mr-4 border-b-2 border-b-[#3277CD]">Recents</p>
                <p className="text-md font-sf-regular mr-4">Favorite</p>
              </div>

              <ResourceTable home={true} apiList={apiList} />

            </>
          )}
        </MainBodyInside>
      </MainBody >
    </Component >
  );
};

export default HomeOverview;
