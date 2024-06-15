import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { List, Card, Button, Spin } from "antd";
import { httpClient } from "@/services/api-client";
import Head from "next/head";

const TransfersPage: React.FC = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await httpClient.get("/v1/transfers");
        setTransfers(response.data);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Transfers List</title>
      </Head>
      <h2>Transfers List</h2>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => router.push("/transfers/create-transfer")}
            style={{ marginBottom: "20px" }}
          >
            Create New Transfer
          </Button>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={transfers}
            renderItem={(transfer: any) => (
              <List.Item>
                <Card title={`Transfer ID: ${transfer.id}`}>
                  <p>
                    Transfer Date:{" "}
                    {new Date(transfer.transfer_date).toLocaleString()}
                  </p>
                  <p>
                    Vehicle: {transfer.vehicle.vehicle_number} (
                    {transfer.vehicle.vehicle_type})
                  </p>
                  <p>From Driver: {transfer.from_driver.name}</p>
                  <p>To Driver: {transfer.to_driver.name}</p>
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default TransfersPage;
