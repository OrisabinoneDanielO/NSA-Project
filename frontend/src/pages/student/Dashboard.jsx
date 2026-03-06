import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { BookOpen, Award, Calendar, Clock } from 'lucide-react';

const StudentDashboard = () => {
    const user = useSelector(selectUser);
    const [enrolledCount, setEnrolledCount] = useState('—');

    useEffect(() => {
        try {
            const saved = localStorage.getItem('nsa_classes')
            if (saved) {
                const classes = JSON.parse(saved)
                // Mock grabbing Nursery 1A or first available class
                const myClass = classes.find(c => c.name === 'Nursery 1A') || classes[0]
                if (myClass?.subjects) {
                    setEnrolledCount(myClass.subjects.length.toString())
                }
            } else {
                setEnrolledCount('3') // Fallback seed data count
            }
        } catch { }
    }, [])

    const STATS = [
        { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCount, desc: 'This term' },
        { icon: Award, label: 'Completed', value: '18', desc: 'Modules finished' },
        { icon: Calendar, label: 'Next Class', value: 'Today', desc: 'Mon 8:00 AM' },
        { icon: Clock, label: 'Hours Learned', value: '14h', desc: 'This session' },
    ];

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#243316' }}>Student Dashboard</h1>
                <p className="text-sm" style={{ color: '#4a6325' }}>
                    Welcome, <span className="font-semibold">{user?.name || 'Student'}</span> — continue your learning journey.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {STATS.map(({ icon: Icon, label, value, desc }) => (
                    <div key={label}
                        className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: '#fdf0e8', color: '#E86D2C' }}>
                            <Icon size={20} />
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
                <h2 className="font-bold text-sm mb-2" style={{ color: '#243316' }}>Your Learning Hub</h2>
                <p className="text-sm" style={{ color: '#4a6325' }}>
                    Use the sidebar to browse your enrolled courses, check your grades, view your schedule, and communicate with your teacher.
                </p>
            </div>
        </div>
    );
};

export default StudentDashboard;
