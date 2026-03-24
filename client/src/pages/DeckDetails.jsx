import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft, BookOpen, Edit2 } from 'lucide-react';

const DeckDetails = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCard, setNewCard] = useState({ front: '', back: '' });

    useEffect(() => {
        fetchData();
    }, [deckId]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://brainy95-server.onrender.com/api/decks/${deckId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeck(res.data);
            
            const cardsRes = await axios.get(`https://brainy95-server.onrender.com/api/cards/deck/${deckId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCards(cardsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://brainy95-server.onrender.com/api/cards', { ...newCard, deck: deckId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewCard({ front: '', back: '' });
            setShowAddModal(false);
            fetchData();
        } catch (err) {
            alert('Error adding card');
        }
    };

    if (!deck) return <div className="text-center mt-20 text-emerald animate-pulse">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/dashboard')} className="w-10 h-10 flex items-center justify-center glass-card border-white/5 hover:border-emerald/40 transition-all">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-black">{deck.title}</h1>
                    <p className="text-muted text-sm">{deck.description}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">البطاقات ({cards.length})</h3>
                <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 py-2">
                    <Plus size={18} />
                    <span>بطاقة جديدة</span>
                </button>
            </div>

            <div className="space-y-4">
                {cards.map(card => (
                    <div key={card._id} className="glass-card flex justify-between items-center bg-white/3 border-white/5 hover:bg-white/5 transition-all">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] uppercase font-black text-emerald/60 block mb-1">FRONT / السؤال</span>
                                <p className="font-bold">{card.front}</p>
                            </div>
                            <div className="border-t md:border-t-0 md:border-r border-white/5 pt-3 md:pt-0 md:pr-4">
                                <span className="text-[10px] uppercase font-black text-gold/60 block mb-1">BACK / الإجابة</span>
                                <p className="font-bold text-gold/80">{card.back}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <div className="text-[10px] font-black bg-emerald/10 text-emerald px-2 py-1 rounded-full">
                                {card.mastery}%
                            </div>
                            <button className="text-muted hover:text-white p-2"><Edit2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Card Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="glass-card max-w-md w-full bg-dark/90 border-emerald/20">
                        <h3 className="text-2xl font-black mb-6">إضافة بطاقة جديدة</h3>
                        <form onSubmit={handleAddCard} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase">Front Side / السؤال</label>
                                <textarea 
                                    placeholder="اكتب السؤال هنا..." className="input-glass min-h-[80px]"
                                    value={newCard.front} onChange={e => setNewCard({...newCard, front: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-muted uppercase">Back Side / الإجابة</label>
                                <textarea 
                                    placeholder="اكتب الإجابة هنا..." className="input-glass min-h-[80px]"
                                    value={newCard.back} onChange={e => setNewCard({...newCard, back: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button type="submit" className="btn-primary flex-1">إضافة</button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckDetails;
