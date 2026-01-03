import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserPlus, Users, Mail, Lock, User, Trash2 } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'user'
    });

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchUsers = async () => {
        try {
            // We need to create a GET users endpoint for admin
            const res = await axios.get(`${API_URL}/api/auth/users`, config);
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/api/auth/register`, formData, config);
            setShowForm(false);
            setFormData({ name: '', email: '', password: '', role: 'user' });
            toast.success(`User "${formData.name}" created successfully!`);
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating user');
        }
    };

    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
            try {
                await axios.delete(`${API_URL}/api/auth/${userId}`, config);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error deleting user');
            }
        }
    };

    if (loading) return <div className="container" style={{ color: '#8b949e' }}>Loading Users...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>User Management</h2>
                    <p style={{ color: '#8b949e', margin: 0 }}>Create and manage user accounts.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <UserPlus size={18} /> Add User
                </button>
            </div>



            {showForm && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Create New User</h3>



                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>
                                <User size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Full Name
                            </label>
                            <input
                                className="input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>
                                <Mail size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Email Address
                            </label>
                            <input
                                type="email"
                                className="input"
                                placeholder="user@abarani.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>
                                <Lock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Password
                            </label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Role</label>
                            <select
                                className="input"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="user">User (Staff)</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">
                                <UserPlus size={18} /> Create User
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} /> All Users ({users.length})
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>
                                        <div style={{ fontWeight: '500', color: '#f0f6fc' }}>{u.name}</div>
                                    </td>
                                    <td style={{ color: '#8b949e' }}>{u.email}</td>
                                    <td>
                                        {u.role === 'admin' ? (
                                            <span className="badge-low-stock">ADMIN</span>
                                        ) : (
                                            <span className="chip chip-success">USER</span>
                                        )}
                                    </td>
                                    <td>
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => handleDelete(u._id, u.name)}
                                                style={{ background: 'none', border: 'none', color: '#da3633', cursor: 'pointer', padding: '4px' }}
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </td>
                                    <td style={{ color: '#8b949e', fontSize: '0.875rem' }}>
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#8b949e' }}>
                            No users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
