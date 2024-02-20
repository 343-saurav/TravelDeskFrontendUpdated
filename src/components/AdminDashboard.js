import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const AdminDashboard = ()=>{
  const role1 =localStorage.getItem("role");
  const [currentPage,setcurrentPage]=useState(1);
  const [userData, setUserData] = useState(null);
  const recordsPerPage = 4;
  const lastIndex= currentPage*recordsPerPage;
  const firstIndex= lastIndex-recordsPerPage;
      const navigate = useNavigate();
 
 
      const prePage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    };
 
    const changeCPage = (e) => {
        setcurrentPage(Number(e.target.textContent));
    };
 
    const nextPage = () => {
        if (currentPage < Math.ceil(userData.length / recordsPerPage)) {
            setcurrentPage(currentPage + 1);
        }
    };
    const LoadDetail=(id) => {
    navigate("/user/display/"+id);
    }
    const LoadEdit=(id) => {
        navigate("/user/edit/"+id);
    }
    const Remove=(id) => {
        if(window.confirm("Do you really want to remove ?")){
            fetch("https://localhost:44310/api/User/DeleteUser/" +id, {
                
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`},
                method: "DELETE"
               }).then((res) => {
                alert("Removed Successfully");
                window.location.reload();
         }).catch((err) => {
            console.log(err.message);
         })
        
    
      
    }}
    
   
 
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://localhost:44310/api/User/AllUsersToDisplay',{
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
        }}
        );
        const data = await response.json();
        setUserData(data);
         
       
      }
       fetchData();
       console.log(userData);
      //  setRecords(userData.slice(firstIndex,lastIndex));
      //  setNpage(Math.ceil(userData.length / records.length));
      //  SetNumbers([...Array(npage+1).keys()].slice(1));
    }, []);
  
  return (
    role1==='Admin'?
    <>
      <div className="container mt-4 w-75 h-50">
        <div>
          <div>
            <h2 className="text-center">Employees</h2>
          </div>
          <div className="card-body w-100">
            {/* <div>
            <Link to='/user/create'className="btn btn-success"> ADD New (+)</Link>
            </div> */}
            <table className="table table-bordered table-striped">
              <thead className="bg-dark text-white">
                <tr>
                  <td>UserId</td>
                  <td>FirstName</td>
                  <td>LastName</td>
                  <td>RoleName</td>
                  <td>ManagerName</td>
                  <td>DepartmentName</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                   {
                  userData &&
                  userData.slice(firstIndex, lastIndex).map(user => (
                      <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.roleName}</td>
                        <td>{user.managerName}</td>
                        <td>{user.departmentName}</td>
                        <td> <a onClick={()=>{LoadEdit(user.userId)}}  className="btn btn-success">Edit</a>
                        <a onClick={()=>{LoadDetail(user.userId)}} className="btn btn-primary">Details</a>
                        <a  onClick={()=>{Remove(user.userId)}} className="btn btn-danger">Delete</a>
                        </td>
                         
       
                      </tr>
                    ))
                   }
 
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
            <nav>
            <ul className='pagination'>
                            <li className='page-item'>
                                <a href="#" className='page-link' onClick={prePage}> Prev</a>
                            </li>
                            {userData && Array.from({ length: Math.ceil(userData.length / recordsPerPage) }).map((_, i) => (
                                <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                    <a href="#" className='page-link' onClick={changeCPage}>{i + 1}</a>
                                </li>
                            ))}
                             <li className='page-item'>
                                <a href="#" className='page-link' onClick={nextPage}> Next</a>
                            </li>
                        </ul>
             
            </nav>
            </div>
          </div>
        </div>
      </div>
    </>
    :
    <h3>You are not Authorized User</h3>
  );
};
 
export default AdminDashboard;