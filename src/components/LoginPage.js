import React, { useState } from "react";
import "./LoginPage.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onButtonClick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://localhost:44310/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if(response.ok){
        const result = await response.json();
        const decodedToken = jwtDecode(result.token);
        localStorage.setItem("token", result.token);
        const role= decodedToken.role;
        const userId=decodedToken.userId;
        const departmentName=decodedToken.departmentName;
        const departmentId=decodedToken.departmentId;
        const firstName=decodedToken.firstName;
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("departmentName", departmentName);
        localStorage.setItem("departmentId", departmentId);
        localStorage.setItem("firstName", firstName);
        navigate("/home");
        window.location.reload();

      }
      else if(!response.ok) {
        setMessage("Invalid username/password ");
      }       
    } catch (error) {
      console.error(error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form">
      <div id="mainContainer">
        <div className="heading">
          <h3>Login</h3>
        </div>
        <div className="blur-container">
          <div className="heading1">
            <input className ='email'type="text" id="email" placeholder="Enter Email" />
          </div>
          <div className="heading1 input-group">
             <input className="password " type={showPassword ? "text" : "password"} id="password"  placeholder="Enter Password" /> 
            <span className="input-group-text "onClick={togglePasswordVisibility}><FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
            </span> 
        </div>

          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Submit"}
          />
          <small className="text-danger">{message}</small>
          <div className="forgot-Password">
            {/* Include your forgot password link or message here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
