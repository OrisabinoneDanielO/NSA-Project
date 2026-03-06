import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { BookOpen, Users, ClipboardList, Star } from 'lucide-react';

const STATS = [
    { icon: BookOpen, label: 'My Courses', value: '—', desc: 'Assigned this term' },
    { icon: Users, label: 'My Students', value: '—', desc: 'Across all classes' },
    { icon: ClipboardList, label: 'Pending Grades', value: '—', desc: 'Awaiting entry' },
    { icon: Star, label: 'Avg. Rating', value: '—', desc: 'From parent reviews' },
];

const TeacherDashboard = () => {
    const user = useSelector(selectUser);
    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#243316' }}>Teacher Dashboard</h1>
                <p className="text-sm" style={{ color: '#4a6325' }}>
                    Welcome, <span className="font-semibold">{user?.name || 'Teacher'}</span> — manage your classes and students below.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {STATS.map(({ icon: Icon, label, value, desc }) => (
                    <div key={label}
                        className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ background: '#fdf0e8', color: '#E86D2C' }}>
                            <Icon />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold" style={{ color: '#243316' }}>{value}</p>
                            <p className="text-xs font-semibold" style={{ color: '#243316' }}>{label}</p>
                            <p className="text-[11px]" style={{ color: '#4a6325' }}>{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e8ede6' }}>
                <h2 className="font-bold text-sm mb-2" style={{ color: '#243316' }}>Getting Started</h2>
                <p className="text-sm" style={{ color: '#4a6325' }}>
                    Your teacher portal is ready. Use the sidebar to manage your courses, view your students' progress, submit lesson plans, and enter grades.
                </p>
            </div>
        </div>
    );
};

export default TeacherDashboard;
