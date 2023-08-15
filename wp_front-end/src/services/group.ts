import axios from "axios";
import { Post } from "../models/post/post";
import { API_GETALLGROUP, HOST } from "../contants/contants";

export const getAllGroupService = async () => {
  const result = await axios.get(HOST + API_GETALLGROUP,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
