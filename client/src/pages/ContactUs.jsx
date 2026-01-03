import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem', maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ marginBottom: '1rem' }}>Contact Us</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    Have questions about our products or services? We're here to help.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Contact Info */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Get in Touch</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                color: 'var(--primary)'
                            }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Support & Sales</p>
                                <a href="mailto:support@abaranihosiery.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                                    support@abaranihosiery.com
                                </a>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                background: 'rgba(236, 72, 153, 0.1)',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                color: 'var(--secondary)'
                            }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Phone</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Mon-Fri from 9am to 6pm</p>
                                <a href="tel:+919876543210" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                                    +91 98765 43210
                                </a>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                background: 'rgba(56, 189, 248, 0.1)',
                                padding: '0.75rem',
                                borderRadius: '10px',
                                color: '#38bdf8'
                            }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Office</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    123 Hosiery Market Road,
                                    <br />
                                    Tirupur, Tamil Nadu 641604,
                                    <br />
                                    India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send us a Message</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Your Name</label>
                            <input type="text" className="input" placeholder="John Doe" />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input type="email" className="input" placeholder="john@example.com" />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
                            <textarea className="input" rows="4" placeholder="How can we help you?"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
