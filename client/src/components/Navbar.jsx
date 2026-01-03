import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, Package, ShoppingCart, LayoutDashboard, Users, Mail, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!user) return null;

    const isActive = (path) => location.pathname === path ? 'active' : '';

    // Get initials from user name
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <nav className="navbar">
            <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left Side - Logo and Brand */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/logo.png"
                        alt="Abarani Hosiery"
                        style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.02em', margin: 0, color: 'var(--text-main)' }}>
                            Abarani
                        </h1>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Hosiery
                        </span>
                    </div>
                    {user.role === 'admin' && <span className="badge-low-stock" style={{ marginLeft: '0.5rem' }}>ADMIN</span>}
                </Link>

                {/* Center - Navigation Links */}
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {user.role === 'admin' && (
                        <>
                            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                                <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Dashboard
                            </Link>
                            <Link to="/users" className={`nav-link ${isActive('/users')}`}>
                                <Users size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Users
                            </Link>
                        </>
                    )}
                    <Link to="/inventory" className={`nav-link ${isActive('/inventory')}`}>
                        <Package size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Inventory
                    </Link>
                    <Link to="/pos" className={`nav-link ${isActive('/pos')}`}>
                        <ShoppingCart size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} /> Sale
                    </Link>
                </div>

                {/* Right Side - User Profile Dropdown */}
                <div
                    className="user-profile-container"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <div className="user-profile-trigger">
                        <div className="user-avatar">
                            {getInitials(user.username)}
                        </div>
                        <span className="user-name">{user.username}</span>
                        <ChevronDown size={16} className={`chevron-icon ${showDropdown ? 'rotated' : ''}`} />
                    </div>

                    {/* Dropdown Menu */}
                    <div className={`user-dropdown ${showDropdown ? 'show' : ''}`}>
                        <div className="dropdown-header">
                            <div className="dropdown-avatar">
                                {getInitials(user.username)}
                            </div>
                            <div className="dropdown-user-info">
                                <span className="dropdown-username">{user.username}</span>
                                <span className="dropdown-role">{user.role === 'admin' ? 'Administrator' : 'Staff Member'}</span>
                            </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        <div className="dropdown-item email-item">
                            <Mail size={16} />
                            <span>{user.email || 'No email provided'}</span>
                        </div>

                        <div className="dropdown-divider"></div>

                        <button onClick={logout} className="dropdown-item logout-item">
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
