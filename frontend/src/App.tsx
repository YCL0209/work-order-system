import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/variables.css';

const theme = {
  token: {
    colorPrimary: '#4073c2',
    colorInfo: '#4073c2',
    colorSuccess: '#16a34a',
    colorWarning: '#f59e0b',
    colorError: '#dc2626',
    borderRadius: 6,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                 'Helvetica Neue', Arial, 'Noto Sans TC', sans-serif`,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme} locale={zhTW}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
