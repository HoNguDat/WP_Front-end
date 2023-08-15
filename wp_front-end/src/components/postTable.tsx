import { Post, AddPost } from "../models/post/post";
import "semantic-ui-css/semantic.min.css";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchPosts, deletePost } from "../features/post/postSlice";
import React, { useContext, useEffect, useState } from "react";

import { Col, Input, Row, Button, Dropdown, Space, MenuProps } from "antd";
import {
  CaretRightOutlined,
  CommentOutlined,
  DeleteOutlined,
  DownOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import axios from "axios";
// interface PostTable {
//   listPosts: Post[];
//   deletePost: (postId: any) => void;
//   handleUpdate: (post: Post) => Promise<void>;
// }
// interface PostComponentProps {
//   post: Post;
// }
const PostTable = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const post = useAppSelector((state) => state.post);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  function handleDelete(id: any) {
    dispatch(deletePost(id));
  }
  const handeLike = (postId: any) => {
    axios
      .put(`https://localhost:44332/api/Post/${postId}/like`)
      .then((response) => {
        alert("Like success");
      });
    setButtonClicked(!buttonClicked);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {post.posts.map((post) => (
        <div className="postContent">
          <div className="headerPost">
            <div className="ifUser">
              <Row>
                <Col span={1}>
                  {" "}
                  <img
                    src="https://vapa.vn/wp-content/uploads/2022/12/avatar-doremon-cute-001.jpg"
                    className="avatarUser"
                  ></img>
                </Col>
                <Col span={19} style={{ paddingLeft: 8 }}>
                  <span>
                    <strong>{post.fullName}</strong> <CaretRightOutlined />
                    <span>
                      <strong>{post.groupName}</strong>
                    </span>
                  </span>
                  <div className="createAt">{post.createdDateTime}</div>
                </Col>
                <Col span={4} style={{ left: 70 }}>
                  <div className="dropDown">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-warning dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Action
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li style={{ justifyContent: "center" }}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleDelete(post.postId)}
                          >
                            <img
                              style={{ width: 30, height: 30 }}
                              src="https://www.shutterstock.com/image-vector/delete-icon-clear-remove-erase-260nw-1263179560.jpg"
                            />
                            <span> Delete post</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="bodyContent">{post.content}</div>
            <div className="imageContentDiv">
              {post.postImage ? (
                <img
                  className="imageContent"
                  src={`https://localhost:44332/images/${post.postImage}`}
                ></img>
              ) : (
                <span></span>
              )}
            </div>
            <div className="totalLike">
              <img
                style={{ height: 18, paddingRight: 5, display: "inline" }}
                src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
              ></img>
              <span style={{ paddingLeft: 5, paddingTop: 5 }}>{post.like}</span>
            </div>
            <div className="interact">
              <Row>
                <Col span={8}>
                  <a
                    className="btnStt"
                    onClick={() => handeLike(post.postId)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      color: buttonClicked ? "#2962ff" : "#77797c",
                      backgroundColor: "white",
                    }}
                  >
                    <span></span>

                    <span className="textInteract"> Like</span>
                  </a>
                </Col>
                <Col span={8}>
                  <a className="btnStt" style={{ backgroundColor: "white" }}>
                    <CommentOutlined
                      style={{
                        paddingRight: 20,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    />
                    <span className="textInteract"> Comment</span>
                  </a>
                </Col>
                <Col span={8}>
                  <a className="btnStt" style={{ backgroundColor: "white" }}>
                    <ShareAltOutlined
                      style={{
                        paddingRight: 20,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    />
                    <span className="textInteract"> Share</span>
                  </a>
                </Col>
              </Row>
            </div>
            <div className="listComment">
              <Row>
                <Col span={1}>
                  {" "}
                  <img
                    src="https://vapa.vn/wp-content/uploads/2022/12/avatar-doremon-cute-001.jpg"
                    className="avatarUser"
                  ></img>
                </Col>
                <Col className="contentComment" span={19}>
                  <span style={{ fontSize: 15, fontWeight: 620, padding: 5 }}>
                    {post.fullName}
                  </span>
                  <div style={{ fontSize: 15, padding: 5 }}>Comment 1</div>
                </Col>
                <Col span={4} style={{ left: 70 }}></Col>
              </Row>
            </div>
            <div className="commentPost">
              <Row>
                <Col span={1}>
                  {" "}
                  <img
                    src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj"
                    className="avatarUser"
                  ></img>
                </Col>
                <Col
                  span={23}
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    paddingLeft: 7,
                  }}
                >
                  <Input
                    style={{ height: 40 }}
                    placeholder="Write a comment..."
                  ></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default PostTable;
