// api.js
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const instance = axios.create({});

instance.interceptors.response.use(
  (response) => {
    toast.error("Add post success", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        alert("Username or password is incorrect !");
        toast.error("Username or password is incorrect", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (status === 401) {
        alert("Unauthorized !");
        toast.error("Unauthorized !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (status === 500) {
        alert("Server Error !");
        toast.error("Server Error !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        alert("Server Error !");
        toast.error("Server Error !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      console.error("API Error:", error.response);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default instance;
