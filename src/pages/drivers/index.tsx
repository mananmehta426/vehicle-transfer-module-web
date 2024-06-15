import React, { useEffect, useState } from "react";
import { List, Card, Button, Spin } from "antd";
import { httpClient } from "@/services/api-client";
import app from "@/app/config/constants";
import Link from "next/link";
import Head from "next/head";

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/v1/drivers");
        if (response.data) {
          setDrivers(response.data);
        } else {
          console.log("No drivers found");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  interface Driver {
    id: string;
    name: string;
    profile_photo: string;
    createdAt: string;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Driver List</title>
      </Head>
      <h2>Driver List</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Link href="/drivers/create-driver">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Add Driver
            </Button>
          </Link>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={drivers}
            renderItem={(driver) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div>
                      <img
                        src={`${app.baseUrl}/${driver.profile_photo}`}
                        alt={driver.name}
                        style={{
                          width: "50%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={driver.name}
                    description={`Joined: ${new Date(
                      driver.createdAt
                    ).toLocaleDateString()}`} // Format date here
                  />
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default DriverList;
