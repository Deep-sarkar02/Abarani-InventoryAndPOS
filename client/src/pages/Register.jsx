import { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await axios.post(`${API_URL}/api/auth/register`, formData);
            setSuccessMsg('Account created successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Create Account</h2>
                {errorMsg && (
                    <div style={{ backgroundColor: 'rgba(218, 54, 51, 0.1)', color: '#f85149', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{errorMsg}</div>
                )}
                {successMsg && (
                    <div style={{ backgroundColor: 'rgba(35, 134, 54, 0.15)', color: '#3fb950', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{successMsg}</div>
                )}
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label><User size={14} style={{ marginRight: '4px' }} /> Full Name</label>
                        <input className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                        <label><Mail size={14} style={{ marginRight: '4px' }} /> Email</label>
                        <input type="email" className="input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div>
                        <label><Lock size={14} style={{ marginRight: '4px' }} /> Password</label>
                        <input type="password" className="input" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required minLength={6} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
