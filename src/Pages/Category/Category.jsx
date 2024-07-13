import { Button, Input, Modal, Table, Typography, Form, Select } from 'antd';
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
// getData
  const getCategory = () => {
    fetch('https://api.dezinfeksiyatashkent.uz/api/categories')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.data);
        setData(data?.data);
      });
  };
// getData
// Postdata
// const addModel = (values) => {
  
//   const token = localStorage.getItem('token');
  
//   fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
//     method: "POST",
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json' // Ensure correct content type if sending JSON data
//     },
//     body: JSON.stringify(values) // Convert JavaScript object to JSON string
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Xato so\'rov yuborildi');
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (data?.success) {
//       message.success("Model muvaffaqiyatli qo'shildi");
//       getModels(); // Refresh the models list
//       getBrands(); // Refresh the brands list if necessary
//       form.resetFields(); // Reset form fields after successful submission
//       setOpenAddModal(false); // Close the modal after successful submission
//     } else {
//       message.error(data?.message || "Model qo'shishda xatolik yuz berdi");
//       setOpenAddModal(false); 
//     }
//   })
//   .catch(error => {
//     console.error('Error adding model:', error);
//     message.error('Model qo\'shishda xatolik yuz berdi');
//   })
//   .finally(() => {
//     setLoading(false);
//   });
// };
  // PostData
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit(); // Formani yuborish
    setIsModalOpen(false);
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
      <Modal title="Add Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          // onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="name"
            label={<Title className='titles' level={4}>First Input Title</Title>}
            rules={[{ required: true, message: 'Please input the model name!' }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="brand_id"
            label={<Title className='titles' level={4}>Second Input Title</Title>}
            rules={[{ required: true, message: 'Please select the brand name!' }]}
          >
             <Input placeholder="Enter category Description " />
          </Form.Item>
        </Form>
      </Modal>
      <Button className='btn blue' onClick={showModal}>Add</Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
};

export default Category;
