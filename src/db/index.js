import { type } from "@testing-library/user-event/dist/type";
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
  const getItemByType = (type) => {
    return apiInstance.get(`/products $ {type}`);
  };

  const getAllItems = () => {
    return apiInstance.get("/freshkart/products");
  };

  const updateUserPassword = (email, oldPassword, newPassword) => {
    return apiInstance.put("/users/update-password", {
      email,
      oldPassword,
      newPassword,
    });
  };
  const getAllPopularItems = (type, popular) => {
    return apiInstance.get(`/products/${type}/${popular}`);
  };

  return {
    userLogin,
    RegisterUser,
    getItemByType,
    getAllItems,
    updateUserPassword,
    getAllPopularItems,
  };
};

export default useApi;
