import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';  // For redirecting after login 
import HeaderComp from './HeaderNotLogged';

const NotFound = (props) => {
   

  return (
    <div>
<HeaderComp noprops={true}/>
<div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
 <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 inline pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg> 
 Page Not Found!</span></div>
 
    </div>
  );
};

export default NotFound;
