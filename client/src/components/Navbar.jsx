import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Layout, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logout, token } = useAuth();
    if (!token) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-dark/60 backdrop-blur-xl border-b border-emerald/10 z-50 flex items-center justify-between px-8">
            <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(119,191,142,0.4)]">
                    <BookOpen className="text-black" size={24} />
                </div>
                <span className="text-xl font-black tracking-tight">FLASHY<span className="text-emerald">95</span></span>
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-muted hover:text-emerald transition-all font-bold">
                    <Layout size={20} />
                    <span>لوحة التحكم</span>
                </Link>
                <div className="h-4 w-px bg-white/10"></div>
                <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-all font-bold">
                    <LogOut size={20} />
                    <span>خروج</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
