import { Layout, Menu } from 'antd';
import { TeamOutlined, BarcodeOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <InboxOutlined />,
    label: '工單管理',
  },
  {
    key: '/contacts',
    icon: <TeamOutlined />,
    label: '往來用戶管理',
  },
  {
    key: '/work-orders',
    icon: <BarcodeOutlined />,
    label: '工單查詢',
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={240}
      style={{
        background: '#fff',
        borderRight: '1px solid #e2e8f0',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          padding: 20,
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logo} alt="穗鈅科技" style={{ height: 120 }} />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ border: 'none', marginTop: 8 }}
      />
    </Sider>
  );
}
