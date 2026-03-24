import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Play, Trash2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [decks, setDecks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDeck, setNewDeck] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://brainy95-server.onrender.com/api/decks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDecks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://brainy95-server.onrender.com/api/decks', newDeck, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowModal(false);
            setNewDeck({ title: '', description: '' });
            fetchDecks();
        } catch (err) {
            alert('Error creating deck');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذه المجموعة؟')) return;
        try {
            await axios.delete(`http://localhost:5000/api/decks/${id}`);
            fetchDecks();
        } catch (err) {
            alert('Error deleting deck');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black">مجموعاتك 📚</h1>
                <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    <span>مجموعة جديدة</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map(deck => (
                    <div key={deck._id} className="glass-card flex flex-col justify-between hover:border-emerald/40 transition-all border-white/5">
                        <div>
                            <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mb-4 text-emerald">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{deck.title}</h3>
                            <p className="text-muted text-sm">{deck.description || 'لا يوجد وصف'}</p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald/60">
                                <span>{deck.cardCount} بطاقة</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                            <Link to={`/study/${deck._id}`} className="btn-primary flex-1 flex items-center justify-center gap-2 py-2">
                                <Play size={18} />
                                <span>ابدأ الدراسة</span>
                            </Link>
                            <button onClick={() => handleDelete(deck._id)} className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="glass-card max-w-md w-full bg-dark/90 border-emerald/20">
                        <h3 className="text-2xl font-black mb-6">إنشاء مجموعة جديدة</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input 
                                type="text" placeholder="اسم المجموعة" className="input-glass"
                                value={newDeck.title} onChange={e => setNewDeck({...newDeck, title: e.target.value})}
                                required
                            />
                            <textarea 
                                placeholder="وصف قصير" className="input-glass min-h-[100px]"
                                value={newDeck.description} onChange={e => setNewDeck({...newDeck, description: e.target.value})}
                            ></textarea>
                            <div className="flex gap-4 mt-6">
                                <button type="submit" className="btn-primary flex-1">إنشاء</button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
