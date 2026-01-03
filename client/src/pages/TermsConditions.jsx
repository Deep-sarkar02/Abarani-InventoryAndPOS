import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const TermsConditions = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
            <div className="card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <FileText size={32} color="var(--primary)" />
                    <h1>Terms and Conditions</h1>
                </div>

                <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Please read these terms and conditions carefully before using the Abarani Hosiery application.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Acceptance of Terms</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms,
                        then you may not access the service.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Accounts</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        When you create an account with us, you must provide us with information that is accurate, complete, and current at all times.
                        Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Purchases and Inventory</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information
                        relevant to your Purchase. We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to:
                        product or service availability, errors in the description or price of the product or service, or error in your order.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Intellectual Property</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of Abarani Hosiery and its licensors.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Termination</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever,
                        including without limitation if you breach the Terms.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change
                        will be determined at our sole discretion.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
