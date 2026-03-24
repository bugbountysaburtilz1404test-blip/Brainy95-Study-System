import React from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ card, flipped, onClick }) => {
    return (
        <div 
            className="w-full h-80 perspective-1000 cursor-pointer"
            onClick={onClick}
        >
            <motion.div 
                className="relative w-full h-full duration-500 transform-style-3d shadow-2xl rounded-3xl"
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden glass-card flex items-center justify-center p-8 bg-dark/40 border-emerald/30 shadow-[0_0_30px_rgba(119,191,142,0.1)]">
                    <div className="text-center">
                        <span className="text-xs font-black text-emerald/60 uppercase tracking-widest block mb-4">Front / السؤال</span>
                        <h2 className="text-4xl font-extrabold leading-tight">{card.front}</h2>
                    </div>
                </div>

                {/* Back Side */}
                <div 
                    className="absolute inset-0 backface-hidden glass-card flex items-center justify-center p-8 bg-emerald/10 border-gold/30 shadow-[0_0_30px_rgba(240,192,90,0.1)]"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="text-center">
                        <span className="text-xs font-black text-gold/60 uppercase tracking-widest block mb-4">Back / الإجابة</span>
                        <h2 className="text-4xl font-extrabold leading-tight text-gold">{card.back}</h2>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Flashcard;
