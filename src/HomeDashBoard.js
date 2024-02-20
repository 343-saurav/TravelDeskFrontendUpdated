import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeDashBoard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import pic from "./D.png";

const HomeDashBoard = () => {
  const navigate = useNavigate();
  // const Logout = () => {
  //   localStorage.removeItem("role");
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");
  return (
    <>
     {
                role  && (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark text-white"
        style={{
          paddingLeft: "10px",
          backgroundColor: "#B45A5A",
          height: "auto",
        }}
      >
        <Link className="navbar-brand">
          <img
            src={pic}
            alt="Logo"
            className="navbar-logo "
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "1.5px solid #B45A5A",
            }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* {role === "Admin" ? (
                        <li className="nav-item active">
                          <Link
                            to="/admin"
                            className="nav-link hover-effect cursor-pointer"
                          >
                            Admin{" "}
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                      {role === "Employee" ? (
                        <li className="nav-item active">
                          <a className="nav-link hover-effect cursor-pointer">
                            Employee{" "}
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {role === "Manager" ? (
                        <li className="nav-item active">
                          <Link
                            to="/manager"
                            className="nav-link hover-effect cursor-pointer"
                          >
                            Manager{" "}
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
          
                      {role === "HRAdmin" ? (
                        <li className="nav-item active">
                          <a className="nav-link hover-effect cursor-pointer">
                            Hr-Admin{" "}
                          </a>
                        </li>
                      ) : (
                        <></>
                      )} */}
          </ul>

          {/* <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={Logout}
              type="submit"
            >
              Logout
            </button>
          </form> */}
        </div>

        <small className="user-info m-3 text-light  ">Hi {firstName}, you have logged in as {role}</small>
      </nav>
                )
                    }
    </>
  );
};

export default HomeDashBoard;
