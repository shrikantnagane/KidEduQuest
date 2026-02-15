import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { getContent } from '../services/contentService';
import './ContentIndex.css';

const ContentIndex = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { grade, subject, method, level } = location.state || {};

    const topics = getContent({ grade, subject, level, method });

    const handleTopicSelect = (topic, index) => {
        // Navigate to the specific module with the full sequence
        navigate(`/module/${method}`, {
            state: {
                grade,
                subject,
                method,
                level,
                topics,
                currentIndex: index
            }
        });
    };

    return (
        <div className="content-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h1 className="title-large" style={{ fontSize: '2.5rem' }}>Topic Island 🏝️</h1>
                <p style={{ color: 'var(--text-light)' }}>
                    {grade} • {subject} • {level} Level • {method} Method
                </p>

                <div className="topic-list">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            className={`topic-item ${topic.completed ? 'completed' : ''}`}
                            role="button"
                            onClick={() => handleTopicSelect(topic, index)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="topic-info">
                                <h3>{topic.title}</h3>
                                <p>{topic.desc}</p>
                            </div>
                            <div className="topic-status">
                                <PlayCircle size={24} color="var(--secondary)" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ContentIndex;
