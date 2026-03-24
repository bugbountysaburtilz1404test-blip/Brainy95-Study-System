import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return alert('كلمات المرور غير متوافقة!');
        }
        try {
            await axios.post('https://brainy95-server.onrender.com/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
        }
    };

    return (
        <div className="tahsili-container pt-10 pb-20">
            {/* Hero Section */}
            <div className="text-center mb-16 px-4">
                <div className="float-anim inline-block mb-6">
                    <div className="w-24 h-24 bg-[#77bf8e]/10 rounded-full flex items-center justify-center border-2 border-[#77bf8e]/30 shadow-[0_0_50px_rgba(119,191,142,0.2)]">
                        <ShieldCheck className="text-[#f0c05a]" size={56} />
                    </div>
                </div>
                <h1 className="main-title text-white">انضم لعائلة <span className="text-gold">Brainy95</span></h1>
                <p className="text-xl text-[#77bf8e]/80 font-bold max-w-2xl mx-auto leading-relaxed">
                    ابدأ رحلتك الآن في حفظ آلاف البطاقات ونظم وقتك بذكاء. 🚀💎
                </p>
            </div>

            {/* Register Card */}
            <div className="max-w-2xl mx-auto px-4">
                <div className="glass-panel">
                    <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-[#77bf8e]/20 rounded-xl flex items-center justify-center">
                            <UserPlus className="text-[#77bf8e]" size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-white">إنشاء حساب جديد</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[#77bf8e] block mr-1">اسم المستخدم</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                    <input 
                                        type="text" placeholder="اسمك الكامل" 
                                        className="input-box pl-12"
                                        value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[#77bf8e] block mr-1">البريد الإلكتروني</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                    <input 
                                        type="email" placeholder="example@mail.com" 
                                        className="input-box pl-12"
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[#77bf8e] block mr-1">كلمة المرور</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                    <input 
                                        type="password" placeholder="كلمة سر قوية" 
                                        className="input-box pl-12"
                                        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[#77bf8e] block mr-1">تأكيد كلمة المرور</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                    <input 
                                        type="password" placeholder="أعد الكتابة" 
                                        className="input-box pl-12"
                                        value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-hero mt-8">
                            <UserPlus size={24} />
                            <span>سجل الآن مجاناً</span>
                        </button>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <p className="text-[#77bf8e]/60 font-bold">
                                لديك حساب بالفعل؟ <Link to="/login" className="text-white hover:text-[#f0c05a] underline transition-colors">سجل دخولك من هنا</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
