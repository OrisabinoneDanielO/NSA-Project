import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../store/slices/authSlice';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, X, ChevronRight, Bell, Mic, FileText, Calendar, Image as ImageIcon } from 'lucide-react';

const adminLinks = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Users & Roles' },
    { to: '/admin/courses', icon: <BookOpen size={20} />, label: 'Classes & Groups' },
    { to: '/admin/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
    { to: '/admin/announcements', icon: <Mic size={20} />, label: 'Announcements' },
    { to: '/admin/reports', icon: <FileText size={20} />, label: 'Academic Reports' },
    { to: '/admin/articles', icon: <FileText size={20} />, label: 'Articles & Blog' },
    { to: '/admin/content', icon: <ImageIcon size={20} />, label: 'Content & Media' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings & Security' },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const handleLogout = () => { dispatch(logout()); navigate('/login'); };

    return (
        <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#F4F7F2' }}>

            {/* ── Sidebar ── */}
            <aside className={`${collapsed ? 'w-[68px]' : 'w-64'} flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden z-10`}
                style={{ background: '#0C2D1C' }}>

                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 px-4 py-5 border-b border-white/10 overflow-hidden flex-shrink-0 hover:opacity-90 transition">
                    <span className="min-w-[36px] w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0"
                        style={{ background: '#E86D2C' }}>NSA</span>
                    {!collapsed && <div className="overflow-hidden">
                        <p className="text-white font-bold text-sm whitespace-nowrap leading-tight">Admin Portal</p>
                        <p className="text-white/40 text-[10px] whitespace-nowrap">School Management</p>
                    </div>}
                </Link>

                {/* Nav */}
                <nav className="flex-1 px-2.5 py-4 flex flex-col gap-1 overflow-y-auto">
                    {adminLinks.map((link) => (
                        <NavLink key={link.to} to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap overflow-hidden transition-all
                 ${isActive
                                    ? 'text-white shadow-md'
                                    : 'text-white/50 hover:bg-white/8 hover:text-white'}`
                            }
                            style={({ isActive }) => isActive ? { background: '#E86D2C' } : {}}
                        >
                            <span className="text-lg flex-shrink-0">{link.icon}</span>
                            {!collapsed && <span className="flex-1">{link.label}</span>}
                            {!collapsed && <ChevronRight className="text-xs opacity-40" size={16} />}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-2.5 py-3 border-t border-white/10 flex-shrink-0">
                    <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl text-white/50 text-sm font-medium transition hover:bg-red-500/15 hover:text-red-400 whitespace-nowrap overflow-hidden">
                        <LogOut className="text-lg flex-shrink-0" size={20} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* ── Content ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 flex-shrink-0 shadow-sm"
                    style={{ borderColor: '#e8ede6' }}>
                    <button onClick={() => setCollapsed(c => !c)}
                        className="p-2 rounded-xl transition-colors"
                        style={{ color: '#243316' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fdf0e8'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        {collapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: '#243316' }}>
                            Welcome, {user?.name || 'Admin'}
                        </span>
                        <button className="p-2 rounded-xl transition-colors" style={{ color: '#243316' }}>
                            <Bell size={18} />
                        </button>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white cursor-pointer"
                            style={{ background: '#E86D2C' }}>
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-7" style={{ background: '#F4F7F2' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
