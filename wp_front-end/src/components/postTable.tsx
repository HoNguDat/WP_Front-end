import { Post, AddPost } from "../models/post/post";
import "semantic-ui-css/semantic.min.css";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchPosts, deletePost } from "../features/post/postSlice";
import React, { useContext, useEffect, useState } from "react";

import { Col, Input, Row } from "antd";
import {
  CaretRightOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Form } from "react-router-dom";
import { fetchComments } from "../features/comment/commentSlice";

const PostTable = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const post = useAppSelector((state) => state.post);
  const comment = useAppSelector((state) => state.comment);
  // const users = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  function handleDelete(id: any) {
    dispatch(deletePost(id));
  }
  // const handeLike = (postId: any) => {
  //   axios
  //     .put(`https://localhost:44332/api/Post/${postId}/like`)
  //     .then((response) => {
  //       alert("Like success");
  //     });
  //   setButtonClicked(!buttonClicked);
  // };
  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // function handleInputChange(event: any) {
  //   const { commnet, setComment } = event.target;
  //   setComment;
  // }
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
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
                  <div className="createAt">{post?.createdDateTime}</div>
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
              {post.comments &&
                post.comments.map((item) => (
                  <Row style={{ marginTop: 15 }}>
                    <Col span={1}>
                      {" "}
                      <img
                        src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        className="avatarUser"
                      ></img>
                    </Col>
                    <Col span={19}>
                      <div className="contentComment">
                        <span
                          style={{ fontSize: 15, fontWeight: 620, padding: 5 }}
                        >
                          {item.user?.firstName} {item.user?.lastName}
                        </span>
                        <div style={{ fontSize: 15, padding: 5 }}>
                          {item.content}
                        </div>
                      </div>
                    </Col>
                    <Col span={4} style={{ left: 70 }}></Col>
                  </Row>
                ))}
            </div>
            {post.comments?.map((comment) => (
              <div className="listComment">
                <Row>
                  <Col span={1}>
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      className="avatarUser"
                    ></img>
                  </Col>
                  <Col
                    className="contentComment"
                    span={19}
                    style={{ paddingLeft: 8 }}
                  >
                    {/* <span>{item.content}</span> */}
                    <div className="createAt">{comment.content}</div>
                  </Col>
                  <Col span={4} style={{ left: 70 }}></Col>
                </Row>
              </div>
            ))}

            <div className="commentPost">
              <Row>
                <Col span={1}>
                  {" "}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19urE4x5YYNW5YH4Hhfos32BKk34TsZuTcg&usqp=CAU"
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
                  <div>
                    <Input
                      style={{ height: 40 }}
                      placeholder="Write a comment..."
                    ></Input>
                  </div>
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
