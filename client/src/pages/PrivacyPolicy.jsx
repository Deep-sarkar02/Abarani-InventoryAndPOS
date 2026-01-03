import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
            <div className="card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Shield size={32} color="var(--primary)" />
                    <h1>Privacy Policy</h1>
                </div>

                <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Last updated: January 3, 2026
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                        At Abarani Hosiery, accessible from our application, one of our main priorities is the privacy of our visitors.
                        This Privacy Policy document contains types of information that is collected and recorded by Abarani Hosiery
                        and how we use it.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Information We Collect</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We collect information that you provide directly to us when you register for an account,
                        make a purchase, or communicate with us. This may include:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li>Name and contact information</li>
                        <li>Account credentials</li>
                        <li>Transaction history</li>
                        <li>Inventory and sales data</li>
                    </ul>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>How We Use Your Information</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We use the information we collect to:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                        <li>Provide, operate, and maintain our application</li>
                        <li>Improve, personalize, and expand our application</li>
                        <li>Understand and analyze how you use our application</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Process your transactions and manage your orders</li>
                    </ul>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Data Security</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We implement appropriate technical and organizational security measures to protect your personal information
                        against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
