import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, X } from 'lucide-react';
import './GuestLimitModal.css';

const GuestLimitModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-content glass"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Great Job! 🌟</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: '30px' }}>
                        Don't lose your points! Create an account to save your progress and see your name on the leaderboard.
                    </p>

                    <div className="modal-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/signup')}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <UserPlus size={20} /> Create Free Account
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/login')}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <LogIn size={20} /> Login to Save
                        </button>

                        <button
                            className="btn-text"
                            onClick={onClose}
                            style={{ marginTop: '10px', color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Continue without saving
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GuestLimitModal;
