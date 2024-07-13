import { Button, Input, Modal, Table, Typography, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Category.css';

const { Title } = Typography;
const Category = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    getCategory();
    }, []);
    
    // GetCategory
  const getCategory = () => {
    fetch('https://api.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data);
      });
  };
// GetCategory
// AddCategory
  const addModel = (values) => {
    const token = localStorage.getItem('accesstoken');
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);

    fetch('https://api.dezinfeksiyatashkent.uz/api/categories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Xato so\'rov yuborildi');
        }
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          message.success('Model muvaffaqiyatli qo\'shildi');
          form.resetFields();
          setIsModalOpen(false);
          getCategory(); // Optionally refresh the category list
        } else {
          message.error(data?.message || 'Model qo\'shishda xatolik yuz berdi');
        }
      })
      .catch((error) => {
        console.error('Error adding model:', error);
        message.error('Model qo\'shishda xatolik yuz berdi');
      });
  };
// AddCategory
// DeleteCategory

// DeleteCategory
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        addModel(values);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button className='green btn'>Edit</Button>
          <Button className='red btn'>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Modal title="Add Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={<Title className='titles' level={4}>Name</Title>}
            rules={[{ required: true, message: 'Iltimos, model nomini kiriting!' }]}
          >
            <Input placeholder="Kategoriya nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<Title className='titles' level={4}>Description</Title>}
            rules={[{ required: true, message: 'Iltimos, model nomini kiriting!' }]}
          >
            <Input placeholder="Kategoriya nomini kiriting" />
          </Form.Item>

        </Form>
      </Modal>
      <Button className='btn blue' onClick={showModal}>Add</Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Pagination configuration
      />
    </div>
  );
};

export default Category;
