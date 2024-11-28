import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderComp from "./Header";
import axios from "axios";

const SharedFileView = (props) => {
  const { id } = useParams(); 
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL

  console.log(BASE_URL)

  useEffect(() => {
    // axios.get(`${BASE_URL}/api/files/share/${id}`).then((response) => setFileData(response.data)).catch (err => setError("File not found or server error"))  
  }, []);

  
  return (

<>
  <HeaderComp {...props} /> 
  <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-4">
  <h2 className="text-3xl font-bold mb-4">Shared Files</h2> 
{console.log("id",id)}
  {error && <div>
    <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 inline pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg> 
           {error}</span></div>}

    <div>
      {fileData ? (
        <div className="bg-slate-200 border-8 pb-1">
          <div></div>
          <img
            src={`${BASE_URL}${fileData.fileUrl.split('undefined')[1]}`}
            alt={fileData.filename}
            className="object-cover"
          />
          <div className="flex"> 
                <div className="flex text-indigo-700 mr-4 mt-4">
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
                  <span className="ml-2">{fileData.views}</span> 
                </div></div>
        </div>
      ) : (
        <p>{!error && <>Loading...</>}</p>
      )}
    </div>
   
    

    </div>
</>
  );
};

export default SharedFileView;
