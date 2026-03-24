import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Flashcard from '../components/Flashcard';
import { Check, X, Shield, Info, ArrowLeft } from 'lucide-react';

const StudySession = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCards();
    }, [deckId]);

    const fetchCards = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/cards/deck/${deckId}`);
            setCards(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleRate = async (quality) => {
        try {
            const cardId = cards[currentIndex]._id;
            await axios.post(`http://localhost:5000/api/cards/${cardId}/rate`, { quality });
            
            if (currentIndex < cards.length - 1) {
                setFlipped(false);
                setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
            } else {
                alert('🎉 انتهت جلسة الدراسة! أحسنت!');
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-center mt-20 text-emerald animate-pulse">جاري التحميل...</div>;
    
    if (cards.length === 0) return (
        <div className="text-center mt-20 glass-card max-w-lg mx-auto">
            <Info size={48} className="mx-auto mb-4 text-emerald/60" />
            <h2 className="text-2xl font-black mb-4">لا توجد بطاقات مستحقة للمراجعة!</h2>
            <p className="text-muted mb-8">لقد أنجزت كل مهامك في هذه المجموعة حالياً. عُد لاحقاً أو أضف بطاقات جديدة.</p>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">العودة للرئيسية</button>
        </div>
    );

    const currentCard = cards[currentIndex];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/dashboard')} className="text-muted hover:text-white flex items-center gap-2 font-bold">
                    <ArrowLeft size={20} />
                    <span>خروج</span>
                </button>
                <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 text-xs font-black">
                    بطاقة {currentIndex + 1} من {cards.length}
                </div>
            </div>

            <Flashcard 
                card={currentCard} 
                flipped={flipped} 
                onClick={() => setFlipped(!flipped)} 
            />

            <div className="mt-12">
                {!flipped ? (
                    <div className="text-center">
                        <p className="text-muted animate-bounce">انقر على البطاقة لرؤية الإجابة 👆</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <button 
                            onClick={() => handleRate(1)}
                            className="glass-card flex flex-col items-center gap-2 hover:bg-red-500/10 border-red-500/20 group"
                        >
                            <X className="text-red-500 group-hover:scale-125 transition-transform" />
                            <span className="font-black text-xs">صعب (Hard)</span>
                        </button>
                        <button 
                            onClick={() => handleRate(3)}
                            className="glass-card flex flex-col items-center gap-2 hover:bg-gold/10 border-gold/20 group"
                        >
                            <Shield className="text-gold group-hover:scale-125 transition-transform" />
                            <span className="font-black text-xs">متوسط (Med)</span>
                        </button>
                        <button 
                            onClick={() => handleRate(5)}
                            className="glass-card flex flex-col items-center gap-2 hover:bg-emerald/10 border-emerald/20 group"
                        >
                            <Check className="text-emerald group-hover:scale-125 transition-transform" />
                            <span className="font-black text-xs">سهل (Easy)</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudySession;
