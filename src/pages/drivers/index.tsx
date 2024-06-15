import React, { useEffect, useState } from 'react';
import { List, Card, Avatar } from 'antd';
import { httpClient } from '@/services/api-client';
import app from '@/app/config/constants';

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await httpClient.get('/v1/drivers');
        if (response.data) {
          setDrivers(response.data);
        } else {
          console.log('No drivers found');
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, []);

  interface Driver {
    id: string;
    name: string;
    profile_photo: string;
    createdAt: string; // Assuming createdAt is a valid date string
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Driver List</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={drivers}
        renderItem={driver => (
          <List.Item>
            <Card
              hoverable
              cover={
                <div>
                  <img
                    src={`${app.baseUrl}/${driver.profile_photo}`}
                    alt={driver.name}
                    style={{ width: '50%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={driver.name}
                description={`Joined: ${new Date(driver.createdAt).toLocaleDateString()}`} // Format date here
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DriverList;