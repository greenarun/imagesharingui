import React, { useState, useEffect } from "react";
import axios from "axios"; 
import HeaderComp from "./Header";
 

const Dashboard = (props) => {
  const [data, setData] = useState(); 
 const BASE_URL = process.env.REACT_APP_BASE_URL
 const GET_PATH = window.location.href.replace(/dashboard/g, '')
 console.log(GET_PATH)

  useEffect(() => {
    let token = localStorage.getItem("token");
 
    axios
      .post(`${BASE_URL}/api/files/getfiles`, "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, [BASE_URL]);

  const handleCopyClick = (text) => {
    try {
      window.navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
   
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

 

  return (
    <>
      <HeaderComp {...props} />
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        {/* <p>Welcome to your dashboard!</p>  */}
        <ul>
          {data?.data?.length !== 0 &&
            data?.data?.files?.map((list) => (
              <li className="bg-slate-200 border-8 mb-4 pb-3" key={list._id}>
                 
                <img
                  src={`${BASE_URL}/${list.path}`}
                  alt={list.filename}
                  className="object-cover"
                />
                <div className="flex mt-4"> 
                <div className="flex text-indigo-700 mr-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </span>
                  <span>{list.views}</span> 
                </div>
                <div  className="flex  cursor-pointer text-indigo-700  mr-4">
                  <span onClick={() => handleCopyClick(`${GET_PATH}share/${list._id}`)}> 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </span>{" "} 
                   
                </div>
                <div  className="flex text-indigo-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                  {list.tags.map((li) => li)}
                </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
