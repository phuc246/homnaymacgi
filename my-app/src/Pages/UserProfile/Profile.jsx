import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './Profile.css'; // Import CSS file
import { AuthContext } from '../../AuthContext';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const { user : authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {           
    if (!authUser) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [authUser, navigate]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/user', {
          headers: {        
            Authorization: localStorage.getItem('user')
          }
        });
        setUser(response.data);
        setEditData(response.data.userData);
    } catch (error) {
      setError(error)
    }
    
  }

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem('user');
    axios.put(`http://localhost:5000/api/v1/user/${editData.id}`, editData, {
      headers: {        
        Authorization: token
      }
    })
    .then((response) => {
      setUser(response.data);
      setIsEditing(false);
      fetchUser();
    })
    .catch((error) => {
      setError('Failed to update user data');
      console.log(error)
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Thông tin cá nhân</h1>
      {error && <p className="error">{error}</p>}
      <div className="user-info">
        {isEditing ? (
          <div>
            <label>
              Email: 
              <input 
                type="email" 
                name="email" 
                value={editData.email} 
                onChange={handleEditChange}
              />
            </label>
            <label>
              Họ và tên: 
              <input 
                type="text" 
                name="name" 
                value={editData.name} 
                onChange={handleEditChange}
              />
            </label>
            <label>
              Số điện thoại: 
              <input 
                type="text" 
                name="mobile" 
                value={editData.mobile} 
                onChange={handleEditChange}
              />
            </label>
            <label>
              Địa chỉ: 
              <input 
                type="text" 
                name="address" 
                value={editData.address} 
                onChange={handleEditChange}
              />
            </label>
            <button onClick={handleSave} className="save-button">Lưu</button>
          </div>
        ) : (
          <div>
            <p>Email: {user.userData.email}</p>
            <p>Họ và tên: {user.userData.name}</p>
            <p>Số điện thoại: {user.userData.mobile}</p>
            <p>Địa chỉ: {user.userData.address}</p>
            <button onClick={() => setIsEditing(true)} className="edit-button">Chỉnh sửa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
