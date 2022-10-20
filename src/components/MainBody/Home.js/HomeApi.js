import React from "react";
import styled from "styled-components";
import HomeSideNav from "../../Navs/SideNavs/Home";
import { useRef } from "react";
import { useEffect, useState } from "react";
import ResourceTable from "../Tables/ResourcesTable";
import Modal from 'react-modal';


import { AiOutlineClose } from 'react-icons/ai';
import { VscDebugStart, VscRefresh } from 'react-icons/vsc';
import { BiRectangle, BiPlus } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PlusOutlined, ReloadOutlined, PlayCircleOutlined, StopOutlined, DeleteOutlined } from "@ant-design/icons";

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
    height: calc(100vh - 60px);
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: '20.188rem',
    width: '35rem',
    transform: 'translate(-50%, -50%)',
    paddingLeft: '2rem',
    paddingRight: '2rem'
  },
}


const HomeApi = ({ homeActiveKey, setHomeActiveKey }) => {
  const ref = useRef();

  const [apiList, setApiList] = useState([
  ]);

  const [selectedApis, setSelectedApis] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState();

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
        console.log(result.data)
        var apis = [];
        let data = result.data;
        for (let i = 0; i < data.length; i++) {
          let name = 'API ' + i;
          let type = 'API';
          let requests = data[i].requests;
          let error = data[i].requestsFailed;
          let plan = "Pro Plan";
          let location = "New Delhi";
          let status = data[i].status == "DEL" ? 'Stopped' : 'Running'
          let token = data[i].token;
          apis.push({ name, type, requests, error, plan, location, status, token })
        }
        setApiList(apis)

      }).catch((error) => { console.log(error) })

  }, []);


  return (
    <Component className="home-api">
      <HomeSideNav
        homeActiveKey={"2"}
        setHomeActiveKey={setHomeActiveKey}
        activeKey={"2"}
      />
      <MainBody ref={ref}>
        <MainBodyInside>
          <div class="flex flex-row gap-4" style={{ marginTop: '2.938rem' }}>
            <p class="text-xl font-sf-regular text-gray-500 my-auto">Overview</p>
            <img src="/images/Right.svg" class="my-auto" />
            <p class="text-xl font-sf-bold my-auto">Road Condition API</p>
          </div>
          <div>
            <p class="text-2xl font-sf-medium" style={{ marginTop: '1.875rem' }}>Road Condition API</p>
          </div>
          <div class="md:flex md:flex-row md:gap-8 cursor-pointer" style={{ marginTop: '1rem' }}>
            <div class="mb-2 md:mb-0 flex flex-row gap-2 items-center">
              <BiPlus style={{ color: '#446BD0' }} class="h-5 w-5" />
              <p class="font-sf-regular text-sm my-auto">Create</p>
            </div>
            <div class="mb-4 md:mb-0 flex flex-row gap-2 items-center">
              <VscRefresh style={{ color: '#446BD0' }} class="h-5 w-5" />
              <p class="font-sf-regular text-sm my-auto">Refresh</p>
            </div>
            <div class="flex flex-row gap-8" style={selectedApis.length == 0 ? { opacity: 0.3, cursor: 'default' } : { cursor: 'pointer' }}>
              <div class="flex flex-row gap-2 items-center border-l-2" style={{ paddingLeft: '1.625rem' }}>
                <VscDebugStart style={{ color: '#446BD0' }} class="h-5 w-5" />
                <p class="font-sf-regular text-sm my-auto">Start</p>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <BiRectangle style={{ color: '#446BD0' }} class="h-5 w-5" />
                <p class="font-sf-regular text-sm my-auto">Stop</p>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <RiDeleteBin6Line style={{ color: '#446BD0' }} class="h-5 w-5" />
                <p class="font-sf-regular text-sm my-auto">Delete</p>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <p class="font-sf-regular text-sm my-auto">Disable</p>
              </div>
            </div>
          </div>
          <ResourceTable
            apiList={apiList}
            updateSelectedApis={apis => { setSelectedApis(apis); }}
            showKey={(key) => {
              setModalVisible(true);
              setApiKey(key)
            }}
          />
        </MainBodyInside>
      </MainBody>

      <Modal
        isOpen={modalVisible}
        contentLabel="Minimal Modal Example"
        style={customStyles}
      >
        <div class="flex justify-between">
          <p style={{ marginTop: '1.2rem', fontSize: '1.25rem', fontFamily: 'sf-regular' }}>API 1 Key</p>
          <AiOutlineClose class="h-5 w-5 cursor-pointer" onClick={() => setModalVisible(false)} />
        </div>

        <div>
          <p style={{ fontSize: '0.875rem', fontFamily: 'sf-regular' }}>Use this key in your application by passing it with the <span style={{ backgroundColor: '#F6F6F6', paddingLeft: '6px', paddingRight: '6px', paddingTop: '2px', paddingBottom: '2px' }}>key=API-KEY</span> parameter</p>
        </div>

        <div>
          <p style={{ fontSize: '0.75rem', fontFamily: 'sf-regular', paddingLeft: '0.5rem', marginBottom: '-0.0.5rem' }}>Your API key</p>
          <div style={{ position: 'relative' }}>
            <textarea
              value={apiKey}
              style={{ width: '100%', fontSize: '0.813rem', fontFamily: 'sf-regular', color: '#3D4255', borderBottom: '1px solid #81868A', height: '1.5rem', paddingLeft: '0.5rem' }}
              contentEditable={false}
            />
            <img src="/images/copypaste.svg" style={{ position: 'absolute', top: 0, right: '2rem', cursor: 'pointer' }} class="hover:bg-sky-200" onClick={() => {
              navigator.clipboard.writeText(apiKey)
            }} />
          </div>

          <p style={{ fontFamily: 'sf-regular', fontSize: '0.813rem', lineHeight: '18px', color: '#636363', marginTop: '0.875rem' }}>This key is unrestricted. To prevent unauthorized use, we recommend restricting where and for which APIs it can be used. Edit API key to add restrictions.Learn more</p>

        </div>

      </Modal>
    </Component >
  );
};

export default HomeApi;
