import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut } from 'lucide-react';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060b07]/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Action Button */}
                <div className="flex items-center gap-4">
                    <button className="bg-[#77bf8e] text-[#060b07] px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                        تواصل معنا
                    </button>
                    {token && (
                        <button onClick={() => { logout(); navigate('/login'); }} className="text-white/60 hover:text-white p-2">
                            <LogOut size={20} />
                        </button>
                    )}
                </div>

                {/* Center: Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="nav-link">الرئيسية</Link>
                    <a href="#" className="nav-link">النصائح</a>
                    <a href="#" className="nav-link">التجارب</a>
                    <Link to="/dashboard" className="nav-link text-white border-b-2 border-[#77bf8e]">صانع البطاقات</Link>
                    <a href="#" className="nav-link">المكتبة</a>
                    <a href="#" className="nav-link">القنوات</a>
                </div>

                {/* Right: Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="text-right">
                        <span className="block text-xl font-black text-white leading-none group-hover:text-[#77bf8e] transition-colors">مسارك للـ +95</span>
                        <span className="block text-[10px] font-bold text-[#f0c05a] tracking-widest uppercase">Brainy95</span>
                    </div>
                    <div className="w-10 h-10 bg-[#77bf8e]/10 rounded-xl flex items-center justify-center border border-[#77bf8e]/30">
                        <GraduationCap className="text-[#f0c05a]" size={24} />
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
