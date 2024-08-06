
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editingUser = location.state?.user || null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
        typeLogin: '',
    });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await axios.put(`http://localhost:5000/api/v1/user/${editingUser.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/v1/user', formData);
            }
            navigate('/admin/userlist');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleBack = async (e) => {
        navigate("/admin/userlist");

    }

    return (
        <div>
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Mobile:
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Type Login:
                    <input
                        type="text"
                        name="typeLogin"
                        value={formData.typeLogin}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
                <button onClick={() => handleBack()}>Back</button>
            </form>
        </div>
    );
};

export default UserForm;