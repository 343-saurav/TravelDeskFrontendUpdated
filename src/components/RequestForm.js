import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
// import * as Yup from "yup";
import styles from "./RequestForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function RequestForm() {
 
 
  const [projects, setProjects] = useState([]);
  const [bookingTypes, setBookingTypes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [mealPreferences, setMealPreferences] = useState([]);
  const [locations, setLocations] = useState([]);
  const [flightTypes, setFlightTypes] = useState([]);
  const [domesticLocations, setDomesticLocations] = useState([]);
  const[internationalLocations,setInternationalLocations]=useState([]);
  const [managers, setManagers] = useState([]);
  const userId = localStorage.getItem("userId");
  const departmentName = localStorage.getItem("departmentName");
  const departmentId = localStorage.getItem("departmentId");
  const navigate=useNavigate();
 
  //apis to fetch data for dropdown
  useEffect(() => {
    //projects
    fetch("https://localhost:44310/api/Request/GetProjects")
      .then(async (response) => {
        var project = await response.json();
        console.log(project);
        setProjects(project);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //bookingTypes
    fetch("https://localhost:44310/api/Request/GetBookingTypes")
      .then(async (response) => {
        var bookingTypes = await response.json();
        console.log(bookingTypes);
        setBookingTypes(bookingTypes);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //MealTypes
    fetch("https://localhost:44310/api/Request/GetMealTypes")
      .then(async (response) => {
        var mealTypes = await response.json();
        console.log(mealTypes);
        setMealTypes(mealTypes);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //MealPreferenceTypes
    fetch("https://localhost:44310/api/Request/GetMealPreferenceTypes")
      .then(async (response) => {
        var mealPreferences = await response.json();
        console.log(mealPreferences);
        setMealPreferences(mealPreferences);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //hotelLocation
    fetch("https://localhost:44310/api/Request/GetAllLocations")
      .then(async (response) => {
        var locations = await response.json();
        console.log(locations);
        setLocations(locations);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //flightTypes
    fetch("https://localhost:44310/api/Request/GetFlightTypes")
      .then(async (response) => {
        var flightTypes = await response.json();
        console.log(flightTypes);
        setFlightTypes(flightTypes);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //domesticLocations
    fetch("https://localhost:44310/api/Request/GetDomesticLocations")
      .then(async (response) => {
        var domesticLocations = await response.json();
        console.log(domesticLocations);
        setDomesticLocations(domesticLocations);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
      //internationalLocations
      fetch("https://localhost:44310/api/Request/GetInternationalLocations")
      .then(async (response) => {
        var internationalLocations= await response.json();
        console.log(internationalLocations);
        setInternationalLocations(internationalLocations);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
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
 
 
  const initialValues = {
    userId:"",
    projectId:"",
    departmentId:"",
    managerId:"",
    reasonForTravelling: "",
    bookingTypeId: "",
    flightTypeId: "",
    mealPreferenceTypeId: "",
    mealTypeId: "",
    aadharNo: "",
    numberOfDays: null,
    stayDate: null,
    hotelLocationId: "",
    from: "",
    to: "",
    flightDate:null,
    passportNo: "",
  };
 
  // const validationSchema = Yup.object().shape({
  //   projectId: Yup.string().required("Project is required"),
  //   departmentId: Yup.string().required("Department is required"),
  //   managerId: Yup.string().required("Manager is required"),
  //   reasonForTravelling: Yup.string().required("Reason for Travelling is required"),
  //   aadharNo: Yup.string()
  //   .required("Aadhar Card Number is required")
  //   .matches(/^[0-9]{12}$/, "Aadhar Card Number must be exactly 12 numeric digits"),
  //   numberOfDays: Yup.number().required("Number of Days is required").positive("Number of Days must be positive"),
  //   stayDate: Yup.date().required("Check-in Date is required"),
  //   hotelLocationId: Yup.string().required("Hotel Location is required"),
  //   from: Yup.string().required("From is required"),
  //   to: Yup.string().required("To is required"),
  //   flightDate: Yup.date().required("Flight Date is required"),
  //   passportNo: Yup.string().required("Passport Number is required"),
   
  // });
 
  const handleSubmit = async (values) => {
    values.userId=parseInt(userId);
    values.departmentId=parseInt(departmentId);
    values.managerId=parseInt(values.managerId);
    values.projectId=parseInt(values.projectId);
    values.bookingTypeId=parseInt(values.bookingTypeId);
    values.flightTypeId=parseInt(values.flightTypeId);
    values.mealPreferenceTypeId=parseInt(values.mealPreferenceTypeId);
    values.mealTypeId=parseInt(values.mealTypeId);
    values.hotelLocationId=parseInt(values.hotelLocationId);
    values.from=parseInt(values.from);
    values.to=parseInt(values.to);
    console.log("hello")
    console.log(JSON.stringify(values));
    try {
      const response = await axios.post(
        "https://localhost:44310/api/Request/AddRequest",values);
      alert(response.data);
      navigate('/previousrequests')
       
   
    } catch (error) {
      console.error(error);
 
    }
   
  };
 
  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Request for Travel</h1>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              {/* 1 row */}
 
              <div className={styles.formRow}>
 
                {/* Project Name */}
                <div className={styles.formColumn}>
                  <label>
                    <p className={styles.inputName}>Project Name :</p>
                    <Field
                      as="select"
                      className={styles.inputField}
                      name="projectId"
                     
                    >
                      <option value="">Select a project</option>
                      {projects.map((project) => (
                        <option value={project.projectId}>
                          {project.projectName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="projectId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
               
                {/* Department Name  */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Department Name :</p>
                    <Field type="text" name="departmentName" value={departmentName}/>
                    <ErrorMessage
                      name="departmentName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
               
                {/* Manager Name  */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Manager</p>
                    <Field  as="select"
                      className={styles.inputField}
                      name="managerId">
                    <option value="">Select a project</option>
                      {managers.map((manager) => (
                        <option value={manager.userId}>
                          {manager.firstName} {manager.lastName}
                        </option>
                      ))}
                      </Field>
                   
                    <ErrorMessage
                      name="managerId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
             
 
                {/* Reason for Travelling */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Reason for Travelling :</p>
                    <Field type="text" name="reasonForTravelling" />
                    <ErrorMessage
                      name="reasonForTravelling"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
                {/* Aadhar Card */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Aadhar Card Number:</p>
 
                    <Field
                      type="text"
                      name="aadharNo"
                      className={styles.inputField}
                    />
                   
                    <ErrorMessage
                      name="aadharNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
 
                {/* Type of Booking */}
                <div className={styles.formColumn}>
                  <label>
                    <p className={styles.inputName}>Type of Booking :</p>
                    <Field
                      as="select"
                      className={styles.inputField}
                      name="bookingTypeId"
                    >
                      <option value="">Select</option>
                      {bookingTypes.map((bookingType) => (
                        <option value={bookingType.bookingTypeId}>
                          {bookingType.bookingTypeName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="bookingTypeId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
              </div>
 
              {/* Conditional rendering based on bookingType */}
              {(values.bookingTypeId === "1" || values.bookingTypeId === "3") && (
                <div className={styles.formRow}>
                  {/* Select Flight Type */}
                  <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>Select Flight Type :</p>
                      <Field
                        as="select"
                        name="flightTypeId"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {flightTypes.map((flightType) => (
                          <option value={flightType.flightTypeId}>
                            {flightType.flightTypeName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="flightTypeId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                  {/* FlightDate */}
                  <div className={styles.formColumn}>
                    <label htmlFor=""><p className={styles.inputName}>Flight Date :</p></label>
                    <Field
                      type="date"
                      name="flightDate"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="flightDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  </div>
                 
              )}
              {/* Conditional rendering based on flightType */}
              {values.flightTypeId === "1" && (
                <div className={styles.formRow}>
                   {/* From */}
                   <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>From :</p>
                      <Field
                        as="select"
                        name="from"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {domesticLocations.map((domesticLocation) => (
                          <option value={domesticLocation.locationId}>
                            {domesticLocation.city},{domesticLocation.country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="from"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
 
                  {/* To */}
                  <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>To :</p>
                      <Field
                        as="select"
                        name="to"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {domesticLocations.map((domesticLocation) => (
                          <option value={domesticLocation.locationId}>
                            {domesticLocation.city},{domesticLocation.country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="to"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                </div>
 
                 
              )}
 
 
              {/* Conditional rendering based on flightType */}
              {values.flightTypeId === "2" && (
                <div className={styles.formRow}>
                   {/* From */}
                   <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>From :</p>
                      <Field
                        as="select"
                        name="from"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {domesticLocations.map((domesticLocation) => (
                          <option value={domesticLocation.locationId}>
                            {domesticLocation.city},{domesticLocation.country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="from"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
 
                  {/* To */}
                  <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>To :</p>
                      <Field
                        as="select"
                        name="to"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {internationalLocations.map((internationalLocation) => (
                          <option value={internationalLocation.locationId}>
                            {internationalLocation.city},{internationalLocation.country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="to"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                  {/* Passport No. */}
                  <div className={styles.formColumn}>
                    <label className={styles.inputField} ><p className={styles.inputName}>Passport Number :</p>
                    <Field
                      type="text"
                      name="passportNo"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="passportNo"
                      component="div"
                      className="invalid-feedback"
                    />
                    </label>
                  </div>
 
                  {/* Upload Passport */}
                  <div className={styles.formColumn}>
                    <label><p className={styles.inputName}>Upload Passport :</p></label>
                    <Field
                      type="file"
                      name="passportFile"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="passportFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
 
                  {/* Upload Visa */}
                  <div className={styles.formColumn}>
                    <label><p className={styles.inputName}>Upload Visa :</p></label>
                    <Field
                      type="file"
                      name="visaFile"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="visaFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              )}
 
              {/* Conditional rendering based on bookingType */}
              {(values.bookingTypeId === "2" || values.bookingTypeId === "3") && (
                <div className={styles.formRow}>
                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor=""><p className={styles.inputName}>Check-In Date :</p></label>
                    <Field
                      type="date"
                      name="stayDate"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="stayDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
 
                  {/* Number of Days */}
                  <div className={styles.formColumn}>
                    <label><p className={styles.inputName}>Number Of Days :</p>
                    <Field
                      type="number"
                      name="numberOfDays"
                      className={styles.inputField}
                    />
                    <ErrorMessage
                      name="numberOfDays"
                      component="div"
                      className="invalid-feedback"
                    />
                    </label>
                  </div>
 
                  {/* Meal Required */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                    <p className={styles.inputName}>Meal Type Required :</p>
                      <Field
                        as="select"
                        name="mealTypeId"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {mealTypes.map((mealType) => (
                          <option value={mealType.mealTypeId}>
                            {mealType.mealTypeName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="mealTypeId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
 
                  {/* Meal Preferences */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                    <p className={styles.inputName}>Meal Preference :</p>
                      <Field
                        as="select"
                        name="mealPreferenceTypeId"
                        className={`${styles.options} ${styles.inputField}`}
                      >
                        <option value="">Select</option>
                        {mealPreferences.map((mealPreference) => (
                          <option value={mealPreference.mealPreferenceTypeId}>
                            {mealPreference.mealPreferenceName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="mealPreferenceTypeId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
 
                  {/* Location */}
 
                  <div className={styles.formColumn}>
                    <label>
                    <p className={styles.inputName}>Hotel Location :</p>
                      <Field
                        as="select"
                        name="hotelLocationId"
                        className={styles.inputField}
                      >
                        <option value="">Select</option>
                        {locations.map((location) => (
                          <option value={location.locationId}>
                            {location.city}, {location.country}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="hotelLocationId"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                </div>
              )}
 
              {/* Submit Button */}
              <div className={styles.formRow}>
                <div className={styles.formColumn}>
                  <button type="submit">Submit</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default RequestForm;