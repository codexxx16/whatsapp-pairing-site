const express = require('express');
const Session = require('../models/sessionModel');

const router = express.Router();

// Add a new session ID
router.post("/", async (req, res) => {
    try {
        const { userId, sessionID } = req.body;
        const session = new Session({ userId, sessionID });
        await session.save();
        res.status(201).json({ message: "✅ Session paired successfully!", session });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get a session ID
router.get("/:userId", async (req, res) => {
    try {
        const session = await Session.findOne({ userId: req.params.userId });
        if (!session) return res.status(404).json({ message: "❌ Session not found!" });
        res.json(session);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
