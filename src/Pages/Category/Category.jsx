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
        console.log(data?.data);
        setData(data?.data);
      });
  };
// getData
// Postdata
// const postData=() =>{
//   fetch('https://api.dezinfeksiyatashkent.uz/api/categories', {
//     method: 'POST',
//     body: JSON.stringify({
//       // Add parameters here
//     })
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//      .then((response) => response.json())
//      .then((data) => {
//         console.log(data);
//         // Handle data
//      })
//      .catch((err) => {
//         console.log(err.message);
//      });
// }

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
