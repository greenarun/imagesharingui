import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import HeaderComp from "./Header";

const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(''); 
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false); 
  const BASE_URL = process.env.REACT_APP_BASE_URL

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle tags input change
  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Check if file and tags are present
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    // Create FormData to send as multipart/form-data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags);

    // Get the JWT token from localStorage (assuming user is logged in)
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('No token found. Please log in first.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const response = await axios.post(`${BASE_URL}/api/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('File uploaded successfully!');
      console.log(response.data); // Log response from server
    } catch (err) {
      setMessage('Error uploading file.');
      console.error(err.response ? err.response.data : err.message);
    } finally {
      setUploading(false);
    }
  };



  // Handle file drop and file selection
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  // Set up react-dropzone with options
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Only accept image files
    onDrop,
    multiple: false, // Only accept one file
  });

  return (
    <>
  <HeaderComp {...props}/>  
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload an Image</h2>

    {message &&  <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>{message}</p>
</div>} 

      <form onSubmit={handleFileUpload}>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} type="file" onChange={handleFileChange} />
        <p className="text-gray-600">Drag and drop an image here, or click to select one</p>
      </div>

      {preview && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Image Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {file && (
        <div className="mt-4">
          <p className="text-gray-600">File name: {file.name}</p>
          <p className="text-gray-600">File size: {Math.round(file.size / 1024)} KB</p>
        </div>
      )}

      <div className="mt-4">
          <label>Tag this image:</label>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="@username"
          />
        </div>

        <div className=" mt-4">
          <button type="submit" disabled={uploading} className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer">
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
</form>


{/* <div>
      <h2>Upload a File</h2>
      <form onSubmit={handleFileUpload}>
        <div>
          <label>Select a file:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="e.g. nature, vacation"
          />
        </div>

        
      </form>

      {message && <p>{message}</p>}
    </div> */}
    
    </div>
    </>
  );
};

export default FileUpload;
