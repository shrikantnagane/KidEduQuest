import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen, Calculator, Microscope, Gamepad2, Code,
    BookText, PenTool, Puzzle, Rocket, GraduationCap, Layout
} from 'lucide-react';
import './Dashboard.css';

const GRADES = ['Nursery', 'Jr. KG', 'Sr. KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'];
const SUBJECTS = [
    { name: 'English', icon: <BookOpen size={20} />, color: '#FF6B6B' },
    { name: 'Mathematics', icon: <Calculator size={20} />, color: '#4ECDC4' },
    { name: 'Science', icon: <Microscope size={20} />, color: '#FFE66D' },
];
const METHODS = [
    { id: 'reading', name: 'Reading', icon: <BookText size={20} /> },
    { id: 'writing', name: 'Writing', icon: <PenTool size={20} /> },
    { id: 'activity', name: 'Activity', icon: <Puzzle size={20} /> },
    { id: 'games', name: 'Small Games', icon: <Gamepad2 size={20} /> },
    { id: 'coding', name: 'Coding Choice', icon: <Code size={20} /> },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleLaunch = () => {
        if (selectedGrade && selectedSubject && selectedMethod) {
            navigate('/levels', { state: { grade: selectedGrade, subject: selectedSubject, method: selectedMethod } });
        } else {
            alert('Please select all options to start! ✨');
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="title-large" style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>
                Start Your Learning Adventure! 🚀
            </h1>

            {/* Grade Selection */}
            <motion.section
                className="selection-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <h2 className="selection-title">
                    <GraduationCap size={24} color="var(--primary)" /> 1. Pick Your Grade
                </h2>
                <div className="selection-row">
                    {GRADES.map(grade => (
                        <div
                            key={grade}
                            className={`option-card ${selectedGrade === grade ? 'selected' : ''}`}
                            onClick={() => setSelectedGrade(grade)}
                        >
                            <div className="option-label">{grade}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Subject Selection */}
            <motion.section
                className="selection-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="selection-title">
                    <BookOpen size={24} color="var(--secondary)" /> 2. Choose a Subject
                </h2>
                <div className="selection-row">
                    {SUBJECTS.map(sub => (
                        <div
                            key={sub.name}
                            className={`option-card ${selectedSubject === sub.name ? 'selected' : ''}`}
                            onClick={() => setSelectedSubject(sub.name)}
                        >
                            <div className="option-icon" style={{ color: sub.color }}>{sub.icon}</div>
                            <div className="option-label">{sub.name}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Learning Method Selection */}
            <motion.section
                className="selection-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="selection-title">
                    <Layout size={24} color="var(--accent)" /> 3. Learning Method
                </h2>
                <div className="method-options">
                    {METHODS.map(method => (
                        <div
                            key={method.id}
                            className={`radio-group ${selectedMethod === method.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod(method.id)}
                        >
                            <div className="radio-circle">
                                {selectedMethod === method.id && <div className="radio-dot" />}
                            </div>
                            <div className="method-icon">{method.icon}</div>
                            <div className="option-label">{method.name}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Launch Button */}
            <div className="launch-btn-container">
                <button
                    className="btn btn-primary launch-btn"
                    onClick={handleLaunch}
                    disabled={!selectedGrade || !selectedSubject || !selectedMethod}
                >
                    <Rocket size={24} /> Launch My Quest!
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
