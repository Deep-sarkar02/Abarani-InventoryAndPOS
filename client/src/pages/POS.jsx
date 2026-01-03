import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { API_URL } from '../config';

const POS = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [successMsg, setSuccessMsg] = useState('');

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/products`, config);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const productDetails = products.find(p => p._id === selectedProduct);

    const handleSale = async (e) => {
        e.preventDefault();
        if (!productDetails) return;

        try {
            await axios.post(`${API_URL}/api/sales`, {
                productId: selectedProduct,
                quantity: Number(quantity),
                paymentMethod
            }, config);

            setSuccessMsg(`Sale Complete: ₹${productDetails.sp * quantity}`);
            setQuantity(1);
            setSelectedProduct('');
            // Refresh products
            const res = await axios.get(`${API_URL}/api/products`, config);
            setProducts(res.data);

            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            alert(err.response?.data?.message || 'Sale Failed');
        }
    };

    return (
        <div className="container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Point of Sale</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <div className="card">
                    {successMsg && (
                        <div style={{ backgroundColor: 'rgba(35, 134, 54, 0.15)', color: '#3fb950', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(35, 134, 54, 0.2)' }}>
                            <CheckCircle size={20} /> {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSale}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Select Product</label>
                            <select
                                className="input"
                                value={selectedProduct}
                                onChange={e => setSelectedProduct(e.target.value)}
                                required
                                style={{ height: '3rem' }} // Taller touch target
                            >
                                <option value="">-- Search or Select Product --</option>
                                {products.map(p => (
                                    <option key={p._id} value={p._id} disabled={p.stock <= 0}>
                                        {p.name} - {p.size} ({p.color}) [Stock: {p.stock}]
                                    </option>
                                ))}
                            </select>
                        </div>

                        {productDetails ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unit Price</div>
                                    <div style={{ fontWeight: '700', fontSize: '1.25rem', color: '#f0f6fc' }}>₹{productDetails.sp}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inventory</div>
                                    <div style={{ fontWeight: '700', fontSize: '1.25rem', color: productDetails.stock < 10 ? '#f85149' : '#3fb950' }}>{productDetails.stock}</div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '1.5rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--border)', textAlign: 'center', color: '#8b949e' }}>
                                <Package size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                <p>Select a product to view details</p>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Quantity</label>
                                <input
                                    type="number"
                                    className="input"
                                    min="1"
                                    max={productDetails?.stock || 100}
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Payment Mode</label>
                                <select
                                    className="input"
                                    value={paymentMethod}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">Cash Payment</option>
                                    <option value="online">Online / UPI</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#8b949e' }}>Total Amount</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3fb950' }}>
                                    ₹{productDetails ? (productDetails.sp * quantity).toLocaleString() : 0}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }} disabled={!productDetails || productDetails.stock < quantity}>
                                <ShoppingCart size={18} /> Complete Sale
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card" style={{ position: 'sticky', top: '100px' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Guide</h3>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#f0f6fc', lineHeight: '1.8' }}>
                        <li>Select a product to check stock availability.</li>
                        <li>Enter the quantity sold.</li>
                        <li>Choose <strong>Cash</strong> or <strong>Online</strong> payment.</li>
                        <li>Click <strong>Complete Sale</strong> to finalize.</li>
                        <li>Stock is deducted automatically.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default POS;
