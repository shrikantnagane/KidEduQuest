import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Info, Grid3X3, Minus, Plus, ArrowRight, CheckCircle2, Music, BookOpen, Volume2, Move, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Modules.css';

import { useAuth } from '../../context/AuthContext';
import GuestLimitModal from '../../components/GuestLimitModal';

const ActivityModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, addPoints, addHistory } = useAuth();
    const { topics = [], currentIndex: initialIndex = 0 } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const topic = topics[currentIndex] || location.state?.topic || {};

    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [isWrong, setIsWrong] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    // Legacy Activity State (Abacus/Sudoku)
    const [sudokuGrid, setSudokuGrid] = useState([]);
    const [abacusValues, setAbacusValues] = useState([]);

    useEffect(() => {
        if (!topic) return;
        setWin(false);
        setScore(0);
        setUserInput("");
        setSelectedOption(null);
        setIsWrong(false);

        if (topic.type === 'sudoku') {
            setSudokuGrid(topic.grid.map(row => [...row]));
        } else if (topic.type === 'abacus') {
            setAbacusValues(topic.rods.map(() => 0));
        }
    }, [currentIndex, topic.id]);

    const executeNext = () => {
        if (currentIndex < topics.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // End of list, return or show finished
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

    const handleNextItem = () => {
        handleActionWithAuthCheck(executeNext);
    };

    const triggerWin = () => {
        setWin(true);
        setScore(100);
        addPoints(100);
        addHistory({
            title: `Activity: ${topic.title || topic.category || 'Fun Quest'}`,
            type: 'Activity',
            score: 100,
            date: new Date().toISOString()
        });
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });
    };

    const handleOptionSelect = (opt) => {
        if (win) return;
        setSelectedOption(opt);
        if (opt.toLowerCase().trim() === (topic.answer || topic.target).toLowerCase().trim()) {
            setIsWrong(false);
            triggerWin();
        } else {
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 1000);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setUserInput(val);
        if (val.toLowerCase().trim() === (topic.answer || topic.target).toLowerCase().trim()) {
            triggerWin();
        }
    };

    // --- RENDERERS ---

    const renderAlphaFun = () => (
        <div style={{ textAlign: 'center' }}>
            {topic.emoji ? (
                <div style={{ fontSize: '12rem', marginBottom: '30px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>{topic.emoji}</div>
            ) : (
                <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', marginBottom: '20px', boxShadow: 'var(--shadow)' }} />
            )}
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '3px dashed var(--primary)' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{topic.activity}: {topic.target}</h3>
            </div>
            {!win && <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={triggerWin}>I found it! ✨</button>}
        </div>
    );

    const renderPhonics = () => {
        // Generate options if not provided
        const options = topic.options || [topic.target, sampleDistractor(topic.target)];
        return (
            <div style={{ textAlign: 'center' }}>
                {topic.emoji ? (
                    <div style={{ fontSize: '10rem', marginBottom: '30px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>{topic.emoji}</div>
                ) : (
                    <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '300px', borderRadius: '20px', marginBottom: '30px', border: '5px solid var(--secondary-light)' }} />
                )}
                <h3 style={{ marginBottom: '20px', color: 'var(--text-light)', fontSize: '1.8rem', fontWeight: 700 }}>{topic.question || 'What sound does this start with?'}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {options.map((opt, i) => (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.95 }}
                            className={`option-card ${selectedOption === opt ? (win ? 'correct' : 'wrong') : ''}`}
                            style={{
                                padding: '15px 40px',
                                fontSize: '2.5rem',
                                border: '3px solid var(--primary-light)',
                                background: selectedOption === opt && !win ? '#fee2e2' : (selectedOption === opt && win ? '#f0fdf4' : 'white'),
                                minWidth: '100px',
                                borderRadius: '15px'
                            }}
                            onClick={() => handleOptionSelect(opt)}
                        >
                            {opt}
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    };

    const sampleDistractor = (target) => {
        const alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const filtered = alphas.filter(a => a !== target.toUpperCase());
        return filtered[Math.floor(Math.random() * filtered.length)];
    };

    const renderStory = () => (
        <div style={{ textAlign: 'center' }}>
            <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', marginBottom: '20px' }} />
            <div className="glass" style={{ padding: '20px', background: 'rgba(255,255,255,0.9)' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 600 }}>{topic.question}</p>
                {!win && <button className="btn btn-primary" onClick={triggerWin} style={{ marginTop: '15px' }}>I Answered! 🎭</button>}
            </div>
        </div>
    );

    const renderRhyme = () => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎵</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--primary)', fontWeight: 800 }}>{topic.title}</h2>
            <div className="glass" style={{
                padding: '30px',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '20px',
                marginBottom: '40px',
                whiteSpace: 'pre-line',
                fontSize: '1.5rem',
                lineHeight: '1.6',
                color: 'var(--text)',
                fontWeight: 600,
                border: '3px solid var(--secondary-light)'
            }}>
                {topic.question}
            </div>
            {!win && (
                <button className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem' }} onClick={triggerWin}>
                    Done Singing! 🎤✨
                </button>
            )}
        </div>
    );

    const renderAction = () => (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Move size={80} color="var(--primary)" />
            </motion.div>
            <h2 style={{ fontSize: '3rem', margin: '30px 0', color: 'var(--secondary)' }}>{topic.question}</h2>
            {!win && <button className="btn btn-primary" onClick={triggerWin}>I did it! 🏃‍♀️</button>}
        </div>
    );

    const renderOpposite = () => (
        <div style={{ textAlign: 'center' }}>
            {topic.emoji ? (
                <div style={{ fontSize: '10rem', marginBottom: '30px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>{topic.emoji}</div>
            ) : (
                topic.imageUrl && <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '300px', borderRadius: '20px', marginBottom: '30px', border: '5px solid var(--secondary-light)' }} />
            )}
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>{topic.question}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <input
                    type="text"
                    className="writing-input"
                    placeholder="Opposite word..."
                    style={{ maxWidth: '300px' }}
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={win}
                    autoFocus
                />
            </div>
        </div>
    );

    const renderMatching = () => (
        <div style={{ textAlign: 'center' }}>
            {topic.emoji ? (
                <div style={{ fontSize: '10rem', marginBottom: '30px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>{topic.emoji}</div>
            ) : (
                <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '300px', borderRadius: '20px', marginBottom: '30px', border: '5px solid var(--primary-light)' }} />
            )}
            <h3 style={{ marginBottom: '30px', color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 700 }}>{topic.question}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {topic.options?.map((opt, i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        className="option-card"
                        style={{
                            padding: '15px 30px',
                            minWidth: '150px',
                            fontSize: '1.8rem',
                            border: '3px solid var(--secondary-light)',
                            borderRadius: '15px',
                            background: selectedOption === opt && !win ? '#fee2e2' : (selectedOption === opt && win ? '#f0fdf4' : 'white')
                        }}
                        onClick={() => handleOptionSelect(opt)}
                        disabled={win}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>
        </div>
    );

    const renderLegacy = () => (
        <div style={{ textAlign: 'center' }}>
            {topic?.type === 'abacus' && (
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', background: '#8B4513', padding: '30px', borderRadius: '24px', border: '8px solid #5D2E0A' }}>
                    {topic.rods.map((_, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <button className="btn btn-secondary" disabled={win} onClick={() => {
                                const newVals = [...abacusValues];
                                newVals[i] = Math.min(10, newVals[i] + 1);
                                setAbacusValues(newVals);
                                if (parseInt(newVals.join('')).toString() === topic.answer) triggerWin();
                            }}><Plus size={20} /></button>
                            <div style={{ width: '12px', height: '150px', background: '#ccc', position: 'relative', display: 'flex', flexDirection: 'column-reverse' }}>
                                {Array.from({ length: abacusValues[i] }).map((_, bi) => (
                                    <div key={bi} style={{ width: '40px', height: '12px', background: '#FF6B6B', borderRadius: '10px', marginLeft: '-14px' }} />
                                ))}
                            </div>
                            <button className="btn btn-secondary" disabled={win} onClick={() => {
                                const newVals = [...abacusValues];
                                newVals[i] = Math.max(0, newVals[i] - 1);
                                setAbacusValues(newVals);
                                if (parseInt(newVals.join('')).toString() === topic.answer) triggerWin();
                            }}><Minus size={20} /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderActivityQuest = () => {
        const target = topic.target || "";
        const isError = userInput.length > 0 && !win && !target.toLowerCase().startsWith(userInput.toLowerCase());

        return (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.8rem', margin: '30px 0', color: 'var(--text)', lineHeight: 1.4, fontWeight: 700 }}>
                    {topic.question}
                </h2>

                {target && (
                    <div style={{ marginBottom: '30px' }}>
                        <input
                            type="text"
                            className="writing-input"
                            style={{
                                maxWidth: '400px',
                                textAlign: 'center',
                                fontSize: '2.2rem',
                                border: isError ? '4px solid #ef4444' : (win ? '4px solid #4ecdc4' : '4px solid #eee'),
                                color: isError ? '#ef4444' : (win ? '#4ecdc4' : 'inherit'),
                                backgroundColor: isError ? 'rgba(239, 68, 68, 0.05)' : (win ? 'rgba(78, 205, 196, 0.05)' : 'white')
                            }}
                            placeholder="Type answer..."
                            value={userInput}
                            onChange={handleInputChange}
                            disabled={win}
                            autoFocus
                        />
                    </div>
                )}

                {!win && !target && (
                    <button
                        className="btn btn-primary"
                        style={{ padding: '15px 40px', fontSize: '1.5rem', borderRadius: '50px' }}
                        onClick={triggerWin}
                    >
                        I solved it! 🎯
                    </button>
                )}
            </div>
        );
    };

    const renderCreative = () => {
        const isLongEnough = userInput.length > 5;

        return (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', margin: '20px 0', color: 'var(--text)' }}>
                    {topic.question}
                </h2>
                {topic.imageUrl && (
                    <img src={topic.imageUrl} style={{ width: '100%', maxWidth: '300px', borderRadius: '15px', marginBottom: '20px' }} />
                )}
                <div style={{ marginBottom: '30px' }}>
                    <textarea
                        className="writing-input"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            minHeight: '150px',
                            padding: '15px',
                            fontSize: '1.2rem',
                            borderRadius: '15px',
                            border: win ? '3px solid var(--success)' : '3px solid #eee',
                            fontFamily: 'inherit'
                        }}
                        placeholder="Type your answer here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={win}
                    />
                </div>
                {!win && (
                    <button
                        className="btn btn-primary"
                        style={{ opacity: isLongEnough ? 1 : 0.5, pointerEvents: isLongEnough ? 'auto' : 'none' }}
                        onClick={triggerWin}
                    >
                        Done! ✍️
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="module-container">
            <div className="points-display">
                <Trophy size={20} /> {score} Points
            </div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Activity Hub: {topic?.category || "Fun Quest"} ✨
            </motion.h2>

            <div className="story-box" style={{ flexDirection: 'column', minHeight: '480px', justifyContent: 'center' }}>
                <p className="writing-prompt" style={{ marginBottom: '30px', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                    {topic?.desc || "Complete the fun task!"}
                </p>

                {!win && isWrong && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#ef4444', fontWeight: 700, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <XCircle size={20} /> Not quite right! Try again!
                    </motion.div>
                )}

                {topic?.type === 'alpha-fun' && renderAlphaFun()}
                {topic?.type === 'phonics' && renderPhonics()}
                {topic?.type === 'story' && renderStory()}
                {topic?.type === 'rhyme' && renderRhyme()}
                {topic?.type === 'action' && renderAction()}
                {topic?.type === 'opposite' && renderOpposite()}
                {topic?.type === 'matching' && renderMatching()}
                {topic?.type === 'activity-quest' && renderActivityQuest()}
                {topic?.type === 'creative' && renderCreative()}
                {['abacus', 'sudoku', 'pattern'].includes(topic?.type) && renderLegacy()}

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '40px', textAlign: 'center', borderTop: '2px solid #f0f0f0', paddingTop: '30px' }}>
                    {win && (
                        <h2 style={{ color: 'var(--success)', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                            <CheckCircle2 size={32} /> Fantastic! 🌟
                        </h2>
                    )}
                    <button
                        className="btn btn-primary"
                        style={{ padding: '15px 50px', fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(78,205,196,0.3)' }}
                        onClick={handleNextItem}
                    >
                        {currentIndex < topics.length - 1 ? "Next Quest" : "Finish Learning"} <ArrowRight size={24} style={{ marginLeft: '10px' }} />
                    </button>
                    <p style={{ marginTop: '15px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        Quest {currentIndex + 1} of {topics.length}
                    </p>
                </motion.div>
            </div>

            {topic?.activity && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ marginTop: '30px', background: 'rgba(255, 107, 107, 0.05)', border: '2px dashed var(--secondary)', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                    <div style={{ background: 'var(--secondary)', color: 'white', padding: '10px', borderRadius: '50%' }}>
                        <Info size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <strong style={{ color: 'var(--secondary)', fontSize: '1.1rem', display: 'block', marginBottom: '4px' }}>Teacher/Parent Activity:</strong>
                        <span style={{ fontSize: '1rem', color: 'var(--text)' }}>Try this: <strong>{topic.activity}</strong></span>
                    </div>
                </motion.div>
            )}
            <GuestLimitModal isOpen={showGuestModal} onClose={handleModalClose} />
        </div>
    );
};

export default ActivityModule;
