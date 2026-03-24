import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.username, formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            alert('هناك خطأ في البيانات!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <div className="glass-card text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 blur-3xl -z-10"></div>
                
                <h2 className="text-3xl font-black mb-2">{isLogin ? 'تسجيل دخول' : 'إنشاء حساب'}</h2>
                <p className="text-muted mb-8">{isLogin ? 'أهلاً بك مجدداً في رحلة التفوّق' : 'ابدأ رحلة الحفظ الذكي اليوم'}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald/50" size={20} />
                            <input 
                                type="text" placeholder="اسم المستخدم" className="input-glass pl-12"
                                value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald/50" size={20} />
                        <input 
                            type="email" placeholder="البريد الإلكتروني" className="input-glass pl-12"
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald/50" size={20} />
                        <input 
                            type="password" placeholder="كلمة المرور" className="input-glass pl-12"
                            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                        <span>{isLogin ? 'دخول' : 'تسجيل'}</span>
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-muted text-sm">
                        {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
                        <button onClick={() => setIsLogin(!isLogin)} className="text-emerald font-bold hover:underline">
                            {isLogin ? 'أنشئ حساباً الآن' : 'سجل دخولك'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
