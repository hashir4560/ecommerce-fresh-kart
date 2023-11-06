import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useApi = () => {
  const userLogin = (email, password) => {
    return apiInstance.post("/users/login", { email, password });
  };
  const RegisterUser = (
    first_name,
    last_name,
    email,
    password,
    confirmPassword
  ) => {
    return apiInstance.post("/users/register", {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
    });
  };
  return {
    userLogin,
    RegisterUser,
  };
};

export default useApi;
