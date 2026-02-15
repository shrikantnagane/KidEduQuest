import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Star, Zap } from 'lucide-react';
import './LevelSelection.css';

const LevelSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { grade, subject, method } = location.state || {};

    const handleLevelSelect = (level) => {
        navigate('/content', { state: { grade, subject, method, level } });
    };

    return (
        <div className="levels-container">
            <motion.h1
                className="title-large"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                Choose Your Challenge! 🏆
            </motion.h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
                {grade} • {subject} • {method}
            </p>

            <div className="level-cards">
                <motion.div
                    className="level-card level-easy"
                    role="button"
                    onClick={() => handleLevelSelect('Easy')}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="level-icon">🌱</div>
                    <span className="level-name">Easy</span>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Perfect to start!</p>
                </motion.div>

                <motion.div
                    className="level-card level-medium"
                    role="button"
                    onClick={() => handleLevelSelect('Medium')}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="level-icon">🌟</div>
                    <span className="level-name">Medium</span>
                    <p style={{ fontWeight: 600 }}>A bit tricky!</p>
                </motion.div>

                <motion.div
                    className="level-card level-hard"
                    role="button"
                    onClick={() => handleLevelSelect('Hard')}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="level-icon">🔥</div>
                    <span className="level-name">Hard</span>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Master level!</p>
                </motion.div>
            </div>
        </div>
    );
};

export default LevelSelection;
