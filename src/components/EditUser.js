import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddUser.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain letters."
    )
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  address: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10 digit phone number")
    .required("Required"),
 
  roleId: Yup.number().required("Required"),
  departmentId:Yup.number().required("Required"),
  managerId:Yup.number().required("Required")
});
 
 
 
 
const EditUser = () => {
  var navigate=useNavigate();
  const {id} = useParams();
  const [roles, setRoles] = useState([]);
  const [departments,setDepartments]=useState([]);
  const [managers,setManagers]=useState([]);
  const[editUser,setEditUser]= useState({});
  useEffect(() => {
    axios.get(`https://localhost:44310/api/User/GetUser/${id}`,
    
    {  headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
    }}
    )
    .then(res => setEditUser(res.data))
    .catch(err => console.error(err));
    }, [id]);
 
    const initialValues = {
        firstName:editUser.firstName,
        lastName: editUser.lastName,
        address: editUser.address,
        mobileNumber: editUser.mobileNumber,
        roleId: editUser.roleId,
        departmentId:editUser.departmentId,
        managerId:parseInt(editUser.managerId),
        isActive:true,
        updatedBy: 1,
      };
 
 
 
    useEffect(() => {
    fetch("https://localhost:44310/api/User/GetAllRoles")
      .then(async (response) =>
      {
        var roles1= await response.json();
        console.log(roles1);
        setRoles(roles1);
      })
      .then((data) => console.log("data"))
      .catch((error) => console.error(error));
 
 
     
 
      fetch("https://localhost:44310/api/User/GetDepartmentNames")
  .then(async (response) =>
  {
    var departments1= await response.json();
    console.log(departments1);
    setDepartments(departments1);
  })
  .then((data) => console.log("data"))
  .catch((error) => console.error(error))
 
  fetch("https://localhost:44310/api/User/GetAllManagers")
  .then(async (response) =>
  {
    var managers1= await response.json();
    console.log(managers1);
    setManagers(managers1);
  })
  .then((data) => console.log("data"))
  .catch((error) => console.error(error))
 
}, []);
 
 
 
 
const handleSubmit = async (values) => {
  values.roleId=parseInt(values.roleId);
  values.departmentId=parseInt(values.departmentId);
  values.managerId=parseInt(values.managerId);
  //console.log(JSON.stringify(editUser));
  //alert(JSON.stringify(values));
  const response = await fetch('https://localhost:44310/api/User/EditUser/' + id, {
                 
    
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                      'Content-Type': 'application/json',
                  },
                  method: 'PUT',
                  body: JSON.stringify(editUser)
 
            });
            navigate("/admindashboard");
  };
const cancel=()=>{
  navigate("/admindashboard");
}
const handleCustomChange = e => {
   
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
 
if(editUser!=null){
  console.log(managers)
    return (
        <>
          <div className="container mt-5 d-flex justify-content-center bg-light formc" style={{border:"1px solid black",width:"400px",height:"400px"}}>
            <div className="width1">
              <h1 className="mb-4 py-2 text-center">Edit User</h1>
              <Formik
                // initialValues={{...initialValues,...editUser}}
                initialValues={editUser || initialValues}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ errors, touched, handleChange,   handleBlur,
              setFieldValue, values }) => (
                  <Form>
                    <tr>
                    <td className="col-6">
                    <div className="form-group m-2">
                      
                       
                      <label>First Name </label>
                      <Field
                        className={`form-control m-1 ${
                          touched.firstName && errors.firstName ? "is-invalid" : ""
                        }`}
                        name="firstName"
                        type="text"
                        value={values?.firstName}
                        onChange={(newValue)=>{
                          handleCustomChange(newValue)
                        }}
                      />
   
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    </td>
                    <td className="col-6 ">
   
                    <div className="form-group">
                      <label>Last Name</label>
                      <Field
                        className={`form-control m-1 ${
                          touched.lastName && errors.lastName ? "is-invalid" : ""
                        }`}
                        name="lastName"
                        type="text"
                        value={values?.lastName}
                        onChange={(newValue)=>{
                          handleCustomChange(newValue)
                        }}
                      />
   
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    </td>
                    </tr>
                    <tr>
                      <td className="col-6">
   
                    <div className="form-group m-2">
                      <label>Address </label>
                      <Field
                        className={`form-control m-1 ${
                          touched.address && errors.address ? "is-invalid" : ""
                        }`}
                        name="address"
                        type="text"
                        value={values?.address}
                        onChange={(newValue)=>{
                          handleCustomChange(newValue)
                        }}
                      />
   
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    </td>
                    <td className="col-6">
   
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <Field
                        className={`form-control m-1 ${
                          touched.mobileNumber && errors.mobileNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        name="mobileNumber"
                        type="text"
                        value={values?.mobileNumber}
                        onChange={(newValue)=>{
                          handleCustomChange(newValue)
                        }}
                      />
   
                      <ErrorMessage
                        name="mobileNumber"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    </td>
                    </tr>
                    <div className="form-group">
                   
                    </div>
   
                   
                   <div className="row">
                    <div className="col-4">
                   
                    <div className="form-group">
                      <label>
                        Role
                        <Field
                          className={`form-control m-1 ${
                            touched.roleId && errors.roleId ? "is-invalid" : ""
                          }`}
                          name="roleId"
                          as="select"
                          value={values?.roleId}
                          onChange={(newValue)=>{
                            handleCustomChange(newValue)
                          }}
                        >
                          <option value="">Select a role</option>
                          {
                            roles.map((role)=>(
                              <option value={role.roleId}>{role.roleName}</option>
   
                            ))
                          }
                         
                       
                         
                        </Field>
                        <ErrorMessage
                          name="roleId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </label>
                    </div>
                    </div>
                    <div className="col-4">
                    <div className="form-group">
                      <label>
                        Department
                        <Field
                          className={`form-control m-1 ${
                            touched.departmentId && errors.departmentId ? "is-invalid" : ""
                          }`}
                          name="departmentId"
                          as="select"
                          value={values.departmentId}
                          onChange={(newValue)=>{
                            handleCustomChange(newValue)
                          }}
                        >
                          <option value="">Select a department</option>
                          {
                            departments.map((department)=>(
                              <option value={department.departmentId}>{department.departmentName}</option>
   
                            ))
                          }
                         
                       
                         
                        </Field>
                        <ErrorMessage
                          name="departmentId"
                          component="div"
                          className="invalid-feedback"
                        />
                        </label>
                        </div>
                        </div>
                        <div className="col-4">
                        <div className="form-group">
                       
                       
                      <label>
                        Manager
                        <Field
                          className={`form-control m-1 ${
                            touched.managerId && errors.managerId ? "is-invalid" : ""
                          }`}
                          name="managerId"
                          as="select"
                          value={values.managerId}
                          onChange={(newValue)=>{
                            handleCustomChange(newValue)
                          }}
                        >
                          <option value="">Select manager</option>
                          {
                            managers.map((manager)=>(
                              <option value={manager.userId}>{manager.firstName} {manager.lastName}</option>
   
                            ))
                          }
                         
                       
                         
                        </Field>
                        <ErrorMessage
                          name="managerId"
                          component="div"
                          className="invalid-feedback"
                        />
                        </label>
                        </div>
                        </div>
                        </div>
   
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-dark mt-3 text-center"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mt-3 text-center"
                        onClick={cancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      );
}
 
};
 
export default EditUser;