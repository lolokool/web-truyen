import React from "react";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ENV_BE } from "../../constants";
import { postAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Default layout/layout";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { Username: string; Password: string }) => {
    // Luồng:
    // - Đăng ký xong
    // - push về trang login
    // đăng nhập và lưu token ở localStorage
    const postData = await postAPI({
      path: "/user/register",
      body: {
        username: values.Username,
        password: values.Password,
      },
    });

    if (postData.status === 200) {
      // trang thai API
      if (postData.data.status === "success") {
        // data thang BE tra ve co ok?
        alert("Đăng ký thành công!!!");
        navigate("/comic/login");
      }
    }
  };
  return (
    <Layout>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"Username"}
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"Password"}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Register;
