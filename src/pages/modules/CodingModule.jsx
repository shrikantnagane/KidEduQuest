import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Trash2, Hammer, Puzzle, Eye, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Modules.css';

const CodingModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { topics = [], currentIndex: initialIndex = 0 } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const topic = topics[currentIndex] || location.state?.topic || {};

    const [phase, setPhase] = useState('character-select'); // 'character-select', 'coding', 'success'
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [codeBlocks, setCodeBlocks] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    // Animation/Movement State
    const [charPos, setCharPos] = useState({ x: 0, y: 0, rotation: 0 }); // Grid 0-4
    const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
    const [executionIndex, setExecutionIndex] = useState(-1);

    const characters = [
        { id: 'cat', name: 'Cat', emoji: '🐱', color: '#ffbd59' },
        { id: 'robot', name: 'Robot', emoji: '🤖', color: '#5de2ff' },
        { id: 'monkey', name: 'Monkey', emoji: '🐵', color: '#a67c52' },
        { id: 'dog', name: 'Dog', emoji: '🐶', color: '#ff914d' },
        { id: 'horse', name: 'Horse', emoji: '🐴', color: '#c08e5c' },
        { id: 'man', name: 'Astronaut', emoji: '👨‍🚀', color: '#9d56ff' }
    ];

    const blocks = [
        { type: 'move', label: 'Move Forward', icon: '⬆️', color: '#4ade80' },
        { type: 'left', label: 'Turn Left', icon: '↪️', color: '#60a5fa' },
        { type: 'right', label: 'Turn Right', icon: '↩️', color: '#60a5fa' },
        { type: 'repeat', label: 'Repeat 2x', icon: '🔁', color: '#f472b6' }
    ];

    useEffect(() => {
        resetLevel();
    }, [currentIndex, topic.id]);

    const resetLevel = () => {
        setPhase('character-select');
        setCodeBlocks([]);
        setIsRunning(false);
        setExecutionIndex(-1);
        setCharPos({ x: 0, y: 0, rotation: 0 });
        // Random target position (not 0,0)
        setTargetPos({ x: 2 + Math.floor(Math.random() * 3), y: 2 + Math.floor(Math.random() * 3) });
    };

    const handleNextQuest = () => {
        if (currentIndex < topics.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/content', { state: location.state });
        }
    };

    const addBlock = (block) => {
        if (codeBlocks.length < 8) {
            setCodeBlocks([...codeBlocks, { ...block, id: Date.now() }]);
        }
    };

    const runCode = async () => {
        if (codeBlocks.length === 0) return;
        setIsRunning(true);
        setCharPos({ x: 0, y: 0, rotation: 0 });

        let currentX = 0;
        let currentY = 0;
        let currentRot = 0;

        // Process Repeat blocks (simple expansion)
        const flattenedBlocks = [];
        codeBlocks.forEach(b => {
            if (b.type === 'repeat') {
                // Repeat the previous block or do nothing if first
                const last = flattenedBlocks[flattenedBlocks.length - 1];
                if (last) flattenedBlocks.push(last);
            } else {
                flattenedBlocks.push(b);
            }
        });

        for (let i = 0; i < flattenedBlocks.length; i++) {
            setExecutionIndex(i);
            const block = flattenedBlocks[i];

            await new Promise(r => setTimeout(r, 600));

            if (block.type === 'move') {
                // Move based on rotation
                const angle = (currentRot % 360 + 360) % 360;
                if (angle === 0) currentX = Math.min(4, currentX + 1);
                else if (angle === 90) currentY = Math.min(4, currentY + 1);
                else if (angle === 180) currentX = Math.max(0, currentX - 1);
                else if (angle === 270) currentY = Math.max(0, currentY - 1);
            } else if (block.type === 'left') {
                currentRot -= 90;
            } else if (block.type === 'right') {
                currentRot += 90;
            }

            setCharPos({ x: currentX, y: currentY, rotation: currentRot });
        }

        setExecutionIndex(-1);
        setIsRunning(false);

        // Check Success
        if (currentX === targetPos.x && currentY === targetPos.y) {
            confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
            setTimeout(() => setPhase('success'), 1000);
        }
    };

    if (phase === 'character-select') {
        return (
            <div className="module-container" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--primary)' }}>Select Your Coding Buddy! 🚀</h1>
                <div className="selection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
                    {characters.map(char => (
                        <motion.div
                            key={char.id}
                            whileHover={{ scale: 1.05, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className="option-card"
                            onClick={() => { setSelectedCharacter(char); setPhase('coding'); }}
                            style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', border: `4px solid ${char.color}22` }}
                        >
                            <span style={{ fontSize: '5rem', marginBottom: '20px' }}>{char.emoji}</span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{char.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    if (phase === 'success') {
        return (
            <div className="module-container" style={{ textAlign: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="story-box" style={{ flexDirection: 'column', padding: '60px' }}>
                    <span style={{ fontSize: '6rem' }}>🏆</span>
                    <h2 style={{ fontSize: '3rem', color: 'var(--primary)', margin: '20px 0' }}>Quest Complete!</h2>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '40px' }}>
                        {selectedCharacter.name} reached {topic.target}!
                    </p>
                    <button className="btn btn-primary" style={{ padding: '20px 60px', fontSize: '1.5rem' }} onClick={handleNextQuest}>
                        Next Mission! 🚀
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="module-container" style={{ paddingBottom: '100px' }}>
            <div className="points-display">
                <Trophy size={20} /> Coding Points: {currentIndex * 100}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedCharacter.emoji}</span>
                <h2 style={{ margin: 0 }}>Mission: Reach {topic.targetEmoji} {topic.target}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '40px', marginTop: '40px', width: '100%' }}>
                {/* TOOLBOX & WORKSPACE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass" style={{ padding: '20px', borderRadius: '24px', background: 'white' }}>
                        <h3 style={{ marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Sparkles size={18} /> Code Toolbox
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {blocks.map((block, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="option-card"
                                    onClick={() => addBlock(block)}
                                    style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '10px', background: block.color, color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{block.icon}</span>
                                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{block.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '20px', borderRadius: '24px', background: 'white', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ color: 'var(--secondary)', margin: 0 }}>Code Sequence</h3>
                            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => setCodeBlocks([])}>Clear</button>
                        </div>

                        {/* Moved Play Button to Top */}
                        <button
                            className="btn btn-primary"
                            style={{ marginBottom: '15px', width: '100%', padding: '15px', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)' }}
                            onClick={runCode}
                            disabled={isRunning || codeBlocks.length === 0}
                        >
                            <Play size={20} /> {isRunning ? "Running..." : "Press Play! ✨"}
                        </button>

                        <div style={{ flex: 1, minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {codeBlocks.length === 0 && <p style={{ opacity: 0.3, textAlign: 'center', marginTop: '50px' }}>Drag blocks here to code!</p>}
                            {codeBlocks.map((block, idx) => (
                                <motion.div
                                    key={block.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '12px',
                                        background: block.color,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        borderLeft: executionIndex === idx ? '8px solid white' : 'none',
                                        scale: executionIndex === idx ? 1.05 : 1,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <span style={{ opacity: 0.7, fontWeight: 900 }}>{idx + 1}</span>
                                    <span>{block.icon} {block.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ANIMATION GRID */}
                <div className="glass" style={{ background: '#f8fafc', borderRadius: '32px', position: 'relative', overflow: 'hidden', padding: '20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(5, 1fr)',
                        gap: '2px',
                        height: '100%',
                        background: '#e2e8f0',
                        border: '2px solid #e2e8f0',
                        borderRadius: '20px',
                        aspectRatio: '1/1'
                    }}>
                        {Array.from({ length: 25 }).map((_, i) => {
                            const x = i % 5;
                            const y = Math.floor(i / 5);
                            const isTarget = x === targetPos.x && y === targetPos.y;
                            return (
                                <div key={i} style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    {isTarget && (
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* Home/Ball Goal Visual */}
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    background: 'rgba(255, 189, 89, 0.2)',
                                                    borderRadius: '50%',
                                                    border: '4px dashed #ffbd59',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '3rem',
                                                    zIndex: 1
                                                }}
                                            >
                                                {topic.targetEmoji || '🏠'}
                                            </motion.div>
                                            <span style={{ position: 'absolute', bottom: '-20px', fontSize: '0.7rem', fontWeight: 900, color: '#ffbd59', whiteSpace: 'nowrap' }}>GOAL!</span>
                                        </div>
                                    )}
                                    <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: '0.7rem' }}>{x},{y}</div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Character Sprite */}
                    <motion.div
                        animate={{
                            left: `${(charPos.x / 4) * 80 + 10}%`,
                            top: `${(charPos.y / 4) * 80 + 10}%`,
                            rotate: charPos.rotation
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            width: '15%',
                            height: '15%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                            zIndex: 10,
                            transformOrigin: 'center center'
                        }}
                    >
                        {selectedCharacter.emoji}
                    </motion.div>
                </div>
            </div>

            {/* PERSISTENT NAVIGATION */}
            <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '2px solid #eee', paddingTop: '30px' }}>
                <button
                    className="btn btn-secondary"
                    style={{ padding: '15px 50px', fontSize: '1.2rem' }}
                    onClick={handleNextQuest}
                >
                    {currentIndex < topics.length - 1 ? "Next Mission" : "Finish Coding"} 🚀
                </button>
            </div>
        </div>
    );
};

export default CodingModule;
