import { useState } from 'react'
import { Search, User } from 'lucide-react'

const STUDENTS = [
    { id: 1, name: 'Amara Obi', class: 'Nursery 1A', arm: 'A', attendance: '95%', avg: 'B+', status: 'Active' },
    { id: 2, name: 'Chidi Eze', class: 'Nursery 1A', arm: 'A', attendance: '88%', avg: 'A', status: 'Active' },
    { id: 3, name: 'Kemi Adeyemi', class: 'Nursery 1A', arm: 'A', attendance: '92%', avg: 'B', status: 'Active' },
    { id: 4, name: 'Teniola Bakare', class: 'Nursery 1A', arm: 'A', attendance: '79%', avg: 'C+', status: 'Active' },
    { id: 5, name: 'Emeka Nwosu', class: 'Nursery 1B', arm: 'B', attendance: '97%', avg: 'A+', status: 'Active' },
    { id: 6, name: 'Sola Ibrahim', class: 'Nursery 1B', arm: 'B', attendance: '85%', avg: 'B', status: 'Active' },
    { id: 7, name: 'Daniel Okafor', class: 'Nursery 1B', arm: 'B', attendance: '91%', avg: 'A-', status: 'Active' },
    { id: 8, name: 'Precious Ifeanyi', class: 'Primary 2A', arm: 'A', attendance: '100%', avg: 'A+', status: 'Active' },
]

const GRADE_COLOUR = {
    'A+': 'bg-green-50 text-green-700', 'A': 'bg-green-50 text-green-700', 'A-': 'bg-green-50 text-green-700',
    'B+': 'bg-blue-50 text-blue-700', 'B': 'bg-blue-50 text-blue-700',
    'C+': 'bg-yellow-50 text-yellow-700', 'C': 'bg-yellow-50 text-yellow-700',
}

export default function TeacherStudents() {
    const [search, setSearch] = useState('')
    const [classFilter, setClassFilter] = useState('All')

    const classes = ['All', 'Nursery 1A', 'Nursery 1B', 'Primary 2A']
    const filtered = STUDENTS.filter(s =>
        (classFilter === 'All' || s.class === classFilter) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>My Students</h1>
                <p className="text-sm mt-1" style={{ color: '#4a6325' }}>View and manage students across all your assigned classes</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center"
                style={{ border: '1px solid #e8ede6' }}>
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500" size={16} />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search students…"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#e8ede6', color: '#243316' }}
                        onFocus={e => e.target.style.borderColor = '#E86D2C'}
                        onBlur={e => e.target.style.borderColor = '#e8ede6'} />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {classes.map(c => (
                        <button key={c} onClick={() => setClassFilter(c)}
                            className="px-4 py-2 rounded-xl text-xs font-bold transition"
                            style={classFilter === c
                                ? { background: '#E86D2C', color: '#fff' }
                                : { background: '#F4F7F2', color: '#4a6325' }}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: '#F4F7F2' }}>
                                {['Pupil', 'Class', 'Attendance', 'Grade Avg.', 'Status', 'Action'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide"
                                        style={{ color: '#4a6325' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.id} className="hover:bg-[#fdf9f7] transition"
                                    style={{ borderTop: '1px solid #e8ede6' }}>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                                                style={{ background: '#0C2D1C' }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-semibold" style={{ color: '#243316' }}>{s.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-xs">
                                        <span className="px-2.5 py-1 rounded-full font-bold"
                                            style={{ background: '#fdf0e8', color: '#E86D2C' }}>{s.class}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`font-semibold text-xs ${parseFloat(s.attendance) >= 90 ? 'text-green-700' : parseFloat(s.attendance) >= 75 ? 'text-yellow-700' : 'text-red-700'}`}>
                                            {s.attendance}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${GRADE_COLOUR[s.avg] || 'bg-slate-100 text-slate-600'}`}>
                                            {s.avg}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">{s.status}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button className="text-xs font-bold transition hover:opacity-80" style={{ color: '#E86D2C' }}>
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm" style={{ color: '#4a6325' }}>No students found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid #e8ede6', color: '#4a6325' }}>
                    <span>Showing <strong>{filtered.length}</strong> of <strong>{STUDENTS.length}</strong> students</span>
                </div>
            </div>
        </div>
    )
}
