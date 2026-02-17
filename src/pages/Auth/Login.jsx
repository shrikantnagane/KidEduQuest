import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <h2 className="auth-title">Welcome Back! 😊</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Login to Learn
                    </button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Join the Quest</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
