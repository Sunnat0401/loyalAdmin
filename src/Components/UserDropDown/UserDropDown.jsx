import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('accesstoken'); 
    navigate('/'); 
  };

  const menu = (
    <Menu>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className="ant-dropdown-trigger user" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
        <span>Admin</span>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
