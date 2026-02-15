import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gamepad2, Timer, Apple, Target, MousePointer2, ArrowRight, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Modules.css';

const GamesModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { topics = [], currentIndex: initialIndex = 0, level = 'Medium' } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const topic = topics[currentIndex] || location.state?.topic || {};

    // Difficulty Scaling Logic
    const speedMultiplier = level === 'Easy' ? 0.5 : level === 'Hard' ? 1.5 : 1.0;
    const balloonSpawnRate = 800 / speedMultiplier;
    const balloonAnimationDuration = level === 'Easy' ? 6 : level === 'Hard' ? 3 : 4;
    const fruitSpawnRate = 1000 / speedMultiplier;
    const fruitFallSpeed = 5 * speedMultiplier;
    const colorRefreshRate = 2500 / speedMultiplier;

    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameState, setGameState] = useState('menu'); // menu, playing, input, end
    const [currentGame, setCurrentGame] = useState('balloons'); // balloons, fruit, colors, math-balloon-count, math-color-count

    // Balloon Game State
    const [balloons, setBalloons] = useState([]);

    // Fruit Game State
    const [fruits, setFruits] = useState([]);
    const [basketX, setBasketX] = useState(50);

    // Color Game State
    const [colorTargets, setColorTargets] = useState([]);
    const [activeColor, setActiveColor] = useState('');

    // Math Input State
    const [inputAnswer, setInputAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'

    useEffect(() => {
        let timer;
        if (gameState === 'playing' && timeLeft > 0 && !topic.type?.startsWith('math-')) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'playing' && !topic.type?.startsWith('math-')) {
            setGameState('end');
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, topic.type]);

    useEffect(() => {
        // Auto-start math games if topic type is math-
        if (topic.type === 'math-balloon-count' || topic.type === 'math-color-count') {
            setGameState('playing');
            setCurrentGame(topic.type);
            setScore(0);
            setInputAnswer('');
            setFeedback(null);

            if (topic.type === 'math-balloon-count') {
                initializeBalloonMath();
            } else if (topic.type === 'math-color-count') {
                // Color count is static, handled in render
            }
        } else {
            setGameState('menu');
            setScore(0);
            setTimeLeft(20);
            setBalloons([]);
            setFruits([]);
        }
    }, [currentIndex, topic?.id]);

    const initializeBalloonMath = () => {
        // Initial setup
        const initial = Array.from({ length: topic.initialCount }).map((_, i) => ({
            id: `init-${i}`,
            x: 20 + (i * 10), // Spread them out comfortably
            y: 50,
            color: '#FF6B6B',
            isNew: false
        }));
        setBalloons(initial);

        // Animation sequence
        setTimeout(() => {
            if (topic.operation === 'add') {
                const newBalloons = Array.from({ length: topic.changeCount }).map((_, i) => ({
                    id: `new-${i}`,
                    x: 20 + ((topic.initialCount + i) * 10),
                    y: -20, // Start from top
                    color: '#4ECDC4',
                    isNew: true
                }));
                // Animate them dropping in
                setBalloons(prev => [...prev, ...newBalloons.map(b => ({ ...b, y: 50 }))]);
            } else {
                // Remove balloons
                setBalloons(prev => prev.slice(0, Math.max(0, prev.length - topic.changeCount)));
            }
            // Enable input after animation
            setGameState('input');
        }, 2000);
    };

    const handleNextQuest = () => {
        if (currentIndex < topics.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/content', { state: location.state });
        }
    };

    // Game Loop for "Balloons" Arcade
    useEffect(() => {
        if (gameState === 'playing' && currentGame === 'balloons') {
            const interval = setInterval(() => {
                const newB = { id: Date.now(), x: randomInt(10, 90), color: randomColor() };
                setBalloons(b => [...b, newB]);
            }, balloonSpawnRate);
            return () => clearInterval(interval);
        }
    }, [gameState, currentGame, balloonSpawnRate]);

    // Game Loop for "Fruit Catch" Arcade
    useEffect(() => {
        if (gameState === 'playing' && currentGame === 'fruit') {
            const interval = setInterval(() => {
                const newF = { id: Date.now(), x: randomInt(5, 95), y: 0 };
                setFruits(f => [...f, newF]);
            }, fruitSpawnRate);
            const moveInterval = setInterval(() => {
                setFruits(f => f.map(fruit => ({ ...fruit, y: fruit.y + fruitFallSpeed })).filter(fruit => fruit.y < 100));
            }, 100);
            return () => { clearInterval(interval); clearInterval(moveInterval); };
        }
    }, [gameState, currentGame, fruitSpawnRate, fruitFallSpeed]);

    // Game Loop for "Color Match" Arcade
    useEffect(() => {
        if (gameState === 'playing' && currentGame === 'colors') {
            const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#a29bfe'];
            const refresh = () => {
                const target = colors[randomInt(0, 3)];
                setActiveColor(target);
                const items = Array.from({ length: 8 }).map((_, i) => ({
                    id: i,
                    color: colors[randomInt(0, 3)],
                    x: randomInt(10, 90),
                    y: randomInt(10, 90)
                }));
                setColorTargets(items);
            };
            refresh();
            const interval = setInterval(refresh, colorRefreshRate);
            return () => clearInterval(interval);
        }
    }, [gameState, currentGame, colorRefreshRate]);

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomColor = () => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#a29bfe', '#6BCB77'][randomInt(0, 4)];

    const startGame = (type) => {
        setCurrentGame(type);
        setScore(0);
        setTimeLeft(20);
        setBalloons([]);
        setFruits([]);
        setGameState('playing');
    };

    const catchFruit = (id) => {
        setScore(s => s + 20);
        setFruits(f => f.filter(item => item.id !== id));
    };

    const clickColor = (color) => {
        if (color === activeColor) {
            setScore(s => s + 30);
        } else {
            setScore(s => Math.max(0, s - 10));
        }
    };

    const checkMathAnswer = () => {
        if (inputAnswer.trim() === topic.target) {
            setFeedback('correct');
            setScore(100);
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            setTimeout(() => setGameState('end'), 1500);
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        <div className="module-container">
            {!topic.type?.startsWith('math-') && (
                <div className="points-display">
                    <Trophy size={20} /> {score} Points
                </div>
            )}

            {!topic.type?.startsWith('math-') && gameState === 'playing' && (
                <div style={{ position: 'fixed', top: '100px', left: '40px', padding: '16px 24px', background: 'white', borderRadius: '50px', fontWeight: 800, border: '2px solid var(--primary)', zIndex: 100 }}>
                    <Timer size={20} /> {timeLeft}s
                </div>
            )}

            <h2>{topic?.title || "Fun Planet"} 🚀</h2>

            {/* Math Game Instructions/Question */}
            {topic.type?.startsWith('math-') && (
                <div className="math-instruction-box" style={{ marginBottom: '20px', padding: '15px', background: '#e0f7fa', borderRadius: '15px', color: '#006064', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem' }}>{topic.desc}</p>
                    <h3 style={{ marginTop: '10px' }}>{topic.question}</h3>
                </div>
            )}

            {gameState === 'menu' && !topic.type?.startsWith('math-') && (
                <div className="story-box" style={{ flexDirection: 'column', gap: '20px' }}>
                    <h3>Pick Your Game! 🎮</h3>
                    <div className="selection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
                        <div className="option-card" onClick={() => startGame('balloons')}>
                            <Gamepad2 size={40} color="var(--primary)" />
                            <h4>Balloon Pop</h4>
                            <p>Classic fun!</p>
                        </div>
                        <div className="option-card" onClick={() => startGame('fruit')}>
                            <Apple size={40} color="#FF6B6B" />
                            <h4>Fruit Catch</h4>
                            <p>Move your basket!</p>
                        </div>
                        <div className="option-card" onClick={() => startGame('colors')}>
                            <Target size={40} color="#FFE66D" />
                            <h4>Color Blitz</h4>
                            <p>Match the colors!</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ARCADE: Balloon Pop */}
            {gameState === 'playing' && currentGame === 'balloons' && (
                <div className="game-area" style={{ height: '500px', background: 'rgba(78, 205, 196, 0.05)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                    <AnimatePresence>
                        {balloons.map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ y: 500 }}
                                animate={{ y: -100 }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: balloonAnimationDuration, ease: "linear" }}
                                onClick={() => { setBalloons(prev => prev.filter(x => x.id !== b.id)); setScore(s => s + 10); }}
                                style={{ position: 'absolute', left: `${b.x}%`, width: '60px', height: '80px', background: b.color, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}
                            >
                                🎈
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* ARCADE: Fruit Catch */}
            {gameState === 'playing' && currentGame === 'fruit' && (
                <div
                    className="game-area"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setBasketX(((e.clientX - rect.left) / rect.width) * 100);
                    }}
                    style={{ height: '500px', background: '#f0f9ff', borderRadius: '24px', position: 'relative', overflow: 'hidden', cursor: 'none' }}
                >
                    {fruits.map(f => (
                        <motion.div
                            key={f.id}
                            style={{ position: 'absolute', left: `${f.x}%`, top: `${f.y}%`, fontSize: '2rem' }}
                        >
                            🍎
                        </motion.div>
                    ))}
                    <div
                        style={{ position: 'absolute', left: `${basketX}%`, bottom: '20px', width: '80px', height: '40px', background: '#8B4513', borderRadius: '0 0 40px 40px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}
                    >
                        🧺
                    </div>
                    {/* Simplified catch logic */}
                    <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} onMouseMove={(e) => {
                        fruits.forEach(f => {
                            if (f.y > 80 && Math.abs(f.x - basketX) < 10) catchFruit(f.id);
                        });
                    }} />
                </div>
            )}

            {/* ARCADE: Color Blitz */}
            {gameState === 'playing' && currentGame === 'colors' && (
                <div className="game-area" style={{ height: '500px', background: '#fff', borderRadius: '24px', position: 'relative', textAlign: 'center', padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Click only <span style={{ color: activeColor }}>THIS COLOR</span>!</h3>
                    <div style={{ position: 'relative', height: '400px' }}>
                        {colorTargets.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                onClick={() => clickColor(item.color)}
                                style={{ position: 'absolute', left: `${item.x}%`, top: `${item.y}%`, width: '50px', height: '50px', borderRadius: '50%', background: item.color, cursor: 'pointer', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* MATH: Balloon Counting */}
            {(gameState === 'playing' || gameState === 'input' || gameState === 'end') && currentGame === 'math-balloon-count' && (
                <div className="game-area" style={{ height: '400px', background: '#fff9c4', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                    <AnimatePresence>
                        {balloons.map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, x: `${b.x}%`, y: `${b.y}%` }}
                                exit={{ scale: 0 }}
                                style={{
                                    position: 'absolute',
                                    left: 0, top: 0, // Handled by animate x/y
                                    width: '60px', height: '80px',
                                    background: b.color,
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
                                }}
                            >
                                🎈
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* MATH: Color Counting */}
            {/* Using flex for easy centering of color dots */}
            {(gameState === 'playing' || gameState === 'input' || gameState === 'end') && currentGame === 'math-color-count' && (
                <div className="game-area" style={{ height: '400px', background: '#f5f5f5', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', gap: '20px', padding: '20px' }}>
                    {topic.dots && topic.dots.map((dot, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ width: '60px', height: '60px', background: dot.code, borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}
                        >
                            {/* Optional: Show emoji inside dot if needed, but color is the main cue */}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Input Overlay for Math Games */}
            {(currentGame.startsWith('math-')) && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    {gameState === 'playing' ? (
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>Watch closely...</p>
                    ) : (
                        <>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={inputAnswer}
                                    onChange={(e) => setInputAnswer(e.target.value)}
                                    placeholder="?"
                                    style={{ padding: '10px', fontSize: '1.5rem', borderRadius: '12px', border: '2px solid var(--primary)', width: '100px', textAlign: 'center' }}
                                    disabled={gameState === 'end'}
                                    onKeyDown={(e) => { if (e.key === 'Enter') checkMathAnswer(); }}
                                />
                                {gameState !== 'end' && (
                                    <button className="btn btn-primary" onClick={checkMathAnswer}>
                                        Check
                                    </button>
                                )}
                            </div>
                            {feedback === 'incorrect' && <motion.p animate={{ x: [-10, 10, -10, 10, 0] }} style={{ color: 'red', fontWeight: 'bold' }}>Try Again!</motion.p>}
                            {feedback === 'correct' && <motion.p animate={{ scale: [1, 1.2, 1] }} style={{ color: 'green', fontWeight: 'bold', fontSize: '1.5rem' }}>Correct! 🎉</motion.p>}
                        </>
                    )}
                </div>
            )}

            {gameState === 'end' && !currentGame.startsWith('math-') && (
                <div className="story-box" style={{ flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Great Game! 🏁</h2>
                    <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>Score: {score} points</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn btn-secondary" onClick={() => setGameState('menu')}>Other Games</button>
                        <button className="btn btn-primary" onClick={handleNextQuest}>Next Game World 🚀</button>
                    </div>
                </div>
            )}

            {/* Math Game End Screen (Simplified) */}
            {gameState === 'end' && currentGame.startsWith('math-') && (
                <div className="story-box" style={{ flexDirection: 'column', marginTop: '20px' }}>
                    <button className="btn btn-primary" onClick={handleNextQuest}>Next Challenge 🚀</button>
                </div>
            )}

            {/* PERSISTENT NAVIGATION */}
            <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '2px solid #eee', paddingTop: '30px' }}>
                <button
                    className="btn btn-primary"
                    style={{ padding: '15px 50px', fontSize: '1.2rem', background: 'var(--secondary)' }}
                    onClick={handleNextQuest}
                >
                    {currentIndex < topics.length - 1 ? "Next Quest" : "Finish Playtime"} 🚀
                </button>
                <p style={{ marginTop: '15px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    Quest {currentIndex + 1} of {topics.length}
                </p>
            </div>
        </div>
    );
};

export default GamesModule;
