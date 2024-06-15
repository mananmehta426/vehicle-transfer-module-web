import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { httpClient } from "@/services/api-client";
import Head from "next/head";

const CreateVehicle: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("vehicle_number", values.vehicle_number);
    formData.append("vehicle_type", values.vehicle_type);
    formData.append("puc_certificate", values.puc_certificate[0].originFileObj);
    formData.append(
      "insurance_certificate",
      values.insurance_certificate[0].originFileObj
    );

    try {
      await httpClient.post("/v1/vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Vehicle created successfully");
      router.push("/vehicles"); // Redirect to the vehicles list page
    } catch (error) {
      message.error("Error creating vehicle");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: any) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF files!");
    }

    return isPDF || Upload.LIST_IGNORE;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Create Vehicle</title>
      </Head>
      <h2>Create Vehicle</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Vehicle Number"
          name="vehicle_number"
          rules={[
            { required: true, message: "Please input the vehicle number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vehicle Type"
          name="vehicle_type"
          rules={[
            { required: true, message: "Please input the vehicle type!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="PUC Certificate"
          name="puc_certificate"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            { required: true, message: "Please upload the PUC certificate!" },
          ]}
        >
          <Upload name="puc_certificate" beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>Click to upload PDF</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Insurance Certificate"
          name="insurance_certificate"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            {
              required: true,
              message: "Please upload the insurance certificate!",
            },
          ]}
        >
          <Upload name="insurance_certificate" beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>Click to upload PDF</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Vehicle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateVehicle;
