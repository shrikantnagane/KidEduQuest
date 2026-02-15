import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call auth context signup
        signup(formData.name, formData.email, formData.phone, formData.password);
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass">
                <h2 className="auth-title">Create Account 🚀</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>What's your name?</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="e.g. Alex"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Email (or parent's)</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="alex@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number (Optional)</label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-input"
                            placeholder="+1 234 567 8900"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pick a Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        Start My Quest
                    </button>
                </form>
                <div className="auth-footer">
                    <p>Already a member? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
