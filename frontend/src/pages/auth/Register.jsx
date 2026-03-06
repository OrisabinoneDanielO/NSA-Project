import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, selectAuthLoading } from '../../store/slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const ROLES = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
];

const ROLE_REDIRECT = {
    admin: '/admin/dashboard', teacher: '/teacher/dashboard', student: '/student/dashboard',
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);

    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [showPwd, setShowPwd] = useState(false);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) { toast.error('Please fill in all fields'); return; }
        dispatch(loginStart());
        await new Promise((r) => setTimeout(r, 800));
        dispatch(loginSuccess({ user: { name: form.name, email: form.email }, role: form.role }));
        toast.success(`Account created! Welcome, ${form.name}!`);
        navigate(ROLE_REDIRECT[form.role]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-6 relative overflow-hidden font-sans">
            <Toaster position="top-right" />

            <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl animate-slide-up">

                <div className="flex items-center gap-3 mb-7">
                    <span className="w-11 h-11 rounded-xl bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">NSA</span>
                    <h1 className="text-white font-bold text-base leading-tight">Nurtured Seeds Academy</h1>
                </div>

                <h2 className="text-white text-2xl font-extrabold mb-1">Create your account</h2>
                <p className="text-slate-400 text-sm mb-6">Join NSA and start your learning journey</p>

                <div className="flex bg-white/5 rounded-xl p-1 gap-1 mb-6">
                    {ROLES.map((r) => (
                        <button
                            key={r.value} type="button"
                            onClick={() => setForm((p) => ({ ...p, role: r.value }))}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all
                ${form.role === r.value ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                        { name: 'name', type: 'text', icon: <User size={16} />, placeholder: 'John Doe', label: 'Full Name', required: true },
                        { name: 'email', type: 'email', icon: <Mail size={16} />, placeholder: 'you@example.com', label: 'Email', required: true },
                    ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide">{f.label}</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">{f.icon}</span>
                                <input
                                    name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]}
                                    onChange={handleChange} required={f.required}
                                    className="w-full pl-9 pr-4 py-3 bg-white/7 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 outline-none focus:border-violet-500 focus:bg-violet-500/10 transition"
                                />
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-300 text-xs font-semibold uppercase tracking-wide">Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                name="password" type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters"
                                value={form.password} onChange={handleChange} required
                                className="w-full pl-9 pr-10 py-3 bg-white/7 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 outline-none focus:border-violet-500 focus:bg-violet-500/10 transition"
                            />
                            <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition">
                                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="mt-1 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition flex items-center justify-center"
                    >
                        {loading
                            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-5">
                    Already have an account?{' '}
                    <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
