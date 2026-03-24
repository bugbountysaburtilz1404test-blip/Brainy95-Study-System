const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Card, Deck } = require('../models/Card');
const { calculateSM2 } = require('../utils/sm2');

// Get cards for deck (due for review)
router.get('/deck/:deckId', auth, async (req, res) => {
    try {
        const cards = await Card.find({ 
            deck: req.params.deckId, 
            user: req.user.id,
            nextReviewDate: { $lte: new Date() } // Only due cards
        }).sort({ nextReviewDate: 1 });
        res.json(cards);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create Card
router.post('/', auth, async (req, res) => {
    const { front, back, deckId } = req.body;
    try {
        const deck = await Deck.findById(deckId);
        if (!deck) return res.status(404).json({ msg: 'Deck not found' });

        const card = new Card({
            front, back, deck: deckId, user: req.user.id
        });
        await card.save();

        deck.cardCount += 1;
        await deck.save();

        res.json(card);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Rate Card (Update SM-2)
router.post('/:id/rate', auth, async (req, res) => {
    const { quality } = req.body; // 1=Hard, 3=Med, 5=Easy
    try {
        let card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ msg: 'Card not found' });
        if (card.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        const updates = calculateSM2(quality, card.reps, card.easiness, card.interval);
        
        card.reps = updates.reps;
        card.easiness = updates.easiness;
        card.interval = updates.interval;
        card.nextReviewDate = updates.nextReviewDate;
        card.mastery = updates.mastery;

        await card.save();
        res.json(card);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
