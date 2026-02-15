const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const [result] = await db.execute(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );

        const userId = result.insertId;

        // Create initial progress entry
        await db.execute(
            'INSERT INTO user_progress (user_id, total_points, history) VALUES (?, ?, ?)',
            [userId, 0, JSON.stringify([])]
        );

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            token,
            user: {
                id: userId,
                name,
                email,
                phone,
                points: 0,
                history: []
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Or username if you prefer

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for user
        // Note: The UI calls it "name" but most likely user will use email or name
        // Let's support email login for now as standard
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const user = rows[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Get progress
        const [progressRows] = await db.execute('SELECT * FROM user_progress WHERE user_id = ?', [user.id]);
        let progress = { total_points: 0, history: [] };
        if (progressRows.length > 0) {
            progress = progressRows[0];
            // Ensure history is parsed if string
            if (typeof progress.history === 'string') {
                progress.history = JSON.parse(progress.history);
            }
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                points: progress.total_points,
                history: progress.history || []
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
