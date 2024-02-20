import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

  const role = localStorage.getItem("role");
  const Logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Fragment>
      {role && (
        <div
          className={`d-flex flex-column bg-dark text-white p-2  ${
            isSidebarOpen ? "expanded" : "collapsed"
          }`}
          style={{ minHeight: "87vh" }}
        >
          <div className="text-center mb-4" >
            {/* FontAwesome icon removed */}
          </div>

          <div >
            <ul className="nav flex-column text-start ">
              <li className="nav-item  ">
                <Link to='/home' className="nav-link active text-white">
                  Home
                </Link>
              </li>
              {(role === "Admin") && (
                <li className="nav-item">
                  <Link to='/user/create' className="nav-link active text-white">
                    Add Users
                  </Link>
                  <Link to='/admindashboard' className="nav-link active text-white">
                    Manage Users
                  </Link>
                </li>
              )}
              {(role === "Manager") && (
                <li className="nav-item">
                  <Link to='/managerusers' className="nav-link active text-white">
                    All Users
                  </Link>
                  <Link to='/managerrequests' className="nav-link active text-white">
                    Requests
                  </Link>
                </li>
              )}
              {(role === "Employee") && (
                <li className="nav-item">
                  <Link to='/requestform' className="nav-link active text-white">
                    Raise a request
                  </Link>
                  <Link to='previousrequests' className="nav-link active text-white">
                    Requests
                  </Link>
                </li>
              )}
              {(role === "HRAdmin") && (
                <li className="nav-item">
                  <Link to='approvedrequests' className="nav-link active text-white">
                    Approved Requests
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to='/' onClick={Logout} className="nav-link active text-white">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Sidebar;
