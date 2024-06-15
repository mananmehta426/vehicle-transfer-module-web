import Link from 'next/link';
import { Button, Space, Divider } from 'antd';

const Home = () => {
  return (
    <>
      <section style={{ textAlign: 'center', marginTop: 48, marginBottom: 40, padding: 100 }}>
        <Space align='start'>
          <h2 style={{ marginBottom: 0 }}>
            Vehicle Transfer Module
          </h2>
        </Space>
        <Divider style={{ marginBottom: 60 }}></Divider>
        <div style={{ marginBottom: '16px' }}>
          <Link href='/drivers'>
            <Button type='primary' block>
              Drivers
            </Button>
          </Link>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Link href='/vehicles'>
            <Button type='primary' block>
              Vehicles
            </Button>
          </Link>
        </div>
        <div>
          <Link href='/transfers'>
            <Button type='primary' block>
              Transfers
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
