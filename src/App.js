import React,{useEffect, useState} from 'react'; 
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'; 
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from './Components/Login';
import FileUpload from './Components/FileUpload';
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';  
import SharedFileView from './Components/ShareFileView'; 
import NotFound from './Components/NotFound'
import NotAccess from './Components/NotAccess'
 

const App = () => {   
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  // console.log("=====>", process.env.REACT_APP_BASE_URL)
return (  
<Router>
<Routes>    
  <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
    <Route path="dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} /> 
    <Route path="upload" element={<FileUpload setIsAuthenticated={setIsAuthenticated} />} />
   
  </Route> 
{/* Public routes */}
<Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

<Route path="register" element={<Register />} /> 
<Route path="image/:id" element={localStorage.getItem('token') ? <SharedFileView  setIsAuthenticated={setIsAuthenticated} /> : <NotAccess />} />
<Route path="*" element={<NotFound setIsAuthenticated={setIsAuthenticated} />} />
</Routes>
</Router>  
  );
};

export default App;
 