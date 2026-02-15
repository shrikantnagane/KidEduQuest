import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Trophy, Star, History, BarChart, LogOut, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null; // or a loader
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Calculate mastery based on history (mock for now)
    const subjectStats = {
        'English': 65,
        'Mathematics': 80,
        'Science': 45
    };

    // Weekly activity mock data
    const weeklyActivity = [30, 45, 20, 60, 40, 90, 10]; // M T W T F S S

    return (
        <div className="profile-container">
            <header className="profile-header glass">
                <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p className="level-badge">🚀 Space Explorer</p>
                    <div className="profile-stats-row">
                        <div className="stat-pill">
                            <Trophy size={16} color="gold" /> {user.points} Points
                        </div>
                        <div className="stat-pill">
                            <Star size={16} color="orange" /> {user.badges?.length || 0} Badges
                        </div>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} /> Logout
                </button>
            </header>

            <div className="profile-content">
                {/* Stats & Graphs Section */}
                <div className="profile-main">
                    <motion.section
                        className="glass card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3><BarChart size={20} /> Learning Progress</h3>
                        <div className="chart-container">
                            <div className="bar-chart">
                                {weeklyActivity.map((val, i) => (
                                    <div key={i} className="bar-col">
                                        <div
                                            className="bar-fill"
                                            style={{ height: `${val}%`, backgroundColor: `hsl(${180 + val}, 70%, 50%)` }}
                                        />
                                        <span className="bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-light)', fontSize: '0.9rem' }}>Weekly Activity</p>
                        </div>
                    </motion.section>

                    <motion.section
                        className="glass card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3><Award size={20} /> Subject Mastery</h3>
                        <div className="skills-chart">
                            {Object.entries(subjectStats).map(([subject, score], i) => (
                                <div key={subject} className="skill-row">
                                    <div className="skill-info">
                                        <span>{subject}</span>
                                        <span>{score}%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <motion.div
                                            className="skill-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${score}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* History Section */}
                <aside className="profile-sidebar">
                    <motion.div
                        className="glass card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3><History size={20} /> Recent History</h3>
                        <div className="history-list">
                            {user.history && user.history.length > 0 ? (
                                user.history.slice(0, 5).map((item, index) => (
                                    <div key={index} className="history-item">
                                        <div className="history-icon" style={{ background: item.type === 'Reading' ? '#e3f2fd' : '#e8f5e9' }}>
                                            {item.type === 'Reading' ? '📚' : item.type === 'Writing' ? '✍️' : '🧩'}
                                        </div>
                                        <div className="history-col">
                                            <span className="history-title">{item.title}</span>
                                            <span className="history-date">Today • +{item.score} pts</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-state">No activities yet. Go learn something! 🎒</p>
                            )}
                        </div>
                    </motion.div>
                </aside>
            </div>
        </div>
    );
};

export default UserProfile;
