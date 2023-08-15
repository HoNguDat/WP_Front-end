import axios from "axios";
import { Post } from "../models/post/post";
import { API_GETALLUSER, HOST } from "../contants/contants";

export const getAllUserService = async () => {
  const result = await axios.get(HOST + API_GETALLUSER, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
