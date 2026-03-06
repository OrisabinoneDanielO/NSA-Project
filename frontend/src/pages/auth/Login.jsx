import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const ROLES = [
    { value: 'student', label: 'Student / Parent' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
];

const ROLE_REDIRECT = {
    admin: '/admin/dashboard', teacher: '/teacher/dashboard', student: '/student/dashboard',
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);
    const authError = useSelector(selectAuthError);

    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [showPwd, setShowPwd] = useState(false);

    const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
        dispatch(loginStart());
        await new Promise(r => setTimeout(r, 800));
        const user = { name: form.name || form.email.split('@')[0], email: form.email };
        dispatch(loginSuccess({ user, role: form.role }));
        toast.success(`Welcome${user.name ? ', ' + user.name : ''}!`);
        navigate(ROLE_REDIRECT[form.role]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans py-8 px-4"
            style={{ background: '#0C2D1C' }}>
            <Toaster position="top-right" />

            {/* Background highlights */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                style={{ background: '#E86D2C', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10 rounded-full blur-3xl"
                style={{ background: '#E86D2C', transform: 'translate(-30%, 30%)' }} />

            <div className="relative z-10 w-full max-w-[420px] animate-slide-up">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 mb-8 justify-center hover:opacity-90 transition">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-lg"
                        style={{ background: '#E86D2C' }}>NSA</span>
                    <div>
                        <p className="text-white font-extrabold text-base leading-tight">Nurtured Seeds Academy</p>
                        <p className="text-white/40 text-xs">School Management System</p>
                    </div>
                </Link>

                {/* Card */}
                <div className="rounded-2xl p-8 shadow-2xl" style={{ background: '#F4F7F2' }}>
                    <h2 className="font-extrabold text-2xl mb-1" style={{ color: '#243316' }}>Sign in</h2>
                    <p className="text-sm mb-6" style={{ color: '#4a6325' }}>Access your school portal</p>

                    {/* Role tabs */}
                    <div className="flex rounded-xl p-1 gap-1 mb-6 border" style={{ background: '#e8ede6', borderColor: '#d4dcd0' }}>
                        {ROLES.map(r => (
                            <button key={r.value} type="button"
                                onClick={() => setForm(p => ({ ...p, role: r.value }))}
                                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                                style={form.role === r.value
                                    ? { background: '#E86D2C', color: '#fff', boxShadow: '0 2px 8px rgba(232,109,44,0.35)' }
                                    : { color: '#4a6325' }}>
                                {r.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name (optional) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Name (optional)</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange}
                                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm border outline-none transition"
                                    style={{ background: '#fff', borderColor: '#d4dcd0', color: '#243316' }}
                                    onFocus={e => e.target.style.borderColor = '#E86D2C'}
                                    onBlur={e => e.target.style.borderColor = '#d4dcd0'} />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input name="email" type="email" placeholder="you@school.com" value={form.email} onChange={handleChange} required
                                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm border outline-none transition"
                                    style={{ background: '#fff', borderColor: '#d4dcd0', color: '#243316' }}
                                    onFocus={e => e.target.style.borderColor = '#E86D2C'}
                                    onBlur={e => e.target.style.borderColor = '#d4dcd0'} />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input name="password" type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange} required
                                    className="w-full pl-9 pr-10 py-3 rounded-xl text-sm border outline-none transition"
                                    style={{ background: '#fff', borderColor: '#d4dcd0', color: '#243316' }}
                                    onFocus={e => e.target.style.borderColor = '#E86D2C'}
                                    onBlur={e => e.target.style.borderColor = '#d4dcd0'} />
                                <button type="button" onClick={() => setShowPwd(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transition text-gray-500">
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {authError && <p className="text-sm text-red-600 text-center">{authError}</p>}

                        <button type="submit" disabled={loading}
                            className="mt-1 py-3 text-white font-bold text-sm rounded-xl transition flex items-center justify-center disabled:opacity-60"
                            style={{ background: '#E86D2C' }}
                            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#c95a1e')}
                            onMouseLeave={e => e.currentTarget.style.background = '#E86D2C'}>
                            {loading
                                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
