import axios from "axios";
import { Comment } from "../models/comment/comment";
import { API_GETALLCOMMENT, API_POSTCOMMENT, HOST } from "../contants/contants";

export const getAllCommentService = async (postId: number) => {
  const result = await axios.get(HOST + API_GETALLCOMMENT + postId, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
export const saveCommentService = async (comment: Comment) => {
  const result = await axios.post(HOST + API_POSTCOMMENT, comment, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};
