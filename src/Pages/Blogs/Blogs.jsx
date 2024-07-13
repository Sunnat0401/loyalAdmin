import { Button, Table, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
const urlimage = 'https://api.dezinfeksiyatashkent.uz/api/uploads/images/'
  useEffect(() => {
    getBrands();
  }, []);

  // getData
  const getBrands = () => {
    fetch('https://api.dezinfeksiyatashkent.uz/api/blogs/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.data);
        setBlogs(data?.data);
      });
  }

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
      title: 'Name_uz',
      dataIndex: 'name_uz',
      key: 'name_uz',
    },
    {
      title: 'Text_ux',
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

  return (
    <div>
      <Button >Add</Button>
      <Table dataSource={blogs} columns={columns} rowKey="id" />
    </div>
  );
}

export default Blogs;
