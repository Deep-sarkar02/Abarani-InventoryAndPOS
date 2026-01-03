import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { API_URL } from '../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [lowStock, setLowStock] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch Monthly Stats
                const statsRes = await axios.get(`${API_URL}/api/sales/stats`, config);
                setStats(statsRes.data);

                // Fetch Low Stock
                const lowStockRes = await axios.get(`${API_URL}/api/products/low-stock`, config);
                setLowStock(lowStockRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="container" style={{ color: '#8b949e' }}>Loading Dashboard...</div>;

    const chartData = {
        labels: ['Total Sales', 'Cash', 'Online', 'Profit'],
        datasets: [
            {
                label: 'Monthly Metrics (₹)',
                data: stats ? [stats.totalSales, stats.cashSales, stats.onlineSales, stats.totalProfit] : [],
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
                borderRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#8b949e', font: { family: 'Inter' } } },
            title: { display: true, text: `Sales Overview: ${stats?.month || ''}`, color: '#f0f6fc', font: { family: 'Inter', size: 14 } },
        },
        scales: {
            y: { ticks: { color: '#8b949e', font: { family: 'Inter' } }, grid: { color: '#30363d' } },
            x: { ticks: { color: '#8b949e', font: { family: 'Inter' } }, grid: { display: false } }
        }
    };

    return (
        <div className="container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Dashboard Overview</h2>

            {stats && (
                <div className="grid-stats">
                    <div className="card stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <span style={{ color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Total Revenue</span>
                                <div className="stat-value" style={{ color: '#f0f6fc' }}>₹{stats.totalSales.toLocaleString()}</div>
                            </div>
                            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: '#6366f1' }}>
                                <BarChart3 size={24} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#8b949e' }}>
                            <span style={{ color: '#3fb950' }}>+{stats.salesCount}</span> sales this month
                        </div>
                    </div>
                    <div className="card stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <span style={{ color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Net Profit</span>
                                <div className="stat-value" style={{ color: '#3fb950' }}>₹{stats.totalProfit.toLocaleString()}</div>
                            </div>
                            <div style={{ padding: '8px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', color: '#10b981' }}>
                                <BarChart3 size={24} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#8b949e' }}>
                            Margin: {stats.totalSales > 0 ? ((stats.totalProfit / stats.totalSales) * 100).toFixed(1) : 0}%
                        </div>
                    </div>
                    <div className="card stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <span style={{ color: '#8b949e', fontSize: '0.875rem', fontWeight: '500' }}>Low Stock Items</span>
                                <div className="stat-value" style={{ color: lowStock.length > 0 ? '#da3633' : '#f0f6fc' }}>{lowStock.length}</div>
                            </div>
                            <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: '#ef4444' }}>
                                <AlertCircle size={24} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#8b949e' }}>
                            Requires attention
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Sales Analytics</h3>
                    <div style={{ height: '300px' }}>
                        <Bar options={chartOptions} data={chartData} />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                        Stock Alerts
                        {lowStock.length > 0 && <span className="badge-low-stock">{lowStock.length} ISSUES</span>}
                    </h3>

                    {lowStock.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#8b949e' }}>
                            <CheckCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Everything is fully stocked.</p>
                        </div>
                    ) : (
                        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                            <table className="table" style={{ fontSize: '0.875rem' }}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th style={{ textAlign: 'right' }}>Stock/Min</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStock.map(p => (
                                        <tr key={p._id}>
                                            <td>
                                                <div style={{ fontWeight: '500', color: '#f0f6fc' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>{p.size} • {p.color}</div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <span style={{ color: '#da3633', fontWeight: 'bold' }}>{p.stock}</span>
                                                <span style={{ color: '#586069' }}> / {p.minThreshold}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
