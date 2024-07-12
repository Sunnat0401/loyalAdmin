import { Input, Button, Form, message } from 'antd';
import './LoginPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('accesstoken');

    useEffect(() => {
        if (token) {
            navigate('/home'); // Navigate to '/home' if token exists
        }
    }, [navigate, token]);

    const handleSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('phone_number', number);
        formData.append('password', password);

        fetch('https://api.dezinfeksiyatashkent.uz/api/auth/signin', {
            method: 'POST',
            body: formData
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data?.success === true) {
                message.success(data?.message);
                localStorage.setItem('accesstoken', data?.data?.tokens?.accessToken?.token);
                navigate('/home'); // Navigate to '/home' on successful login
            } else {
                message.error(data?.message);
            }
        })
        .catch((err) => {
            console.error('Fetch Error:', err);
            message.error('Xato yuz berdi!');
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className='login-page'>
            <div className="container">
                <Form
                    onFinish={handleSubmit}
                    className="login-form"
                    name="login"
                    initialValues={{ remember: true }}
                    layout="vertical"
                >
                    <Form.Item
                        label="Telefon raqam"
                        name="phone_number"
                        rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting!' }]}
                    >
                        <Input onChange={(e) => setNumber(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Parol"
                        name="password"
                        rules={[{ required: true, message: 'Iltimos, parolingizni kiriting!' }]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                            {loading ? "Yunorilmoqda" : "Kirish"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
