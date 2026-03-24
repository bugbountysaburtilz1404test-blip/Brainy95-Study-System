import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Bot } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://brainy95-server.onrender.com/api/auth/login', formData);
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('بيانات الدخول غير صحيحة');
        }
    };

    return (
        <div className="tahsili-container pt-10">
            {/* Hero Section */}
            <div className="text-center mb-16 px-4">
                <div className="float-anim inline-block mb-6">
                    <div className="w-24 h-24 bg-[#77bf8e]/10 rounded-[2rem] flex items-center justify-center border-2 border-[#77bf8e]/30 shadow-[0_0_50px_rgba(119,191,142,0.2)]">
                        <Bot className="text-[#f0c05a]" size={56} />
                    </div>
                </div>
                <h1 className="main-title text-white">بوابة البطاقات <span className="text-gold">الذكية</span></h1>
                <p className="text-xl text-[#77bf8e]/80 font-bold max-w-2xl mx-auto leading-relaxed">
                    دعنا نخطط لك جدولك بذكاء ليناسب مستواك والفترة المتبقية. 📚⚡️
                </p>
            </div>

            {/* Login Card */}
            <div className="max-w-xl mx-auto px-4">
                <div className="glass-panel">
                    <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-[#77bf8e]/20 rounded-xl flex items-center justify-center">
                            <LogIn className="text-[#77bf8e]" size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-white">تسجيل دخول</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-[#77bf8e] block mr-1">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                <input 
                                    type="email" placeholder="أدخل بريدك الإلكتروني" 
                                    className="input-box pl-12"
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-[#77bf8e] block mr-1">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                <input 
                                    type="password" placeholder="أدخل كلمة المرور" 
                                    className="input-box pl-12"
                                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-hero mt-8">
                            <LogIn size={24} />
                            <span>دخول للمنصة</span>
                        </button>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <p className="text-[#77bf8e]/60 font-bold">
                                ليس لديك حساب؟ <Link to="/register" className="text-white hover:text-[#f0c05a] underline transition-colors">أنشئ حساباً الآن</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
