import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DisplayUser from "./components/DisplayUser";
import LoginPage from "./components/LoginPage";
import Manager from "./components/ManagerUsers";
import HomeDashBoard from "./HomeDashBoard";
// import { jwtDecode } from "jwt-decode";
import { useState,useEffect } from "react";
import RequestForm from "./components/RequestForm";
import Sidebar from "./Sidebar";
import Home from "./components/Home";
import PreviousRequests from "./components/PreviousRequests";
import ManagerRequests from "./components/ManagerRequests";
import ManagerUsers from "./components/ManagerUsers";
import ApprovedRequests from "./components/ApprovedRequests";

const Header = ({ svtokn }) => {
  return svtokn ? <Sidebar /> : null;
};

function App() {
  const [svtokn, seSvtokn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("role");
    seSvtokn(token || null);
  }, [svtokn]);
  return (
    <>
 <BrowserRouter>
 <HomeDashBoard/>
<div className="App" style={{display:'flex'}}>
  <Header svtokn={svtokn} />
 
  <Routes>
  
    <Route path="/" element={<LoginPage/>}/>
    
    {/* <Route path="/home" element={<HomeDashBoard />}/> */}
    <Route path="/home" element={<Home/>} /> 
    {/* Admin */}
    <Route path="/admindashboard" element={<AdminDashboard/>} />
    <Route path="/user/create" element={<AddUser/>} />
    <Route path="/user/edit/:id" element={<EditUser/>} />
    <Route path="/user/display/:id" element={<DisplayUser/>} />
    {/* Manager */}
    <Route path="/managerusers" element={<ManagerUsers/>} />
    <Route path="/managerrequests" element={<ManagerRequests/>} />
    {/* Employee */}
    <Route path="/requestform" element={<RequestForm/>} />
    <Route path="/previousrequests" element={<PreviousRequests/>} />
    {/* HRAdmin */}
    <Route path="/approvedrequests" element={<ApprovedRequests/>} />
    
    
  </Routes>
 
</div>
</BrowserRouter> 

    


    </>
  );
}
 
 
export default App;