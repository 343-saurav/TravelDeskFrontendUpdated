import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./TravelRequest.module.css";

function Request() {
  // Initial form values
  const initialValues = {
    employeeId: "",
    employeeName: "",
    projectName: "",
    departmentName: "",
    reasonForTravelling: "",
    bookingType: "",
    flightType: "",
    foodType: "",
    mealType: "",
    cityLocation: "",
    countryLocation: "",
    
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required("Required"),
    employeeName: Yup.string().required("Required"),
    projectName: Yup.string().required("Required"),
    departmentName: Yup.string().required("Required"),
    reasonForTravelling: Yup.string().required("Required"),
    bookingType: Yup.string().required("Required"),
  });

  // Form submission function
  const handleSubmit = (values) => {
    console.log(values); // Replace with actual submission logic
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Request for Travel</h1>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div className={styles.formRow}>
                {/* Employee ID */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Employee ID :</p>
                    <Field type="text"  name="employeeId" />
                    <ErrorMessage
                      name="employeeId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                {/* Employee Name */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Employee Name :</p>
                    <Field type="text"  name="employeeName" />
                    <ErrorMessage
                      name="employeeName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                {/* Project Name */}
                <div className={styles.formColumn}>
                  <label>
                    <p className={styles.inputName}>Project Name :</p>
                    <Field as="select" className={styles.inputField} name="projectName" >
                    <option value="">Select here..</option>
                      <option value="youtube">Youtube</option>
                      <option value="zomato">Zomato</option>
                    </Field>  
                    <ErrorMessage
                      name="projectName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
              </div>

              <div className={styles.formRow}>
                {/* Department Name */}
                <div className={styles.formColumn}>
                  <label className={styles.inputField}>
                    <p className={styles.inputName}>Department Name :</p>
                    <Field type="text" name="departmentName" />
                    <ErrorMessage
                      name="departmentName"
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

                {/* Type of Booking */}
                <div className={styles.formColumn}>
                  <label>
                    <p className={styles.inputName}>Type of Booking :</p>
                    <Field as="select" className={styles.inputField} name="bookingType">
                      <option value="">Select here..</option>
                      <option value="ticket only">Air Ticket Only</option>
                      <option value="hotel only">Hotel Only</option>
                      <option value="air ticket + hotel both">
                        Air Ticket + Hotel Both
                      </option>
                    </Field>
                    <ErrorMessage
                      name="bookingType"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
              </div>

              {/* Conditional rendering based on bookingType */}
              {values.bookingType === "ticket only" && (
                <div className={styles.formRow}>
                  {/* Select Flight Type */}
                  <div className={styles.formColumn}>
                    <label>
                      <h4>Select Flight Type</h4>
                      <Field  as="select" name="flightType" className={styles.inputField}>
                        <option value="">Select here..</option>
                        <option value="domestic flight">Domestic Flight</option>
                        <option value="international flight">
                          International Flight
                        </option>
                      </Field>
                      <ErrorMessage
                        name="flightType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Conditional rendering based on flightType */}
              {values.flightType === "domestic flight" && (
                <div className={styles.formRow}>
                  {/* Aadhar Card */}
                  <div className={styles.formColumn}>
                    <label>
                      Aadhar Card
                      <Field type="file" name="aadharCard" className={styles.inputField} />
                      <ErrorMessage
                        name="aadharCard"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Date</label>
                    <Field type="date" name="flightDate" className={styles.inputField} />
                    <ErrorMessage
                      name="flightDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Location */}
                  <div className={styles.formColumn}>
                  <label>City:
                    <Field as="select" name="cityLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="london">London</option>
                      <option value="america">America</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                <div className={styles.formColumn}>
                  <label>Country:
                    <Field as="select" name="countryLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
                </div>
              )}

              {/* Conditional rendering based on flightType */}
              {values.flightType === "international flight" && (
                <div className={styles.formRow}>
                  {/* Passport No. */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Passport No.</label>
                    <Field type="number" name="passportNo" className={styles.inputField} />
                    <ErrorMessage
                      name="passportNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Upload Passport */}
                  <div className={styles.formColumn}>
                    <label>Upload Passport</label>
                    <Field type="file" name="passportFile" className={styles.inputField} />
                    <ErrorMessage
                      name="passportFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Upload Visa */}
                  <div className={styles.formColumn}>
                    <label>Upload Visa</label>
                    <Field type="file" name="visaFile" className={styles.inputField} />
                    <ErrorMessage
                      name="visaFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Date</label>
                    <Field type="date" name="flightDate" className={styles.inputField}/>
                    <ErrorMessage
                      name="flightDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Aadhar Card */}
                  <div className={styles.formColumn}>
                    <label>Aadhar Card</label>
                    <Field type="file" name="aadharCard" className={styles.inputField} />
                    <ErrorMessage
                      name="aadharCard"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* Location */}
                  <div className={styles.formColumn}>
                  <label>City:
                    <Field as="select" name="cityLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="london">London</option>
                      <option value="america">America</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                <div className={styles.formColumn}>
                  <label>Country:
                    <Field as="select" name="countryLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
                </div>
              )}

              {/* Conditional rendering based on bookingType */}
              {values.bookingType === "hotel only" && (
                <div className={styles.formRow}>
                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Date</label>
                    <Field type="date" name="hotelDate" className={styles.inputField} />
                    <ErrorMessage
                      name="hotelDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Number of Days */}
                  <div className={styles.formColumn}>
                    <label>Number of Days</label>
                    <Field type="number" name="numberOfDays" className={styles.inputField}/>
                    <ErrorMessage
                      name="numberOfDays"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Meal Required */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                      Meal Required
                      <Field as="select" name="foodType" className={styles.inputField}>
                        <option value="">Select here..</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="both">Both</option>
                      </Field>
                      <ErrorMessage
                        name="foodType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Meal Preferences */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                      Meal Preferences
                      <Field as="select" name="mealType" className={`${styles.options} ${styles.inputField}`}>
                        <option value="">Select here..</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </Field>
                      <ErrorMessage
                        name="mealType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Location */}
                  <div className={styles.formColumn}>
                  <label>City:
                    <Field as="select" name="cityLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="london">London</option>
                      <option value="america">America</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                <div className={styles.formColumn}>
                  <label>Country:
                    <Field as="select" name="countryLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
                </div>
              )}

              {/* Conditional rendering based on bookingType */}
              {values.bookingType === "air ticket + hotel both" && (
                <div className={styles.formRow}>
                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                      <label htmlFor="">Date</label>
                      <Field type="date" name="flightDate" className={styles.inputField} />
                      <ErrorMessage
                        name="flightDate"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Number of Days */}
                  <div className={styles.formColumn}>
                    <label>Number of Days</label>
                    <Field type="number" name="numberOfDays"  className={styles.inputField}/>
                    <ErrorMessage
                      name="numberOfDays"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  

                  {/* Meal Required */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                      Meal Required
                      <Field as="select" name="foodType" className={styles.inputField}>
                        <option value="">Select here..</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="both">Both</option>
                      </Field>
                      <ErrorMessage
                        name="foodType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Meal Preferences */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">
                      Meal Preferences
                      <Field as="select" name="mealType" className={styles.inputField}>
                        <option value="">Select here..</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </Field>
                      <ErrorMessage
                        name="mealType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Location */}
                  <div className={styles.formColumn}>
                  <label>City:
                    <Field as="select" name="cityLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="london">London</option>
                      <option value="america">America</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                <div className={styles.formColumn}>
                  <label>Country:
                    <Field as="select" name="countryLocation" className={styles.inputField}>
                      <option value="">Select here..</option>
                      <option value="uk">UK</option>
                      <option value="usa">USA</option>
                      
                    </Field>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>

                  {/* Select Flight Type */}
                  <div className={styles.formColumn} id={styles.bothflight}>
                    <label>
                      <h4>Select Flight Type</h4>
                      <Field as="select" name="flightType" className={styles.inputField}>
                        <option value="">Select here..</option>
                        <option value="both domestic flight">Domestic Flight</option>
                        <option value="both international flight">
                          International Flight
                        </option>
                      </Field>
                      <ErrorMessage
                        name="flightType"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                </div>

                //
                
              )}
              {values.flightType === "both domestic flight" && (
                <div className={styles.formRow}>
                  {/* Aadhar Card */}
                  <div className={styles.formColumn}>
                    <label>
                      Aadhar Card
                      <Field type="file" name="aadharCard" className={styles.inputField} />
                      <ErrorMessage
                        name="aadharCard"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>

                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Date</label>
                    <Field type="date" name="flightDate" className={styles.inputField} />
                    <ErrorMessage
                      name="flightDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              )}

              {/* Conditional rendering based on flightType */}
              {values.flightType === "both international flight" && (
                <div className={styles.formRow}>
                  {/* Passport No. */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Passport No.</label>
                    <Field type="number" name="passportNo" className={styles.inputField} />
                    <ErrorMessage
                      name="passportNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Upload Passport */}
                  <div className={styles.formColumn}>
                    <label>Upload Passport</label>
                    <Field type="file" name="passportFile" className={styles.inputField}/>
                    <ErrorMessage
                      name="passportFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Upload Visa */}
                  <div className={styles.formColumn}>
                    <label>Upload Visa</label>
                    <Field type="file" name="visaFile" className={styles.inputField}/>
                    <ErrorMessage
                      name="visaFile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Date */}
                  <div className={styles.formColumn}>
                    <label htmlFor="">Date</label>
                    <Field type="date" name="flightDate" className={styles.inputField} />
                    <ErrorMessage
                      name="flightDate"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Aadhar Card */}
                  <div className={styles.formColumn}>
                    <label>Aadhar Card</label>
                    <Field type="file" name="aadharCard" className={styles.inputField} />
                    <ErrorMessage
                      name="aadharCard"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  
                </div>
              )}

              {/* Submit Button */}
              <div className={styles.formRow}>
                <div className={styles.formColumn} >
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
export default Request;