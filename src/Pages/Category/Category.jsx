import { Button, Input, Modal, Table, Typography, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Category.css';

const { Title } = Typography;

const Category = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Yangi state
  const [form] = Form.useForm();
  
  useEffect(() => {
    getCategory();
  }, []);
    
  // GetCategory
  const getCategory = () => {
    const token = localStorage.getItem('accesstoken');
    fetch('https://api.dezinfeksiyatashkent.uz/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        message.error('Ma\'lumotlar yuklanishida xatolik yuz berdi');
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

  // UpdateCategory
  const updateCategory = (id, values) => {
    const token = localStorage.getItem('accesstoken');
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);

    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: 'PUT',
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
          message.success('Kategoriya muvaffaqiyatli yangilandi');
          form.resetFields();
          setIsModalOpen(false);
          getCategory(); // Optionally refresh the category list
        } else {
          message.error(data?.message || 'Kategoriya yangilashda xatolik yuz berdi');
        }
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        message.error('Kategoriya yangilashda xatolik yuz berdi');
      });
  };
  // UpdateCategory

  // DeleteCategory
  const deleteCategory = (id) => {
    const token = localStorage.getItem('accesstoken');
    fetch(`https://api.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Xato so\'rov yuborildi');
        }
        return response.json();
      })
      .then(() => {
        message.success('Kategoriya muvaffaqiyatli o\'chirildi');
        setData(data => data.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        message.error('Kategoriya o\'chirishda xatolik yuz berdi');
      });
  };
  // Confirm delete
  const confirmDelete = (id) => {
    Modal.confirm({
      title: 'Siz rostdan ham o\'chirmoqchimisiz?',
      okText: 'Ha',
      okType: 'danger',
      cancelText: 'Yo\'q',
      onOk() {
        deleteCategory(id);
      },
    });
  };
  // DeleteCategory

  // Modal Functions
  const showModal = (category) => {
    setIsModalOpen(true);
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCategory) {
          updateCategory(editingCategory.id, values);
        } else {
          addModel(values);
        }
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };
  // Modal Functions

  // Table Columns
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
          <Button className='green btn' onClick={() => showModal(record)}>Edit</Button>
          <Button className='red btn' onClick={() => confirmDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];
  // Table Columns

  return (
    <div>
      <Modal title={editingCategory ? "Update Category" : "Add Category"} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={<Title className='titles' level={4}>Name</Title>}
            rules={[{ required: true, message: 'Iltimos, kategoriya nomini kiriting!' }]}
          >
            <Input placeholder="Kategoriya nomini kiriting" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<Title className='titles' level={4}>Description</Title>}
            rules={[{ required: true, message: 'Iltimos, kategoriya tavsifini kiriting!' }]}
          >
            <Input placeholder="Kategoriya tavsifini kiriting" />
          </Form.Item>
        </Form>
      </Modal>
      <Button className='btn blue' onClick={() => showModal(null)}>Add</Button>
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
