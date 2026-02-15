import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { BookOpen, PenTool, Puzzle, Terminal, Trophy, ChevronRight, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { useAuth } from '../context/AuthContext'; // Added useAuth
import './Home.css';

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { user } = useAuth(); // Use Auth context

    const handleStartQuest = () => {
        navigate('/dashboard');
    };

    return (
        <div className="home-container">
            <section className="hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        The Magic Space For <span>Super Learners! 🚀</span>
                    </h1>
                    <p className="hero-desc">
                        Explore, play, and learn amazing things! From Nursery to Grade 4,
                        discover worlds of English, Math, Science, and even Coding.
                    </p>
                    <div className="hero-cta">
                        <button onClick={handleStartQuest} className="btn btn-primary"> {/* Changed to button and added onClick */}
                            Get Started Free <ArrowRight size={20} /> {/* Changed icon */}
                        </button>
                        <Link to="/dashboard" className="btn btn-secondary">
                            See How It Works
                        </Link>
                    </div>
                </motion.div>

                <div className="hero-image">
                    <motion.div
                        className="main-img float"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Using a placeholder-like representation until real images are generated */}
                        <div style={{ width: '400px', height: '400px', borderRadius: '50px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', opacity: 0.8 }}></div>
                    </motion.div>

                    <motion.div className="floating-card card-1 float" style={{ animationDelay: '0.5s' }}>
                        <BookOpen size={20} /> Reading 📚
                    </motion.div>
                    <motion.div className="floating-card card-2 float" style={{ animationDelay: '1s' }}>
                        <Trophy size={20} /> Play & Win 🏆
                    </motion.div>
                    <motion.div className="floating-card card-3 float" style={{ animationDelay: '1.5s' }}>
                        <Terminal size={20} /> Start Coding 💻
                    </motion.div>
                </div>
            </section>

            <section className="features container">
                <div className="feature-card glass">
                    <div className="feature-icon" style={{ background: '#FF6B6B' }}>
                        <BookOpen size={40} />
                    </div>
                    <h3>Reading Worlds</h3>
                    <p>Beautiful stories with big fonts, perfect for every grade level.</p>
                </div>

                <div className="feature-card glass">
                    <div className="feature-icon" style={{ background: '#4ECDC4' }}>
                        <PenTool size={40} />
                    </div>
                    <h3>Writing Fun</h3>
                    <p>Practice writing with instant magic feedback. Correct is Green!</p>
                </div>

                <div className="feature-card glass">
                    <div className="feature-icon" style={{ background: '#FFE66D', color: '#2D3436' }}>
                        <Puzzle size={40} />
                    </div>
                    <h3>Activity Hub</h3>
                    <p>Interactive puzzles that make Math and Science feel like play.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
