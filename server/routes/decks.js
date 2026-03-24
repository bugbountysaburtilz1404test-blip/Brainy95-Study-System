const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Deck, Card } = require('../models/Card');

// Get all decks for user
router.get('/', auth, async (req, res) => {
    try {
        const decks = await Deck.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(decks);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create Deck
router.post('/', auth, async (req, res) => {
    const { title, description, icon } = req.body;
    try {
        const newDeck = new Deck({
            title, description, icon, user: req.user.id
        });
        const deck = await newDeck.save();
        res.json(deck);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete Deck
router.delete('/:id', auth, async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) return res.status(404).json({ msg: 'Deck not found' });
        if (deck.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Card.deleteMany({ deck: req.params.id });
        await deck.deleteOne();
        res.json({ msg: 'Deck and associated cards removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
