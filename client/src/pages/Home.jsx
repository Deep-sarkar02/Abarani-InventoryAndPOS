import { Link } from 'react-router-dom';
import { Package, ShoppingCart, BarChart3, Shield, Zap, Users, ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: <Package size={28} />,
            title: 'Inventory Management',
            description: 'Track stock levels, manage products, and get low-stock alerts in real-time.'
        },
        {
            icon: <ShoppingCart size={28} />,
            title: 'Point of Sale',
            description: 'Fast and efficient billing system with invoice generation and payment tracking.'
        },
        {
            icon: <BarChart3 size={28} />,
            title: 'Analytics Dashboard',
            description: 'Comprehensive insights into sales, revenue, and business performance.'
        },
        {
            icon: <Users size={28} />,
            title: 'User Management',
            description: 'Role-based access control for admins and staff members.'
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-gradient"></div>
                <div className="hero-bg-pattern"></div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <Sparkles size={14} />
                        <span>Powered by Modern Technology</span>
                    </div>

                    <h1 className="hero-title">
                        Welcome to <span className="gradient-text">Abarani Hosiery</span>
                    </h1>

                    <p className="hero-subtitle">
                        Streamline your hosiery business with our comprehensive inventory management
                        and point-of-sale solution. Designed for efficiency, built for growth.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/login" className="btn-hero-primary">
                            <Shield size={20} />
                            Admin Login
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/login" className="btn-hero-secondary">
                            <Users size={20} />
                            Staff Login
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">24/7</span>
                            <span className="hero-stat-label">System Uptime</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">100%</span>
                            <span className="hero-stat-label">Secure</span>
                        </div>
                        <div className="hero-stat-divider"></div>
                        <div className="hero-stat">
                            <span className="hero-stat-value"><Zap size={18} /></span>
                            <span className="hero-stat-label">Fast & Reliable</span>
                        </div>
                    </div>
                </div>

                {/* Floating Cards Animation */}
                <div className="floating-cards">
                    <div className="floating-card card-1">
                        <Package size={24} />
                        <span>500+ Products</span>
                    </div>
                    <div className="floating-card card-2">
                        <ShoppingCart size={24} />
                        <span>Quick Sales</span>
                    </div>
                    <div className="floating-card card-3">
                        <BarChart3 size={24} />
                        <span>Real-time Stats</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <h2 className="features-heading">
                        Everything you need to <span className="gradient-text">manage your business</span>
                    </h2>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src="/logo.png" alt="Abarani Hosiery" className="footer-logo-img" />
                        <div className="footer-brand-text">
                            <span>Abarani Hosiery</span>
                            <small>Premium Undergarments & Hosiery Goods</small>
                        </div>
                    </div>

                    <div className="footer-links">
                        <Link to="/privacy-policy">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-conditions">
                            Terms of Service
                        </Link>
                        <Link to="/contact-us">
                            Contact Us
                        </Link>
                    </div>

                    <p className="footer-text">
                        © 2026 Abarani Hosiery. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
