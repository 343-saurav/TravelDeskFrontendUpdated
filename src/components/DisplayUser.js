import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const DisplayUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [userData1, setUserData1] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44310/api/User/GetUser/" + id,
    {headers:{ "Authorization": `Bearer ${localStorage.getItem('token')}`
  }})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserData(res);
        console.log(res);
        //console.log(userData);
      })
      .catch((err) => {
        console.error(err.message);
      });

    fetch("https://localhost:44310/api/User/UserDetails/" + id,
    {headers:{ "Authorization": `Bearer ${localStorage.getItem('token')}`}})
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setUserData1(res);
        //console.log(userData1)
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const Back = () => {
    navigate("/admindashboard");
  };

  if (userData != null && userData1[0] != null) {
    return (
      <>
        {
          <>
            <div className="container mt-4 details_wrapper w-50">
              <div className="card">
                {/* <div className="card-header bg-primary text-white">
                  <h2 className="text-center">User Details</h2>
                </div> */}
                <div className="card-body">
                  {/* {userData && ( */}
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>Id:</td>
                        <td>{userData.userId}</td>
                      </tr>
                      <tr>
                        <td>First Name:</td>
                        <td>{userData.firstName}</td>
                      </tr>
                      <tr>
                        <td>Last Name:</td>
                        <td>{userData.lastName}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{userData.address}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number:</td>
                        <td>{userData.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{userData.email}</td>
                      </tr>
                      <tr>
                        <td>Role:</td>
                        <td>{userData1[0].roleName}</td>
                      </tr>
                      <tr>
                        <td>Department:</td>
                        <td>{userData1[0].departmentName}</td>
                      </tr>
                      <tr>
                        <td>Manager:</td>
                        <td>{userData1[0].managerName}</td>
                      </tr>
                     
                    </tbody>
                  </table>
                 
              </div>
            </div>
            <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={Back}
                    >
                      Back
                    </button>
                 
                 
                  {/* <div className="clearfix"></div> */}
                </div>
            </div>
            </>
            
           
          
        
        }
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default DisplayUser;
