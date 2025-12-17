import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 240 }}>
        <Content
          style={{
            padding: 24,
            background: '#f8fafc',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
