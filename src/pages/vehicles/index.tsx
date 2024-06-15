import { useEffect, useState } from 'react';
import { List, Card, Avatar } from 'antd';
import { httpClient } from '@/services/api-client';
import app from '@/app/config/constants';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await httpClient.get('/v1/vehicles');
        if (response.data) {
          setVehicles(response.data);
        } else {
          console.log('No vehicles found');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  interface Vehicle {
    id: number;
    vehicle_number: string;
    vehicle_type: string;
    puc_certificate: string;
    insurance_certificate: string;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vehicle List</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={vehicles}
        renderItem={vehicle => (
          <List.Item>
            <Card
              hoverable
              cover={
                <Avatar 
                  src={`https://ui-avatars.com/api/?name=${vehicle.vehicle_number}&background=0D8ABC&color=fff`}
                  alt={vehicle.vehicle_number}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={vehicle.vehicle_number}
                description={`Type: ${vehicle.vehicle_type}`}
              />
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={`${app.baseUrl}/${vehicle.puc_certificate}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View PUC Certificate
                </a>
              </div>
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={`${app.baseUrl}/${vehicle.insurance_certificate}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Insurance Certificate
                </a>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default VehicleList;
