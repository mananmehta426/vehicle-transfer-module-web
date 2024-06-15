import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { httpClient } from "@/services/api-client";
import Head from "next/head";

const CreateDriver: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("profile_photo", values.profile_photo[0].originFileObj);

    try {
      await httpClient.post("/v1/drivers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Driver created successfully");
      router.push("/drivers"); // Redirect to the drivers list page
    } catch (error) {
      message.error("Error creating driver");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Create Driver</title>
      </Head>
      <h2>Create Driver</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input the phone number!" },
            { pattern: /^\d{10}$/, message: "Phone number must be 10 digits" },
          ]}
        >
          <Input
            maxLength={10}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </Form.Item>
        <Form.Item
          label="Profile Photo"
          name="profile_photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            { required: true, message: "Please upload the profile photo!" },
          ]}
        >
          <Upload
            name="profile_photo"
            beforeUpload={beforeUpload}
            accept=".jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>Click to upload JPG/PNG</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Driver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDriver;
