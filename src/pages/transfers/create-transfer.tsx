import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message, Select } from 'antd';
import { httpClient } from '@/services/api-client';

const { Option } = Select;

const PostTransfer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await httpClient.get('/v1/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        message.error('Error fetching vehicles');
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await httpClient.get('/v1/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        message.error('Error fetching drivers');
      }
    };

    fetchVehicles();
    fetchDrivers();
  }, []);

  const onFinish = async (values: { vehicleId: number; fromEntityId: number; toEntityId: number }) => {
    setLoading(true);
    try {
      const response = await httpClient.post('/v1/transfers', values);
      console.log(response);
      if (response.status === 201) {
        message.success('Transfer created successfully');
        router.push('/transfers');
      } else {
        message.error('Failed to created transfer');
      }
    } catch (error) {
      console.error('Error creating transfer:', error);
      message.error('Error creating transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transfer Vehicle Ownership</h2>
      <Form
        name="create_transfer"
        onFinish={onFinish}
        initialValues={{ vehicleId: '', fromEntityId: '', toEntityId: '' }}
        layout="vertical"
      >
        <Form.Item
          label="Select Vehicle"
          name="vehicleId"
          rules={[{ required: true, message: 'Please select a vehicle!' }]}
        >
          <Select placeholder="Select a vehicle" loading={vehicles.length === 0}>
            {vehicles.map((vehicle: { id: number; vehicle_number: string }) => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle_number}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select From Driver"
          name="fromEntityId"
          rules={[{ required: true, message: 'Please select the from driver!' }]}
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
          label="Select To Driver"
          name="toEntityId"
          rules={[{ required: true, message: 'Please select the to driver!' }]}
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

export default PostTransfer;
