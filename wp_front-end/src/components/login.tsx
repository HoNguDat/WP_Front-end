import React, { useEffect, useState } from "react";
import {
  GoogleOutlined,
  FacebookFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import { Form, Input, Typography, Button, Divider } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

import { Link } from "react-router-dom";
import Background from "./background";

//import instance from "../services/axios";
import { ToastContainer, toast } from "react-toastify";
import { User } from "../models/user/user";
import { LoginResponse } from "../models/login/login";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setLoggedInUser } from "../features/user/userSlice";
const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authenticate = "User/authenticate";

  const handleSubmit = async () => {
    try {
      await axios
        .post<LoginResponse>("https://localhost:44332/api/User/authenticate", {
          email,
          password,
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          const storedUserJSON = localStorage.getItem("user");
          let newUser: User | null = null;
          if (storedUserJSON !== null) {
            const storedUser = JSON.parse(storedUserJSON) as User;
            newUser = { ...storedUser };
          } else {
            console.log("Can find user in localStorage !");
          }
          dispatch(setLoggedInUser(newUser));
          toast.success("Login success !");
          alert("Login success !");
        });
      navigate("/home");
      // var date = new Date();
      // date.setDate(date.getDate() + 1);
      // setCookie("jwt", data, { expires: date });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <Background>
      <Form className="loginForm" onFinish={handleSubmit}>
        <Typography.Title>Login</Typography.Title>
        <Form.Item label="Email" name="email">
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Input>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            float: "right",
            fontSize: "18px",
          }}
        >
          <Link to={"/register"}>Register</Link>
        </span>
        <Divider style={{ borderColor: "black" }}>or Login with </Divider>
        <div className="socialLogin">
          <GoogleOutlined
            className="socialIcon"
            style={{ color: "red" }}
          ></GoogleOutlined>
          <FacebookFilled className="socialIcon" style={{ color: "blue" }} />
          <TwitterOutlined className="socialIcon" style={{ color: "cyan" }} />
        </div>
      </Form>
      <ToastContainer position="bottom-right" />
    </Background>
  );
};

export default Login;
