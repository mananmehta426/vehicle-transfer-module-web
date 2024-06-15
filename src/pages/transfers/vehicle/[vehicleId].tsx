import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { List, Card, Avatar } from 'antd';
import { httpClient } from '@/services/api-client';
import app from '@/app/config/constants';

const TransfersByVehicle = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!vehicleId) return;
      try {
        const response = await httpClient.get(`/v1/transfers/vehicle/${vehicleId}`);
        if (response.data) {
          setTransfers(response.data);
        } else {
          console.log('No transfers found');
        }
      } catch (error) {
        console.error('Error fetching transfers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransfers();
  }, [vehicleId]);

  interface Transfer {
    id: number;
    transfer_date: string;
    vehicle: {
      id: number;
      vehicle_number: string;
      vehicle_type: string;
      puc_certificate: string;
      insurance_certificate: string;
      createdAt: string;
    };
    from_driver: {
      id: number;
      name: string;
      phoneNumber: string;
      profile_photo: string;
      createdAt: string;
    };
    to_driver: {
      id: number;
      name: string;
      phoneNumber: string;
      profile_photo: string;
      createdAt: string;
    };
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transfers for Vehicle ID: {vehicleId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={transfers}
          renderItem={transfer => (
            <List.Item>
              <Card title={`Transfer Date: ${new Date(transfer.transfer_date).toLocaleString()}`}>
                <Card.Meta
                  title={`Vehicle: ${transfer.vehicle.vehicle_number} (${transfer.vehicle.vehicle_type})`}
                />
                <div style={{ marginTop: '10px' }}>
                  <strong>From Driver:</strong>
                  <div>
                    <Avatar src={`${app.baseUrl}/${transfer.from_driver.profile_photo}`} /> {transfer.from_driver.name}
                  </div>
                  <div>Phone: {transfer.from_driver.phoneNumber}</div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <strong>To Driver:</strong>
                  <div>
                    <Avatar src={`${app.baseUrl}/${transfer.to_driver.profile_photo}`} /> {transfer.to_driver.name}
                  </div>
                  <div>Phone: {transfer.to_driver.phoneNumber}</div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <a 
                    href={`${app.baseUrl}/${transfer.vehicle.puc_certificate}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View PUC Certificate
                  </a>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <a 
                    href={`${app.baseUrl}/${transfer.vehicle.insurance_certificate}`} 
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
      )}
    </div>
  );
};

export default TransfersByVehicle;
