import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, Info, ArrowRight, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Modules.css';

import { useAuth } from '../../context/AuthContext';
import GuestLimitModal from '../../components/GuestLimitModal';

const WritingModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, addPoints, addHistory } = useAuth();
    const { topics = [], currentIndex: initialIndex = 0 } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const topic = topics[currentIndex] || location.state?.topic || {};

    const [userInput, setUserInput] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [multiInputs, setMultiInputs] = useState({});
    const [score, setScore] = useState(0);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    // For real-time transcription feedback
    const target = topic?.target || "";

    useEffect(() => {
        setUserInput("");
        setMultiInputs({});
        setIsComplete(false);
        setScore(0);
    }, [currentIndex, topic.id]);

    const executeNext = () => {
        if (currentIndex < topics.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/content', { state: location.state });
        }
    };

    const handleActionWithAuthCheck = (action) => {
        if (!user) {
            setShowGuestModal(true);
            setPendingAction(() => action);
        } else {
            action();
        }
    };

    const handleModalClose = () => {
        setShowGuestModal(false);
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
    };

    const handleNextQuest = () => {
        handleActionWithAuthCheck(executeNext);
    };

    const triggerSuccess = () => {
        setIsComplete(true);
        setScore(100);
        addPoints(100);
        addHistory({
            title: `Wrote: ${topic.title || topic.question?.substring(0, 20)}...`,
            type: 'Writing',
            score: 100,
            date: new Date().toISOString()
        });
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const handleStandardChange = (e) => {
        const val = e.target.value;
        setUserInput(val);
        if (val.toLowerCase().trim() === target.toLowerCase().trim()) {
            triggerSuccess();
        }
    };

    const handleMultiChange = (id, val, correctAns) => {
        const newInputs = { ...multiInputs, [id]: val };
        setMultiInputs(newInputs);

        // Check if all are correct
        if (topic.type === 'multi-missing' || topic.type === 'multi-first') {
            const allCorrect = topic.items.every((item, idx) =>
                (newInputs[idx] || "").toLowerCase().trim() === item.ans.toLowerCase().trim()
            );
            if (allCorrect) triggerSuccess();
        } else if (topic.type === 'free-write') {
            const count = topic.count || 3;
            // Check if we have enough non-empty inputs
            const filledCount = Object.keys(newInputs).filter(k => parseInt(k) < count && newInputs[k] && newInputs[k].trim() !== "").length;
            if (filledCount >= count) triggerSuccess();
        }
    };

    const handleTranscriptionChange = (e) => {
        const val = e.target.value;
        setUserInput(val);
        if (val.toLowerCase().trim() === target.toLowerCase().trim()) {
            triggerSuccess();
        }
    };

    const renderInput = () => {
        if (!topic) return null;

        switch (topic.type) {
            case 'missing-letter':
            case 'alphabet-sequence':
            case 'alpha-identification':
            case 'match-word':
            case 'first-letter':
            case 'math-writing':
            case 'science-writing':
                const isError = userInput.length > 0 && !isComplete && !target.toLowerCase().startsWith(userInput.toLowerCase());
                return (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                            {topic.emoji && <span style={{ fontSize: '4rem' }}>{topic.emoji}</span>}
                            {topic.imageUrl && <img src={topic.imageUrl} style={{ width: '150px', borderRadius: '15px' }} />}
                            <h3 style={{ fontSize: '3rem', color: 'var(--primary)' }}>
                                {topic.type === 'first-letter' ? `_ ${topic.wordEnd}` : topic.question}
                            </h3>
                        </div>
                        <input
                            type="text"
                            className="writing-input"
                            style={{
                                maxWidth: '300px',
                                textAlign: 'center',
                                fontSize: '2rem',
                                border: isError ? '4px solid #ef4444' : (isComplete ? '4px solid #4ecdc4' : '4px solid #eee'),
                                color: isError ? '#ef4444' : (isComplete ? '#4ecdc4' : 'inherit'),
                                backgroundColor: isError ? 'rgba(239, 68, 68, 0.05)' : (isComplete ? 'rgba(78, 205, 196, 0.05)' : 'white')
                            }}
                            placeholder="Type here..."
                            value={userInput}
                            onChange={handleStandardChange}
                            disabled={isComplete}
                            autoFocus
                        />
                    </div>
                );

            case 'transcription':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--text-light)' }}>
                            {topic.question}
                        </h3>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                            <input
                                type="text"
                                className="writing-input"
                                style={{
                                    width: '100%',
                                    color: (userInput.length > 0 && !target.toLowerCase().startsWith(userInput.toLowerCase())) ? '#ef4444' : (isComplete ? 'var(--success)' : 'inherit')
                                }}
                                placeholder="Copy the sentence..."
                                value={userInput}
                                onChange={handleTranscriptionChange}
                                disabled={isComplete}
                                autoFocus
                            />
                        </div>
                    </div>
                );

            case 'multi-missing':
            case 'multi-first':
                return (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {topic.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '15px', borderRadius: '15px', border: '2px solid #eee' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{item.display.replace('_', '___')}</span>
                                <input
                                    type="text"
                                    maxLength={item.ans.length}
                                    style={{ width: '60px', padding: '8px', border: '2px solid var(--primary-light)', borderRadius: '8px', textAlign: 'center', fontSize: '1.2rem' }}
                                    value={multiInputs[idx] || ""}
                                    onChange={(e) => handleMultiChange(idx, e.target.value, item.ans)}
                                    disabled={isComplete}
                                />
                            </div>
                        ))}
                    </div>
                );

            case 'choose-word':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <img src={topic.imageUrl} style={{ width: '200px', borderRadius: '15px', marginBottom: '20px' }} />
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            {topic.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className="option-card"
                                    style={{ padding: '15px 30px', fontSize: '1.5rem', border: '3px solid var(--primary-light)' }}
                                    onClick={() => opt === topic.answer && triggerSuccess()}
                                    disabled={isComplete}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'free-write':
                const count = topic.count || 3;
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto', alignItems: 'center' }}>
                        {topic.imageUrl && <img src={topic.imageUrl} style={{ width: '200px', borderRadius: '15px', marginBottom: '10px' }} />}
                        {Array.from({ length: count }).map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                className="writing-input"
                                style={{
                                    borderColor: (multiInputs[i] || "").length > 2 ? 'var(--success)' : '#eee',
                                    backgroundColor: (multiInputs[i] || "").length > 2 ? 'rgba(76, 175, 80, 0.05)' : 'white',
                                    width: '100%'
                                }}
                                placeholder={`Answer ${i + 1}...`}
                                value={multiInputs[i] || ""}
                                onChange={(e) => handleMultiChange(i, e.target.value)}
                                disabled={isComplete}
                            />
                        ))}
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        className="writing-input"
                        placeholder="Start typing..."
                        value={userInput}
                        onChange={handleStandardChange}
                        disabled={isComplete}
                    />
                );
        }
    };

    return (
        <div className="module-container">
            <div className="points-display">
                <Trophy size={20} /> {score} Points
            </div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Writing Hub: {topic?.title} ✍️
            </motion.h2>

            <div className="story-box" style={{ flexDirection: 'column', minHeight: '400px', justifyContent: 'center' }}>
                <p className="writing-prompt" style={{ marginBottom: '20px', color: 'var(--text-light)' }}>
                    {topic?.desc || "Follow the instructions below:"}
                </p>

                {renderInput()}

                {isComplete && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="success-msg"
                        style={{ marginTop: '30px', color: 'var(--success)', fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}
                    >
                        <CheckCircle2 size={32} /> Fantastic Writing! 🌟
                    </motion.div>
                )}
            </div>

            <div className="module-controls" style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '30px', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', justifyContent: 'center' }}>
                    <Info size={16} />
                    {isComplete ? "Great job! Click next to continue." : "Carefully type the letters to win!"}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%', alignItems: 'center' }}>
                    {isComplete && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={24} /> Finished!
                        </motion.div>
                    )}
                    <button
                        className="btn btn-primary"
                        style={{ padding: '15px 50px', fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(78,205,196,0.3)' }}
                        onClick={handleNextQuest}
                    >
                        {currentIndex < topics.length - 1 ? "Next Writing Quest" : "Finish Writing"} <ArrowRight size={24} style={{ marginLeft: '10px' }} />
                    </button>
                </div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center' }}>
                    Writing Quest {currentIndex + 1} of {topics.length}
                </p>
            </div>
            <GuestLimitModal isOpen={showGuestModal} onClose={handleModalClose} />
        </div>
    );
};

export default WritingModule;
