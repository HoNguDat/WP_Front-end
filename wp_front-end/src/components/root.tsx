import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuProps } from "antd";
import { Col, Layout, Menu, Row, theme, Image, Button } from "antd";
//   import SearchBar from "./Searchbar";
//   import PostContent from "./PostContent";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import axios from "axios";
import SearchBar from "./searchBar";
import PostContent from "./postContent";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchGroups } from "../features/group/groupSlice";
import { features } from "process";
import { fetchUsers } from "../features/user/userSlice";

const { Header, Content, Footer, Sider } = Layout;

const Root: React.FC = () => {
  const group = useAppSelector((state) => state.group);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const userIf = useAppSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { keyWord } = useContext(SearchContext);

  return (
    <Row>
      <Col
        span={1}
        style={{ border: "1px solid #ced0d4", backgroundColor: "#f5f5f5" }}
      >
        <div className="groupLogoLeft">
          <a
            href="
            "
          >
            <img
              className="logoLeft"
              src="https://cdn.icon-icons.com/icons2/2248/PNG/512/facebook_workplace_icon_135651.png"
            ></img>
          </a>
        </div>
        <div className="groupLogoLeft">
          <a href="">
            <img
              className="logoLeft"
              src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
            ></img>
          </a>
        </div>
        <div className="groupLogoLeft">
          <a href="">
            <img
              className="logoLeft"
              src="https://w7.pngwing.com/pngs/237/433/png-transparent-computer-icons-online-chat-chat-icon-miscellaneous-text-conversation.png"
            ></img>
          </a>
        </div>
      </Col>
      <Col span={23}>
        <Layout hasSider>
          <Layout className="site-layout">
            <Header>
              <Row>
                <Col span={2} style={{ padding: 3 }}>
                  <Image src="https://assets.website-files.com/5f85cdf8c0babd9853d8f9f0/61d46e19a289044dff840cc9_futurify_logo.svg"></Image>
                </Col>
                <Col span={18} style={{ textAlign: "center" }}>
                  <SearchBar />
                </Col>
                <Col span={4}>
                  {/* <MessageOutlined style={{background:'#fff',width:100,height:100}} /> */}
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                overflow: "initial",
                height: 1000,
              }}
            >
              <div>
                <Row>
                  <Col span={4} style={{ borderRight: "1px solid #ced0d4" }}>
                    <div style={{ padding: 10 }}>
                      <div
                        style={{
                          color: "black",
                          fontSize: 25,
                          fontWeight: "bold",
                        }}
                      >
                        Home
                      </div>
                      {group.groups.map((group) => (
                        <div className="groupList">
                          <a
                            style={{
                              color: "#050505",
                              fontSize: 17,
                              fontWeight: "500",
                            }}
                          >
                            <Row>
                              <Col span={2}>
                                <img
                                  style={{ width: 40, height: 40 }}
                                  src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/355480849_255496040415343_3963360558927105517_n.jpg?stp=c11.0.64.64a_cp0_dst-jpg_p64x64&_nc_cat=109&ccb=1-7&_nc_sid=b81613&_nc_ohc=-z7sSBLnpQYAX8hC_Tw&_nc_ht=scontent.fsgn5-8.fna&uss=34fbe66c31a86804&odm=ZnV0dXJpZnkud29ya3BsYWNlLmNvbQ&oe2=64DFEC1F&oe=64DAF183&oh=00_AfBu2JbdMojKaM_yH1kSN81top66t5-KsbtYfOLgjcROEQ"
                                ></img>
                              </Col>
                              <Col span={22}>
                                <p
                                  style={{
                                    paddingLeft: 25,
                                    paddingTop: 6,
                                  }}
                                >
                                  {group.name}
                                </p>
                              </Col>
                            </Row>
                          </a>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 18, padding: 10 }}>
                      <div
                        style={{
                          color: "black",

                          fontSize: 25,
                          fontWeight: "bold",
                        }}
                      >
                        People
                      </div>
                      {user.users.map((user) => (
                        <div className="groupList">
                          <a
                            style={{
                              color: "#050505",
                              fontSize: 17,
                              fontWeight: "500",
                            }}
                          >
                            <Row>
                              <Col span={2}>
                                {" "}
                                <img
                                  style={{ width: 40, height: 40 }}
                                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                                ></img>
                              </Col>
                              <Col span={22}>
                                {" "}
                                <p
                                  style={{
                                    paddingLeft: 25,
                                    paddingTop: 6,
                                  }}
                                >
                                  {user.lastName} {user.firstName}
                                </p>
                              </Col>
                            </Row>
                          </a>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col
                    span={16}
                    style={{
                      backgroundColor: "#f7f8fa",
                      borderRight: "1px solid #ced0d4",
                    }}
                  >
                    <PostContent></PostContent>
                  </Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    Hello {userIf?.firstName} {userIf?.lastName} !!!
                  </Col>
                </Row>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2023 Created by Futurify
            </Footer>
          </Layout>
          <ToastContainer position="bottom-right" />
        </Layout>
      </Col>
    </Row>
  );
};

export default Root;
