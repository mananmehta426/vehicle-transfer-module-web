import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, message, Select } from "antd";
import { httpClient } from "@/services/api-client";
import Head from "next/head";

const { Option } = Select;

const CreateTransfer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await httpClient.get("/v1/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        message.error("Error fetching vehicles");
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await httpClient.get("/v1/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        message.error("Error fetching drivers");
      }
    };

    fetchVehicles();
    fetchDrivers();
  }, []);

  const onFinish = async (values: {
    vehicleId: number;
    fromEntityId: number;
    fromEntityType: string;
    toEntityId: number;
    toEntityType: string;
  }) => {
    setLoading(true);
    try {
      const { vehicleId, fromEntityId, fromEntityType, toEntityId, toEntityType } = values;
      const requestBody = {
        vehicleId,
        fromEntity: { id: fromEntityId, type: fromEntityType },
        toEntity: { id: toEntityId, type: toEntityType }
      };
  
      const response = await httpClient.post("/v1/transfers", requestBody);
      console.log(response);
      if (response.status === 201) {
        message.success("Transfer created successfully");
        router.push("/transfers");
      } else {
        message.error("Failed to create transfer");
      }
    } catch (error) {
      console.error("Error creating transfer:", error);
      message.error("Error creating transfer");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Transfer Vehicle Ownership</title>
      </Head>
      <h2>Transfer Vehicle Ownership</h2>
      <Form
        name="create_transfer"
        onFinish={onFinish}
        initialValues={{ vehicleId: "", fromEntityId: "", fromEntityType: "driver", toEntityId: "", toEntityType: "driver" }}
        layout="vertical"
      >
        <Form.Item
          label="Select Vehicle"
          name="vehicleId"
          rules={[{ required: true, message: "Please select a vehicle!" }]}
        >
          <Select
            placeholder="Select a vehicle"
            loading={vehicles.length === 0}
          >
            {vehicles.map((vehicle: { id: number; vehicle_number: string }) => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle_number}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select From Entity Type"
          name="fromEntityType"
          rules={[{ required: true, message: "Please select the from entity type!" }]}
        >
          <Select placeholder="Select an entity type">
            <Option value="driver">Driver</Option>
            {/* Add other entity types here */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select From Driver"
          name="fromEntityId"
          rules={[
            { required: true, message: "Please select the from driver!" },
          ]}
        >
          <Select placeholder="Select a driver" loading={drivers.length === 0}>
            {drivers.map((driver: { id: number; name: string }) => (
              <Option key={driver.id} value={driver.id}>
                {driver.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select To Entity Type"
          name="toEntityType"
          rules={[{ required: true, message: "Please select the to entity type!" }]}
        >
          <Select placeholder="Select an entity type">
            <Option value="driver">Driver</Option>
            {/* Add other entity types here */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select To Driver"
          name="toEntityId"
          rules={[{ required: true, message: "Please select the to driver!" }]}
        >
          <Select placeholder="Select a driver" loading={drivers.length === 0}>
            {drivers.map((driver: { id: number; name: string }) => (
              <Option key={driver.id} value={driver.id}>
                {driver.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTransfer;
