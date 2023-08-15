import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Input, Modal, Upload, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../app/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hook";
import { addPost } from "../features/post/postSlice";
import { fetchGroups } from "../features/group/groupSlice";
// interface AddFormProps {
//   handleSubmit: (post: AddPost) => Promise<void>;
// }
const AddPostForm = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const groupsList = useAppSelector((state) => state.group);
  const initialState = {
    content: "",
    userId: user?.userId,
    groupId: 0,
    imageFile: undefined,
  };
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState(initialState);
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);
  const showModal = () => {
    console.log("User add form", user);

    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: any) => {
    debugger;
    e.preventDefault();
    console.log(post);

    if (!post.content) {
      toast.error("Please fill all the details !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    dispatch(addPost(post));

    setOpen(false);
  };

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  }

  function handleSelectGroup(value: number) {
    console.log(value);
    setPost({ ...post, groupId: value });
  }
  function handleImageChange(event: any) {
    const file = event.target.files[0];
    console.log("File: ", typeof file);
    // if (file) {
    //   setPost({ ...post, imageFile: file.name });
    // }
    setPost({ ...post, imageFile: event.target.files[0] });
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add post
      </Button>
      <Modal
        title="Post content"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Content">
            <TextArea
              value={post.content}
              rows={4}
              name="content"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="To group" required>
            <Select
              style={{ width: "100%" }}
              onChange={handleSelectGroup}
              options={groupsList.groups.map((item) => ({
                name: "groupId",
                value: item.groupId,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item label="Upload">
            <input
              type="file"
              name="imageFile"
              onChange={handleImageChange}
            ></input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostForm;
