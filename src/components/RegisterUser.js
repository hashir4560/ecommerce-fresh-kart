import React, { useRef, useState } from "react";
import registerStyles from "../styles/register.module.css";
import useApi from "../db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const { RegisterUser } = useApi(); // Assuming you have a RegisterUser function
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();

    if (isFormValid) {
      const requestBody = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      };

      try {
        const response = await RegisterUser(
          requestBody.first_name,
          requestBody.last_name,
          requestBody.email,
          requestBody.password,
          requestBody.confirmPassword
        );

        if (response.status === 201) {
          // Registration successful
          setRegistrationStatus(true);
          navigate("login");

          toast.success("User registered successfully", {
            theme: "colored",
            autoClose: 3000,
          });
        } else {
          // Registration failed
          setRegistrationStatus("error");
          const errorMessage =
            response.data && response.data.message
              ? response.data.message
              : "Registration failed. Please try again.";
          toast.error(errorMessage, {
            theme: "colored",
            autoClose: 3000,
          });
        }
      } catch (error) {
        // Network or server errors
        console.error(error);
        setRegistrationStatus("error");
        toast.error("An error occurred. Please try again later.", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    //  validation logic here and update the error state
    // Example: Check if fields are not empty, validate email format, match passwords, etc.
    // Return true if the form is valid, false otherwise
    setFirstNameErr("");
    setLastNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");

    if (firstNameRef.current.value.trim() === "") {
      setFirstNameErr("First Name is required");
      isValid = false;
    }
    if (lastNameRef.current.value.trim() === "") {
      setLastNameErr("Last Name is Required");
      isValid = false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailRef.current.value)) {
      setEmailErr("Invalid email format");
      isValid = false;
    }

    // Validate password
    if (passwordRef.current.value.trim() === "") {
      setPasswordErr("Password is required");
      isValid = false;
    }
    // Confirm password
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setConfirmPasswordErr("Passwords do  not Match");
      toast.error("Pssword  do not Match", {
        theme: "colored",
        autoClose: 2000,
      });
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className={registerStyles.registerContainer}>
      <ToastContainer />
      <div className={registerStyles.heading}>Register</div>
      <div className={registerStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={registerStyles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" ref={firstNameRef} />
            {firstNameErr && (
              <span className={registerStyles.error}>{firstNameErr}</span>
            )}
          </div>
          <div className={registerStyles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" ref={lastNameRef} />
            {lastNameErr && (
              <span className={registerStyles.error}>{lastNameErr}</span>
            )}
          </div>
          <div className={registerStyles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={emailRef} />
            {emailErr && (
              <span className={registerStyles.error}>{emailErr}</span>
            )}
          </div>
          <div className={registerStyles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordRef} />
            {passwordErr && (
              <span className={registerStyles.error}>{passwordErr}</span>
            )}
          </div>
          <div className={registerStyles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              ref={confirmPasswordRef}
            />
            {confirmPasswordErr && (
              <span className={registerStyles.error}>{confirmPasswordErr}</span>
            )}
          </div>
          <button className={registerStyles.registerBtn} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
