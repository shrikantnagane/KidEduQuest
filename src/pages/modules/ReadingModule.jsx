import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trophy, Image as ImageIcon, CheckCircle2, XCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Modules.css';

import { useAuth } from '../../context/AuthContext';
import GuestLimitModal from '../../components/GuestLimitModal';

const ReadingModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, addPoints, addHistory } = useAuth(); // Destructure user
    const { topics = [], currentIndex: initialIndex = 0 } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const topic = topics[currentIndex] || location.state?.topic || {};

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [showFinished, setShowFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showGuestModal, setShowGuestModal] = useState(false); // Modal state
    const [pendingAction, setPendingAction] = useState(null); // To resume after modal

    // Detect Mode
    const isMcqMode = !!topic?.options;
    const sentences = topic?.sentences || [];

    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        setCurrentSentenceIndex(0);
        setShowFinished(false);
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

    const handleNextSentence = () => {
        if (currentIndex < topics.length - 1 || (!isMcqMode && currentSentenceIndex < sentences.length - 1)) {
            if (!isMcqMode && currentSentenceIndex < sentences.length - 1) {
                setCurrentSentenceIndex(currentSentenceIndex + 1);
            } else {
                // Award points
                addPoints(50);
                addHistory({
                    title: `Read: ${topic.title || 'Story'}`,
                    type: 'Reading',
                    score: 50,
                    date: new Date().toISOString()
                });
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

                // Trigger Guest Check before moving to next topic
                handleActionWithAuthCheck(executeNext);
            }
        }
    };

    const handleNextTopic = () => {
        handleActionWithAuthCheck(executeNext);
    };

    const handleOptionSelect = (opt) => {
        if (isCorrect !== null) return;
        setSelectedOption(opt);
        if (opt === topic.answer) {
            setIsCorrect(true);
            addPoints(100);
            addHistory({
                title: `Solved: ${topic.title}`,
                type: 'Reading',
                score: 100,
                date: new Date().toISOString()
            });
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

            // Optionally check on success immediately? 
            // The prompt says "after every question". 
            // For MCQ, they usually click "Next" after answering correct.
            // But if there's no Next button for MCQ (it just shows success), we might wait for them to click "Next".
            // Users usually have to click "Next Reading Topic" button in this UI.
            // So we'll trigger the check when they click that button.
        } else {
            setIsCorrect(false);
        }
    };

    const renderQuestContent = () => {
        if (!isMcqMode) return null;

        return (
            <div className="mcq-container" style={{ width: '100%', maxWidth: '700px', marginInline: 'auto' }}>
                {topic.passage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="story-box" style={{ marginBottom: '24px', fontStyle: 'italic', background: 'rgba(255,255,255,0.7)' }}>
                        "{topic.passage}"
                    </motion.div>
                )}

                <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: 'var(--primary)' }}>{topic.title}</h3>

                <div className="option-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                    {topic.options.map((opt, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="option-card"
                            style={{
                                padding: '20px',
                                border: '3px solid',
                                borderColor: selectedOption === opt
                                    ? (isCorrect ? 'var(--success)' : '#ef4444')
                                    : 'rgba(0,0,0,0.05)',
                                background: selectedOption === opt
                                    ? (isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                                    : 'white',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onClick={() => handleOptionSelect(opt)}
                        >
                            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{opt}</span>
                            {selectedOption === opt && (
                                isCorrect ? <CheckCircle2 color="var(--success)" /> : <XCircle color="#ef4444" />
                            )}
                        </motion.button>
                    ))}
                </div>

                {isCorrect === false && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', marginTop: '15px', fontWeight: 600 }}>
                        Try matching the picture again! ✨
                    </motion.p>
                )}
            </div>
        )
    }




    return (
        <div className="module-container">
            <div className="points-display">
                <Trophy size={20} /> {(isCorrect || (sentences.length > 0 && currentIndex > 0)) ? 100 : 0} Points
            </div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Reading Quest: {topic?.category || "Alphabet Mastery"} 📖
            </motion.h2>

            {!showFinished ? (
                <div style={{ width: '100%', maxWidth: '900px', marginInline: 'auto' }}>
                    {topic?.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass"
                            style={{ overflow: 'hidden', marginBottom: '24px', position: 'relative', background: 'white', padding: '10px' }}
                        >
                            <img
                                src={topic.imageUrl}
                                alt={topic.title}
                                style={{ width: '100%', height: '350px', objectFit: 'contain', borderRadius: '15px' }}
                            />
                        </motion.div>
                    )}

                    {isMcqMode ? (
                        renderQuestContent()
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSentenceIndex}
                                className="story-box"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <p className="story-text" style={{ fontSize: '2.5rem' }}>{sentences[currentSentenceIndex]}</p>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* ACTIVITY PROMPT */}
                    {topic?.activity && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass"
                            style={{ marginTop: '30px', background: 'rgba(78, 205, 196, 0.1)', border: '2px dashed var(--primary)', padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}
                        >
                            <div style={{ background: 'var(--primary)', color: 'white', padding: '8px', borderRadius: '50%' }}>
                                <Info size={20} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <strong style={{ color: 'var(--primary)', display: 'block' }}>Parent/Teacher Activity:</strong>
                                <span style={{ fontSize: '0.95rem' }}>{topic.activity}</span>
                            </div>
                        </motion.div>
                    )}

                    <div className="module-controls" style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '30px', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
                            {!isMcqMode && (
                                <button className="btn btn-secondary" onClick={() => currentSentenceIndex > 0 && setCurrentSentenceIndex(currentSentenceIndex - 1)} disabled={currentSentenceIndex === 0}>
                                    <ArrowLeft /> Back Page
                                </button>
                            )}
                            <button
                                className="btn btn-primary"
                                onClick={handleNextSentence}
                                disabled={isMcqMode && !isCorrect}
                            >
                                {isMcqMode ? "Finished Quest! ✨" : (currentSentenceIndex === sentences.length - 1 ? "End of Page ✨" : "Next Page")} <ArrowRight />
                            </button>
                        </div>

                        <div style={{ width: '100%', height: '2px', background: '#f0f0f0' }}></div>

                        <button
                            className="btn btn-primary"
                            style={{ background: 'var(--secondary)', padding: '15px 50px' }}
                            onClick={handleNextTopic}
                        >
                            {currentIndex < topics.length - 1 ? "Next Reading Topic" : "Finish Reading"} 🚀
                        </button>
                    </div>
                </div>
            ) : (
                <motion.div className="story-box" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Amazing! 🌟</h2>
                        <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>You are a Reading Star!</p>
                        <button className="btn btn-primary" onClick={handleNextTopic}>
                            Check Out Next Topic 🚀
                        </button>
                    </div>
                </motion.div>
            )}
            <GuestLimitModal isOpen={showGuestModal} onClose={handleModalClose} />
        </div>
    );
};

export default ReadingModule;
