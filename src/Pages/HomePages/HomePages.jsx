import React, { useState, useEffect } from 'react';
import './HomePages.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Category from '../Category/Category';
import Faq from '../Faq/Faq';
import News from '../News/News';
import Blogs from '../Blogs/Blogs';
import Services from '../Services/Services';
import Source from '../Source/Source';
import UserDropdown from '../../Components/UserDropDown/UserDropDown';
const { Header, Sider, Content } = Layout;

const HomePages = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // Handle component mount logic here if needed
  }, []);

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <div><Category/></div>;
      case '2':
        return <div><Faq/></div>;
      case '3':
        return <div><News/></div>;
      case '4':
        return <div><Blogs/></div>;
      case '5':
        return <div><Services/></div>;
      case '6':
        return <div><Source/></div>;
      default:
        return <div><Category/></div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
        <div className="demo-logo-vertical" />
        <h1 className='homepage-loyal' style={{ fontSize: '24px', marginBottom: 0 }}>UzLoyalAdmin</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={[
            {
              key: '1',
              icon: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width={13} height={22}>
                <path d='M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM7 11H13V13H7V11ZM7 15H13V17H7V15Z'></path>
              </svg>,
              label: 'Category',
            },
            {
              key: '2',
              icon: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width={13} height={22}>
                <path d='M12 6.99999C16.4183 6.99999 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 6.99999 12 6.99999ZM12 8.99999C8.68629 8.99999 6 11.6863 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 11.6863 15.3137 8.99999 12 8.99999ZM12 10.5L13.3225 13.1797L16.2798 13.6094L14.1399 15.6953L14.645 18.6406L12 17.25L9.35497 18.6406L9.86012 15.6953L7.72025 13.6094L10.6775 13.1797L12 10.5ZM18 1.99999V4.99999L16.6366 6.13755C15.5305 5.5577 14.3025 5.17884 13.0011 5.04948L13 1.99899L18 1.99999ZM11 1.99899L10.9997 5.04939C9.6984 5.17863 8.47046 5.55735 7.36441 6.13703L6 4.99999V1.99999L11 1.99899Z'></path>
              </svg>,
              label: 'Faqs',
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'News',
            },
            {
              key: '4',
              icon: <VideoCameraOutlined />,
              label: 'Blogs',
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'Services',
            },
            {
              key: '6',
              icon: <VideoCameraOutlined />,
              label: 'Source',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className='homePage-top'> 
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              const homepageLoyal = document.querySelector('.homepage-loyal');
              if (collapsed) {
                homepageLoyal.style.fontSize = '24px';
              } else {
                homepageLoyal.style.fontSize = '10px';
              }
            }}
            style={{
              width: 64,
              height: 64,
            }}
          />
          <UserDropdown/>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePages;
