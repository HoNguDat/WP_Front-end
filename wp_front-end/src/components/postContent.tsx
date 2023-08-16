import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Col, List, Row, Skeleton } from "antd";
import axios from "axios";
import AddPostForm from "./addPostForm";
import { ToastContainer, toast } from "react-toastify";
import { savePostService, deletePostService } from "../services/post";
import PostTable from "./postTable";
import { UserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import { Post, AddPost } from "../models/post/post";

const PostContent: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  // const [posts, setPosts] = useState<Post[]>([]);
  const { keyWord } = useContext(SearchContext);
  const [editingItem, setEditingItem] = useState<Post | null>(null);
  // useEffect(() => {}, [posts]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     axios
  //       .get(`https://localhost:44332/api/Post/getallpost?keyword=${keyWord}`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       })
  //       .then((respose) => {
  //         setInitLoading(false);
  //         setPosts(respose.data);
  //       });
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [keyWord]);
  return (
    <>
      <Row>
        <Col span={12} style={{ paddingTop: 10 }}>
          <h1 style={{ marginLeft: 60 }}>New feeds</h1>
          <p style={{ marginLeft: 60 }}>
            Discover posts from across your organization
          </p>
        </Col>
        <Col
          span={12}
          style={{ paddingTop: 40, paddingLeft: 25, textAlign: "center" }}
        >
          <AddPostForm />
        </Col>
      </Row>

      <div style={{ marginLeft: 1000 }}></div>

      <PostTable />
    </>
  );
};

export default PostContent;
