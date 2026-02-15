const express = require('express');
const router = express.Router();
const db = require('../config/db');
// Middleware to verify token would go here, skipping for simplicity in V1

// Update Progress
router.post('/progress', async (req, res) => {
    const { userId, points, activity } = req.body;

    try {
        // Get current progress
        const [rows] = await db.execute('SELECT * FROM user_progress WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            // Should exist from signup, but handle just in case
            await db.execute(
                'INSERT INTO user_progress (user_id, total_points, history) VALUES (?, ?, ?)',
                [userId, points, JSON.stringify([activity])]
            );
            return res.json({ msg: 'Progress initialized' });
        }

        const current = rows[0];
        const newPoints = current.total_points + points;

        let history = current.history;
        if (typeof history === 'string') history = JSON.parse(history);

        if (activity) {
            history.unshift(activity); // Add to beginning
        }

        await db.execute(
            'UPDATE user_progress SET total_points = ?, history = ? WHERE user_id = ?',
            [newPoints, JSON.stringify(history), userId]
        );

        res.json({ total_points: newPoints, history });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
