import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, User, LogIn, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar glass">
            <Link to="/" className="nav-brand">
                <div className="float">
                    <Rocket size={32} />
                </div>
                <span>KidEduQuest</span>
            </Link>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/dashboard" className="nav-link">Learning Hub</Link>

                {user ? (
                    <Link to="/profile" className="user-menu-btn" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255,255,255,0.8)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        border: '2px solid var(--primary-light)'
                    }}>
                        <div style={{ width: '30px', height: '30px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                            <span style={{ fontWeight: 800, color: 'var(--text-dark)' }}>{user.name}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Trophy size={12} color="gold" /> {user.points}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                        <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px' }}>
                            <User size={18} />
                            <span>Sign Up</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
