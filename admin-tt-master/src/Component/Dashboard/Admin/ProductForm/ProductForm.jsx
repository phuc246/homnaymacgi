
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editingProduct = location.state?.product || null;

    const [formData, setFormData] = useState({
        id_pr:'',
        productName: '',
        code_cat: '',
        sub_cat: '',
        goWhere: '',
        styleFilter: '',
        eventFilter: '',
        priceProduct: '',
        productColor: '',
        size: '',
        soluong: '',
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        }
    }, [editingProduct]);

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
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input
                        type="text"
                        name="ID"
                        value={formData.id_pr}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                {/* <label>
                    Email:
                    <input
                        type="text"
                        name="name"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </label> */}
                <select
                        value={editProduct.code_cat}
                        onChange={(e) => setEditProduct({ ...editProduct, code_cat: e.target.value })}
                    >
                        <option value="">Category</option>
                        <option value="Top">Top</option>
                        <option value="Bottom">Bottom</option>                            
                        <option value="Outerwear">Outerwear</option>                            
                        <option value="Handbag">Handbag</option>                            
                        {/* Add other options as needed */}
                    </select>
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

export default ProductForm;