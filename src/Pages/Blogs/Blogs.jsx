import { Button, Table, Typography, Image, Modal, Form, Input, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const Blogs = () => {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const urlimage = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/';
  const token = 'YOUR_TOKEN_HERE'; // TOKEN ni shu yerda kiritamiz

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    fetch('https://api.dezinfeksiyatashkent.uz/api/blogs/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data?.data);
        setBlogs(data?.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  };

 const columns = [
    {
      title: 'Image',
      dataIndex: 'blog_images',
      key: 'image',
      render: (blog_images) => (
        <Image width={100} src={`${urlimage}${blog_images[0]?.image?.src}`} />
      ),
    },
    {
      title: 'Name uz',
      dataIndex: 'title_uz',
      key: 'title_uz',
    },
    {
      title: 'Text uz',
      dataIndex: 'text_uz',
      key: 'text_uz',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
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

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const addBlog = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append('title_en', values.name_en);
      formData.append('title_ru', values.name_ru);
      formData.append('title_uz', values.name_uz);
      formData.append('text_en', values.text_en);
      formData.append('text_ru', values.text_ru);
      formData.append('text_uz', values.text_uz);
      formData.append('author', values.author);
      formData.append('images', values.author);

      console.log('FormData:', ...formData.entries());

      fetch('https://api.dezinfeksiyatashkent.uz/api/blogs/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || 'Network response was not ok');
            });
          }
          return response.json();
        })
        .then((data) => {
          message.success('Maqola muvaffaqiyatli qo\'shildi');
          getBlogs();
          setOpenModal(false);
        })
        .catch((error) => {
          message.error('Xatolik yuz berdi, maqola qo\'shishda muammo.');
          console.error('Maqola qo\'shishda xatolik:', error);
        });
    });
  };

  return (
    <div>
  <Modal title="Add" open={openModal} onOk={addBlog} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name_en"
            label={<Title className='titles' level={4}>Nomi (Inglizcha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="name_ru"
            label={<Title className='titles' level={4}>Nomi (Ruscha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="name_uz"
            label={<Title className='titles' level={4}>Nomi (O'zbekcha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_en"
            label={<Title className='titles' level={4}>Matn (Inglizcha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_ru"
            label={<Title className='titles' level={4}>Matn (Ruscha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_uz"
            label={<Title className='titles' level={4}>Matn (O'zbekcha)</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="author"
            label={<Title className='titles' level={4}>Muallif</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola muallifini kiriting!' }]}
          >
            <Input placeholder="Maqola muallifini kiriting" />
          </Form.Item>
          <Upload 
          name='image'
          label={<Title className='titles' level={4}>Upload</Title>}
          rules={[{ required: true, message: 'Iltimos, Rasm kiriting!' }]}
          />
        </Form>
      </Modal>

      <Button onClick={openModalHandler}>Maqola qo'shish</Button>

      <Table dataSource={blogs} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
}

export default Blogs;
