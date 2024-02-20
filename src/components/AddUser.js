import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character."
    )
    .min(8)
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  roleId: Yup.number().required("Required"),
  departmentId:Yup.number().required("Required"),
  managerId:Yup.number().required("Required")
});

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  mobileNumber: "",
  password: "",
  email: "",
  roleId: "",
  departmentId:"",
  managerId:"",
  isActive: true,
  createdBy: "",
};


const Add = () => {
  var navigate=useNavigate();
  const [roles, setRoles] = useState([]);
  const [departments,setDepartments]=useState([]);
  const [managers,setManagers]=useState([]);
  const userId = localStorage.getItem("userId");
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
  },[]);
 
useEffect(()=>{
  fetch("https://localhost:44310/api/User/GetDepartmentNames")
  .then(async (response) => 
  {
    var departments1= await response.json();
    console.log(departments1);
    setDepartments(departments1);
  })
  .then((data) => console.log("data"))
  .catch((error) => console.error(error))


},[]);
useEffect(()=>{
  fetch("https://localhost:44310/api/User/GetAllManagers")
  .then(async (response) => 
  {
    var managers1= await response.json();
    console.log(managers1);
    setManagers(managers1);
  })
  .then((data) => console.log("data"))
  .catch((error) => console.error(error))
},[]);
const handleSubmit = async (values) => {
  values.createdBy=userId;
  values.roleId=parseInt(values.roleId);
  values.departmentId=parseInt(values.departmentId);
  values.managerId=parseInt(values.managerId);
  console.log(JSON.stringify(values));
  try {
    const response = await axios.post(
      "https://localhost:44310/api/User/AddUser",

      values,
      {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`
      }});
      
    
   navigate("/admindashboard");
    alert(response.data);
  } catch (error) {
    console.error(error);
  }
  
};
const cancel=()=>{
  navigate("/admindashboard");
}


  return (
    <>
       
      <div className="container bg-light containerborder mt-5 h-50 d-flex justify-content-center  ">
        <div>
          <h3 className=" text-center mt-2">Add User</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="row">
                <div className="col-6">
                
                <div className="form-group">
                  <label>First Name </label>
                  <Field
                    className={`form-control m-1 ${
                      touched.firstName && errors.firstName ? "is-invalid" : ""
                    }`}
                    name="firstName"
                    type="text"
                  />

                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <Field
                    className={`form-control m-1 ${
                      touched.lastName && errors.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    type="text"
                  />

                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-6">
                <div className="form-group">
                  <label>Address </label>
                  <Field
                    className={`form-control m-1 ${
                      touched.address && errors.address ? "is-invalid" : ""
                    }`}
                    name="address"
                    type="text"
                  />

                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
               </div>
               <div className="col-6">
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
                  />

                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    className={`form-control m-1 ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    type="email"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                </div>
                <div className="col-6">

                <div className="form-group">
                  <label>Password</label>
                  <Field
                    className={`form-control m-1 ${
                      touched.password && errors.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    type="text"
                    autoComplete="off"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                </div>
                </div>

                <div className="row">
                <div className="form-group col-md-4">
                  <label>
                    Role
                    <Field
                      className={`form-control m-1 ${
                        touched.roleId && errors.roleId ? "is-invalid" : ""
                      }`}
                      name="roleId"
                      as="select"
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
                <div className="form-group col-md-4">
                  <label>
                    Department
                    <Field
                      className={`form-control m-1 ${
                        touched.departmentId && errors.departmentId ? "is-invalid" : ""
                      }`}
                      name="departmentId"
                      as="select"
                    >
                      <option value="">Select Department</option>
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
                    <div className="form-group col-md-4">
                  <label>
                    Manager
                    <Field
                      className={`form-control m-1 ${
                        touched.managerId && errors.managerId ? "is-invalid" : ""
                      }`}
                      name="managerId"
                      as="select"
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

                <div className="text-center mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 text-center"
                  >
                    Submit
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
};

export default Add;
