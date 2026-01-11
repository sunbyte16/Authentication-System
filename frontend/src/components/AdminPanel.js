import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/users');
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditForm({
      email: user.email,
      username: user.username,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      is_active: user.is_active,
      is_admin: user.is_admin
    });
  };

  const handleUpdateUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8000/admin/users/${userId}`, editForm);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        setError(error.response?.data?.detail || 'Failed to delete user');
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="card">
      <h2>Admin Panel - User Management</h2>
      {error && <div className="error">{error}</div>}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Active</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Admin</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{userItem.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleFormChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    userItem.email
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleFormChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    userItem.username
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <div>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={editForm.first_name}
                        onChange={handleFormChange}
                        style={{ width: '100%', marginBottom: '5px' }}
                      />
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={editForm.last_name}
                        onChange={handleFormChange}
                        style={{ width: '100%' }}
                      />
                    </div>
                  ) : (
                    `${userItem.first_name || ''} ${userItem.last_name || ''}`.trim() || 'N/A'
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleFormChange}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    userItem.phone || 'N/A'
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={editForm.is_active}
                      onChange={handleFormChange}
                    />
                  ) : (
                    userItem.is_active ? '✓' : '✗'
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <input
                      type="checkbox"
                      name="is_admin"
                      checked={editForm.is_admin}
                      onChange={handleFormChange}
                    />
                  ) : (
                    userItem.is_admin ? '✓' : '✗'
                  )}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editingUser === userItem.id ? (
                    <div>
                      <button
                        onClick={() => handleUpdateUser(userItem.id)}
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleEditUser(userItem)}
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
                      >
                        Edit
                      </button>
                      {userItem.id !== user.id && (
                        <button
                          onClick={() => handleDeleteUser(userItem.id)}
                          style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;