import React, { useRef, useState } from "react";
import changePasswordStyles from "../styles/changePassword.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios"; // Import Axios
import useApi from "../db";

const ChangePassword = () => {
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [emailErr, setEmailErr] = useState("");
  const [oldPasswordErr, setOldPasswordErr] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  const { updateUserPassword } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();

    if (isFormValid) {
      try {
        const email = emailRef.current.value;
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;

        const response = await updateUserPassword(
          email,
          oldPassword,
          newPassword
        );

        if (response.status === 200) {
          toast.success(response.data.message, {
            theme: "colored",
            autoClose: 3000,
          });
          navigate("/login");
        } else {
          toast.error(response.data.message, {
            theme: "colored",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again later.", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    setEmailErr("");
    setOldPasswordErr("");
    setNewPasswordErr("");

    const email = emailRef.current.value;
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (email.trim() === "" || !emailPattern.test(email)) {
      setEmailErr("Invalid email format");

      isValid = false;
    }

    if (oldPassword.trim() === "") {
      setOldPasswordErr("Old Password is required");
      isValid = false;
    }

    if (newPassword.trim() === "" || newPassword.length < 5) {
      setNewPasswordErr(
        "New Password is required and should be at least 5 characters long"
      );
      isValid = false;
    }

    return isValid;
  };

  const toggleShowPassword = (field) => {
    if (field === "oldPassword") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    }
  };

  return (
    <div className={changePasswordStyles.changePasswordContainer}>
      <ToastContainer />
      <div className={changePasswordStyles.heading}>Change Password</div>
      <div className={changePasswordStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={changePasswordStyles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={emailRef} />
            {emailErr && (
              <span className={changePasswordStyles.error}>{emailErr}</span>
            )}
          </div>
          <div className={changePasswordStyles.formGroup}>
            <label htmlFor="oldPassword">Old Password</label>
            <div className={changePasswordStyles.passwordInput}>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                ref={oldPasswordRef}
              />
              <span
                onClick={() => toggleShowPassword("oldPassword")}
                className={changePasswordStyles.eyeIcon}
              >
                {showOldPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {oldPasswordErr && (
              <span className={changePasswordStyles.error}>
                {oldPasswordErr}
              </span>
            )}
          </div>
          <div className={changePasswordStyles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <div className={changePasswordStyles.passwordInput}>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                ref={newPasswordRef}
              />
              <span
                onClick={() => toggleShowPassword("newPassword")}
                className={changePasswordStyles.eyeIcon}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {newPasswordErr && (
              <span className={changePasswordStyles.error}>
                {newPasswordErr}
              </span>
            )}
          </div>
          <button
            className={changePasswordStyles.changePasswordBtn}
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
