const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: 'book' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cardCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const CardSchema = new mongoose.Schema({
    deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    
    // SM-2 Algorithm Fields
    reps: { type: Number, default: 0 },
    easiness: { type: Number, default: 2.5 },
    interval: { type: Number, default: 0 }, // in days
    nextReviewDate: { type: Date, default: Date.now },
    
    mastery: { type: Number, default: 0 }, // 0 to 100
    createdAt: { type: Date, default: Date.now },
});

const Deck = mongoose.model('Deck', DeckSchema);
const Card = mongoose.model('Card', CardSchema);

module.exports = { Deck, Card };
