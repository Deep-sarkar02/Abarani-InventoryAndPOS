import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', company: '', color: '', size: '', cp: '', sp: '', stock: '', minThreshold: 5
    });

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/products`, config);
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/products`, formData, config);
            setShowForm(false);
            setFormData({ name: '', company: '', color: '', size: '', cp: '', sp: '', stock: '', minThreshold: 5 });
            toast.success('Product added successfully!');
            fetchProducts();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Error adding product');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="container" style={{ color: '#8b949e' }}>Loading Inventory...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Inventory</h2>
                    <p style={{ color: '#8b949e', margin: 0 }}>Manage your stock and products.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem', animation: 'fadeIn 0.2s ease-out' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Add New Product</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input className="input" placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <input className="input" placeholder="Company/Brand" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                        <input className="input" placeholder="Color" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} required />
                        <input className="input" placeholder="Size" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} required />
                        <input className="input" type="number" placeholder="Cost Price (₹)" value={formData.cp} onChange={e => setFormData({ ...formData, cp: e.target.value })} required />
                        <input className="input" type="number" placeholder="Selling Price (₹)" value={formData.sp} onChange={e => setFormData({ ...formData, sp: e.target.value })} required />
                        <input className="input" type="number" placeholder="Initial Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                        <input className="input" type="number" placeholder="Min Alert Threshold" value={formData.minThreshold} onChange={e => setFormData({ ...formData, minThreshold: e.target.value })} required />
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Save Product</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#8b949e' }} />
                    <input
                        className="input"
                        style={{ paddingLeft: '2.5rem', marginBottom: 0, maxWidth: '400px' }}
                        placeholder="Search by product name or company..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Details</th>
                                <th>Variant</th>
                                <th>Pricing (CP/SP)</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(p => (
                                <tr key={p._id}>
                                    <td>
                                        <div style={{ fontWeight: '500', color: '#f0f6fc' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>{p.company}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.875rem' }}>{p.size}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>{p.color}</div>
                                    </td>
                                    <td>
                                        <span style={{ color: '#8b949e' }}>₹{p.cp}</span>
                                        <span style={{ margin: '0 0.5rem', color: '#30363d' }}>/</span>
                                        <span style={{ color: '#f0f6fc', fontWeight: '500' }}>₹{p.sp}</span>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{p.stock}</td>
                                    <td>
                                        {p.stock <= p.minThreshold ? (
                                            <span className="chip chip-danger">
                                                <AlertCircle size={12} style={{ marginRight: '4px' }} /> Low
                                            </span>
                                        ) : (
                                            <span className="chip chip-success">
                                                <CheckCircle size={12} style={{ marginRight: '4px' }} /> Good
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#8b949e' }}>
                            No products found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
