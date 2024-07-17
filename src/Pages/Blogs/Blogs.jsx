import { Button, Table, Typography, Image, Modal, Form, Input, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import './Blogs.css'
const { Title } = Typography;

const Blogs = () => {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const urlimage = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/';
  const token = localStorage.getItem("accesstoken");

  useEffect(() => {
    getBlogs();
  }, []);

//  getBlogs
  const getBlogs = () => {
    fetch('https://api.dezinfeksiyatashkent.uz/api/blogs/')
      .then((res) => {
        if (!res?.ok) {
          throw new Error('Tarmoq javobi noto‘g‘ri');
        }
        return res?.json();
      })
      .then((data) => {
        setBlogs(data?.data);
      })
      .catch((error) => {
        console.error('Bloglarni yuklashda xatolik:', error);
      });
  };
//  getBlogs

  // editBlogs
  const editBlog = (blog) => {
    setEditingBlog(blog);
    setOpenModal(true);
    form.setFieldsValue({
      name_en: blog?.title_en,
      name_ru: blog?.title_ru,
      name_uz: blog?.title_uz,
      text_en: blog?.text_en,
      text_ru: blog?.text_ru,
      text_uz: blog?.text_uz,
      author: blog?.author,
    });
  };
  // editBlogs
  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append('title_en', values?.name_en);
      formData.append('title_ru', values?.name_ru);
      formData.append('title_uz', values?.name_uz);
      formData.append('text_en', values?.text_en);
      formData.append('text_ru', values?.text_ru);
      formData.append('text_uz', values?.text_uz);
      formData.append('author', values?.author);

      fileList.forEach(file => {
        formData.append('images', file);
      });

      let endpoint = 'https://api.dezinfeksiyatashkent.uz/api/blogs/';
      let method = 'POST';

      if (editingBlog) {
        endpoint += editingBlog?.id;
        method = 'PUT';
      }

      fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (!response?.ok) {
            return response?.json()?.then((err) => {
              throw new Error(err.message || 'Tarmoq javobi noto‘g‘ri');
            });
          }
          return response?.json();
        })
        .then((data) => {
          message.success('Blogs ma\'lumotlari saqlandi');
          getBlogs();
          setOpenModal(false);
          setFileList([]);
          form.resetFields();
          setEditingBlog(null); 
        })
        .catch((error) => {
          message.error('Xatolik yuz berdi, ma\'lumot saqlashda muammo.');
          console.error('Maqola saqlashda xatolik:', error);
        });
    });
  };

  // deleteBlogs
  const deleteBlog = (id) => {
    fetch(`https://api.dezinfeksiyatashkent.uz/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response?.ok) {
          throw new Error('Xato so‘rov yuborildi');
        }
        return response?.json();
      })
      .then(() => {
        message.success('Blog muvaffaqiyatli o‘chirildi');
        setBlogs(blogs.filter(blog => blog?.id !== id));
      })
      .catch((error) => {
        console?.error('Xatolik blogni o‘chirishda:', error);
        message?.error('Blogni o‘chirishda xatolik yuz berdi');
      });
  };

  // delteBlogs modal 
  const confirmDelete = (id) => {
    Modal.confirm({
      title: 'Siz rostdan ham o‘chirmoqchimisiz?',
      okText: 'Ha',
      okType: 'danger',
      cancelText: 'Yo‘q',
      onOk() {
        deleteBlog(id);
      },
    });
  };

  const handleCancel = () => {
    setOpenModal(false);
    setFileList([]);
    form?.resetFields();
    setEditingBlog(null); 
  };

  const beforeUpload = (file) => {
    setFileList([...fileList, file]);
    return false;
  };

  const openModalHandler = () => {
    setOpenModal(true);
    setFileList([]);
    form.resetFields();
    setEditingBlog(null); 
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
      title: 'Name Uz',
      dataIndex: 'title_uz',
      key: 'title_uz',
    },
    {
      title: 'Text Uz',
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
        <div className='buttons'>
          <Button className='green btn' onClick={() => editBlog(record)}>Edit</Button>
          <Button className='red btn' onClick={() => confirmDelete(record?.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal title={editingBlog ? "Tahrirlash" : "Qo‘shish"} visible={openModal} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name_en"
            label={<Title className='titles' level={4}>Name En </Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="name_ru"
            label={<Title className='titles' level={4}>Name Ru</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="name_uz"
            label={<Title className='titles' level={4}>Name Uz</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola nomini kiriting!' }]}
          >
            <Input placeholder="Maqola nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_en"
            label={<Title className='titles' level={4}>Text En </Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_ru"
            label={<Title className='titles' level={4}>Text Ru </Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="text_uz"
            label={<Title className='titles' level={4}>Text Uz</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola matnini kiriting!' }]}
          >
            <Input.TextArea rows={4} placeholder="Maqola matnini kiriting" />
          </Form.Item>
          <Form.Item
            name="author"
            label={<Title className='titles' level={4}>Author</Title>}
            rules={[{ required: true, message: 'Iltimos, maqola muallifini kiriting!' }]}
          >
            <Input placeholder="Maqola muallifini kiriting" />
          </Form.Item>
          <Form.Item
            label={<Title className='titles' level={4}>Image</Title>}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              beforeUpload={beforeUpload}
              fileList={fileList}
              multiple={true}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Button onClick={openModalHandler} className='btn add '>Add</Button>

      <Table dataSource={blogs} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
}

export default Blogs;
