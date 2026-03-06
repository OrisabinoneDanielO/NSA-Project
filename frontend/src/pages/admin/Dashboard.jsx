import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/authSlice'
import { Users, BookOpen, UserCheck, TrendingUp, Calendar, ShieldCheck, Megaphone, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const STATS = [
    { icon: Users, label: 'Total Pupils', value: '845', desc: 'Registered this session', bg: '#fdf0e8', color: '#E86D2C' },
    { icon: UserCheck, label: 'Staff Members', value: '62', desc: 'Teachers & Admins', bg: '#e8f4ec', color: '#1a6b3a' },
    { icon: BookOpen, label: 'Active Classes', value: '34', desc: 'Crèche to Primary', bg: '#eef2ff', color: '#4338ca' },
    { icon: TrendingUp, label: 'Attendance Rate', value: '94%', desc: 'School-wide average', bg: '#fefce8', color: '#ca8a04' },
]

export default function AdminDashboard() {
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#243316' }}>Admin Overview</h1>
                <p className="text-sm" style={{ color: '#4a6325' }}>
                    Welcome back, <span className="font-bold">{user?.name || 'Administrator'}</span>. Here is your God Mode summary.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {STATS.map(({ icon: Icon, label, value, desc, bg, color }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all border border-gray-200">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                            <Icon size={22} color={color} />
                        </div>
                        <div>
                            <p className="text-2xl font-black tracking-tight" style={{ color: '#243316' }}>{value}</p>
                            <p className="text-xs font-bold uppercase tracking-wide mt-0.5" style={{ color: '#4a6325' }}>{label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Attendance Oversight Module */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50"><TrendingUp size={18} className="text-gray-600" /></div>
                        <div>
                            <h2 className="font-extrabold text-sm" style={{ color: '#243316' }}>Weekly Attendance Oversight</h2>
                            <p className="text-xs text-gray-400">Identify chronic absenteeism across all levels</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { lvl: 'Primary', val: 96, color: '#10b981' },
                            { lvl: 'Nursery', val: 91, color: '#f59e0b' },
                            { lvl: 'Crèche', val: 88, color: '#E86D2C' }
                        ].map(a => (
                            <div key={a.lvl}>
                                <div className="flex justify-between text-xs mb-1.5 font-bold">
                                    <span style={{ color: '#4a6325' }}>{a.lvl}</span>
                                    <span style={{ color: '#243316' }}>{a.val}%</span>
                                </div>
                                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${a.val}%`, background: a.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / God Mode Tools */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fdf0e8]"><ShieldCheck size={18} color="#E86D2C" /></div>
                        <div>
                            <h2 className="font-extrabold text-sm" style={{ color: '#243316' }}>God Mode Actions</h2>
                            <p className="text-xs text-[#E86D2C]">High-privilege system shortcuts</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => navigate('/admin/announcements')}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E86D2C] hover:shadow-sm transition-all text-[#243316]">
                            <Megaphone size={20} className="text-gray-400" />
                            <span className="text-xs font-bold">Broadcast Alert</span>
                        </button>
                        <button onClick={() => navigate('/admin/reports')}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E86D2C] hover:shadow-sm transition-all text-[#243316]">
                            <BookOpen size={20} className="text-gray-400" />
                            <span className="text-xs font-bold">Lock Grades</span>
                        </button>
                        <button onClick={() => navigate('/admin/users')}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E86D2C] hover:shadow-sm transition-all text-[#243316]">
                            <Users size={20} className="text-gray-400" />
                            <span className="text-xs font-bold">Bulk Register</span>
                        </button>
                        <button onClick={() => navigate('/admin/settings')}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#E86D2C] hover:shadow-sm transition-all text-[#243316]">
                            <Database size={20} className="text-gray-400" />
                            <span className="text-xs font-bold">System Backup</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
