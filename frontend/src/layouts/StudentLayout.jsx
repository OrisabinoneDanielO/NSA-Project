import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../store/slices/authSlice';
import { LayoutDashboard, BookOpen, Award, Calendar, LogOut, Menu, X, ChevronRight, Bell } from 'lucide-react';

const studentLinks = [
    { to: '/student/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/student/courses', icon: <BookOpen size={20} />, label: 'My Courses' },
    { to: '/student/grades', icon: <Award size={20} />, label: 'Grades' },
    { to: '/student/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
];

const StudentLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const handleLogout = () => { dispatch(logout()); navigate('/login'); };

    return (
        <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#F4F7F2' }}>

            <aside className={`${collapsed ? 'w-[68px]' : 'w-64'} flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden z-10`}
                style={{ background: '#0C2D1C' }}>
                <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 overflow-hidden flex-shrink-0">
                    <span className="min-w-[36px] w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0"
                        style={{ background: '#E86D2C' }}>NSA</span>
                    {!collapsed && <div className="overflow-hidden">
                        <p className="text-white font-bold text-sm whitespace-nowrap leading-tight">Student Portal</p>
                        <p className="text-white/40 text-[10px] whitespace-nowrap">School Management</p>
                    </div>}
                </div>

                <nav className="flex-1 px-2.5 py-4 flex flex-col gap-1 overflow-y-auto">
                    {studentLinks.map((link) => (
                        <NavLink key={link.to} to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap overflow-hidden transition-all
                 ${isActive ? 'text-white shadow-md' : 'text-white/50 hover:bg-white/8 hover:text-white'}`
                            }
                            style={({ isActive }) => isActive ? { background: '#E86D2C' } : {}}
                        >
                            <span className="text-lg flex-shrink-0">{link.icon}</span>
                            {!collapsed && <span className="flex-1">{link.label}</span>}
                            {!collapsed && <ChevronRight size={16} className="text-xs opacity-40" />}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-2.5 py-3 border-t border-white/10 flex-shrink-0">
                    <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl text-white/50 text-sm font-medium transition hover:bg-red-500/15 hover:text-red-400 whitespace-nowrap overflow-hidden">
                        <LogOut size={20} className="text-lg flex-shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b flex items-center justify-between px-6 flex-shrink-0 shadow-sm"
                    style={{ borderColor: '#e8ede6' }}>
                    <button onClick={() => setCollapsed(c => !c)}
                        className="p-2 rounded-xl" style={{ color: '#243316' }}>
                        {collapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: '#243316' }}>Welcome, {user?.name || 'Student'}</span>
                        <button className="p-2 rounded-xl" style={{ color: '#243316' }}><Bell size={18} /></button>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white cursor-pointer"
                            style={{ background: '#E86D2C' }}>
                            {user?.name?.[0]?.toUpperCase() || 'S'}
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

export default StudentLayout;
