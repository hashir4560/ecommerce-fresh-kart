import { useRef, useState, useContext } from "react";
import loginStyles from "../styles/login.module.css";
import Register from "./RegisterUser";
import { Link } from "react-router-dom";
import AuthContext from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../db";

const Login = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const emailRef = useRef();
  const pwordRef = useRef();

  const [emailErr, setEmailErr] = useState("");
  const [pwordErr, setPwordErr] = useState("");

  const { userLogin } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();
    if (isFormValid) {
      await login();
    }
  };

  const login = async () => {
    let email = emailRef.current.value;
    let password = pwordRef.current.value;

    try {
      const response = await userLogin(email, password);

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/home");
        toast.success("Logged In Successfully", {
          theme: "colored",
          autoClose: 3000,
        });
      } else {
        toast.error("Invalid Credentials", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid Credentials", {
          theme: "colored",
          autoClose: 3000,
        });
      } else {
        console.error(error); // Log the error for debugging
        toast.error("Error While Logging In", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    let email = emailRef.current.value;
    let pword = pwordRef.current.value;

    // Email validation using a regular expression
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (email.trim() === "") {
      setEmailErr("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailErr("Invalid email format");
      isValid = false;
    } else {
      setEmailErr("");
    }

    if (pword.trim() === "") {
      setPwordErr("Password is required");
      isValid = false;
    } else {
      setPwordErr("");
    }

    return isValid;
  };

  return (
    <div className={loginStyles.loginContainer}>
      <ToastContainer />
      <div className={loginStyles.heading}>Login</div>
      <div className={loginStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={loginStyles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={emailRef} />
            {emailErr.length > 0 ? (
              <span className={loginStyles.error}>{emailErr}</span>
            ) : null}
          </div>
          <div className={loginStyles.formGroup}>
            <label htmlFor="pword">Password</label>
            <input type="password" name="pword" ref={pwordRef} />
            {pwordErr.length > 0 ? (
              <span className={loginStyles.error}>{pwordErr}</span>
            ) : null}
          </div>
          <button className={loginStyles.loginBtn} type="submit">
            Login
          </button>
          <Link to="/register" className={loginStyles.registerLink}>
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
