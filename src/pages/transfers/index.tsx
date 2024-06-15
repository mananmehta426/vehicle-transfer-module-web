import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { List, Card, Avatar, Button } from 'antd';
import { httpClient } from '@/services/api-client';

const TransfersPage: React.FC = () => {
  const [transfers, setTransfers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await httpClient.get('/v1/transfers');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transfers List</h2>
      <Button type="primary" onClick={() => router.push('/transfers/create-transfer')}>
        Create New Transfer
      </Button>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={transfers}
        renderItem={(transfer: any) => (
          <List.Item>
            <Card title={`Transfer ID: ${transfer.id}`}>
              <p>Transfer Date: {new Date(transfer.transfer_date).toLocaleString()}</p>
              <p>Vehicle: {transfer.vehicle.vehicle_number} ({transfer.vehicle.vehicle_type})</p>
              <p>From Driver: {transfer.from_driver.name}</p>
              <p>To Driver: {transfer.to_driver.name}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TransfersPage;
