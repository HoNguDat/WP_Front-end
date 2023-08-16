import axios from "axios";
import { AddPost, Post } from "../models/post/post";
import {
  API_DELETE,
  API_POST,
  HOST,
  API_LOGIN,
  API_GETALLPOST,
} from "../contants/contants";
import { LoginResponse } from "../models/login/login";
//Login
export const login = async (login: LoginResponse) => {
  const result = await axios.post(HOST + API_LOGIN, login);
};
export const getAllPostService = async () => {
  const result = await axios.get(HOST + API_GETALLPOST, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
export const savePostService = async (post: AddPost) => {
  debugger;
  const result = await axios.post(HOST + API_POST, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
export const deletePostService = async (postId: any) => {
  const result = await axios.delete(HOST + API_DELETE + postId, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
