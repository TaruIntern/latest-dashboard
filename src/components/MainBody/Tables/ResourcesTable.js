import React, { useState } from "react";
import { useEffect } from "react";


const ResourcesTable = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token'));

    const [apiList, setApiList] = useState(props.apiList);
    const [selectedApis, setSelectedApis] = useState([]);

    const home = props.home;

    useEffect(() => {

        setApiList(props.apiList);
        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer " + token);

        // var requestOptions = {
        //     method: "GET",
        //     headers: myHeaders,
        //     redirect: "follow",
        // };

        // fetch("https://receiver.paplilabs.com/receiver/nearby/0.0,0.0/dis/5/?API_KEY=fZRqLQbZT-TlB6eG639f6Y1EiH3lSfbrPRMd3pAxE_c=", requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         setResources(result.data);
        //         console.log(result)
        //     }).catch((error) => { console.log(error) })

    }, [props]);


    return (
        <div>
            <div class="flex flex-col -ml-6">
                <div class="overflow-x-auto sm:-mx-8 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b border-t">
                                    <tr>
                                        {!home && (
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                                <div class="flex">
                                                    <input type="checkbox" class="mr-3 w-4" style={{}} checked={selectedApis.length == apiList.length ? true : false}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedApis([...apiList]);
                                                                props.updateSelectedApis([...apiList]);
                                                            } else {
                                                                setSelectedApis([]);
                                                                props.updateSelectedApis([]);
                                                            }
                                                        }}
                                                    />
                                                    Name
                                                </div>
                                            </th>
                                        )}
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Type
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Requests
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Error
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Plan
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Location
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                            Status
                                        </th>
                                        {!home && (
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sf-medium">
                                                Credentials
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>

                                    {apiList && apiList.length > 0 && apiList.map((api, idx) => {
                                        return (
                                            <>
                                                <tr class="border-b">
                                                    {!home && (
                                                        <td class="px-6 py-4 flex whitespace-nowrap text-sm font-medium text-gray-900">
                                                            <input type="checkbox" class="mr-3 h-4 w-4"
                                                                checked={selectedApis.includes(api) ? true : false}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedApis([...selectedApis, api]);
                                                                        props.updateSelectedApis([...selectedApis, api]);
                                                                    } else {
                                                                        setSelectedApis(selectedApis.filter(a => { return a != api }));
                                                                        props.updateSelectedApis(selectedApis.filter(a => { return a != api }));
                                                                    }
                                                                }}
                                                            />
                                                            {api.status == "Stopped" && (<img src="/images/serviceStopped.svg" class="mr-3" />)}
                                                            {api.status == "Running" && (<img src="/images/serviceRunning.svg" class="mr-3" />)}
                                                            {api.name}
                                                        </td>
                                                    )}
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.type}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.requests}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.error}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.plan}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.location}
                                                    </td>
                                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {api.status}
                                                    </td>
                                                    {!home && (
                                                        <td class="whitespace-nowrap cursor-pointer" onClick={() => props.showKey(api.token)}>
                                                            <div class="w-28 rounded-lg items-center flex flex-row justify-center gap-1" style={{ backgroundColor: '#E1E1E3', width: '6rem', height: '1.8rem' }}>
                                                                <img src="/images/key.svg" style={{ height: '1.125rem', width: '1.125rem' }} />
                                                                <p class="my-auto font-sf-medium" style={{ color: '#446BD0', fontSize: '0.75rem' }}>Show Key</p>
                                                            </div>
                                                        </td>
                                                    )}

                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ResourcesTable;
