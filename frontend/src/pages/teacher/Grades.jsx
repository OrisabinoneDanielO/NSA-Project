import { useState } from 'react'
import { Save, ChevronDown } from 'lucide-react'

const CLASSES = ['Nursery 1A', 'Nursery 1B', 'Primary 2A']
const SUBJECTS = { 'Nursery 1A': ['Literacy', 'Numeracy', 'Art', 'Social Studies'], 'Nursery 1B': ['Literacy', 'Numeracy', 'Art', 'Social Studies'], 'Primary 2A': ['Mathematics', 'English', 'Basic Science', 'Social Studies', 'CRS'] }
const STUDENTS = {
    'Nursery 1A': ['Amara Obi', 'Chidi Eze', 'Kemi Adeyemi', 'Teniola Bakare', 'Fola Adesanya', 'Bisi Okonkwo'],
    'Nursery 1B': ['Emeka Nwosu', 'Sola Ibrahim', 'Daniel Okafor', 'Grace Uchenna', 'Chukwu Ogba'],
    'Primary 2A': ['Precious Ifeanyi', 'Tunde Adeleke', 'Ngozi Obi', 'Seun Bello', 'Amaka Eze'],
}

export default function TeacherGrades() {
    const [cls, setCls] = useState('Nursery 1A')
    const [sub, setSub] = useState(SUBJECTS['Nursery 1A'][0])
    const [saved, setSaved] = useState(false)
    const [grades, setGrades] = useState({})

    const students = STUDENTS[cls] || []
    const subjects = SUBJECTS[cls] || []

    const handleCls = (c) => { setCls(c); setSub(SUBJECTS[c][0]); setGrades({}); setSaved(false) }

    const setGrade = (student, field, val) =>
        setGrades(g => ({ ...g, [student]: { ...g[student], [field]: val } }))

    return (
        <div className="font-sans">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Grade Entry</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Record and submit pupil scores for the current term</p>
                </div>
                <button onClick={() => setSaved(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl shadow-md transition hover:-translate-y-0.5"
                    style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                    <Save size={14} /> {saved ? 'Saved ✓' : 'Save Grades'}
                </button>
            </div>

            {/* Selectors */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap gap-4" style={{ border: '1px solid #e8ede6' }}>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                    <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Class</label>
                    <div className="relative">
                        <select value={cls} onChange={e => handleCls(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 pr-8 rounded-xl text-sm border outline-none"
                            style={{ borderColor: '#e8ede6', color: '#243316' }}>
                            {CLASSES.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                    <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Subject</label>
                    <div className="relative">
                        <select value={sub} onChange={e => setSub(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 pr-8 rounded-xl text-sm border outline-none"
                            style={{ borderColor: '#e8ede6', color: '#243316' }}>
                            {subjects.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                    </div>
                </div>
            </div>

            {/* Grade table */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                <div className="px-5 py-4" style={{ background: '#F4F7F2', borderBottom: '1px solid #e8ede6' }}>
                    <p className="text-sm font-bold" style={{ color: '#243316' }}>{cls} — {sub}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#4a6325' }}>First Term · 2025/2026 Session</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e8ede6' }}>
                                {['Pupil Name', 'CA1 (20)', 'CA2 (20)', 'Exam (60)', 'Total (100)'].map(h => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide"
                                        style={{ color: '#4a6325' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s, i) => {
                                const g = grades[s] || {}
                                const total = [g.ca1, g.ca2, g.exam].every(Boolean)
                                    ? Number(g.ca1) + Number(g.ca2) + Number(g.exam) : null
                                return (
                                    <tr key={s} className="hover:bg-[#fdf9f7] transition"
                                        style={{ borderTop: i === 0 ? 'none' : '1px solid #e8ede6' }}>
                                        <td className="px-5 py-3.5 font-semibold" style={{ color: '#243316' }}>{s}</td>
                                        {['ca1', 'ca2', 'exam'].map(f => (
                                            <td key={f} className="px-5 py-3">
                                                <input type="number" min={0} max={f === 'exam' ? 60 : 20}
                                                    value={g[f] ?? ''} onChange={e => setGrade(s, f, e.target.value)}
                                                    placeholder="—"
                                                    className="w-16 px-2.5 py-1.5 rounded-lg text-sm border text-center outline-none transition"
                                                    style={{ borderColor: '#e8ede6', color: '#243316' }}
                                                    onFocus={e => e.target.style.borderColor = '#E86D2C'}
                                                    onBlur={e => e.target.style.borderColor = '#e8ede6'} />
                                            </td>
                                        ))}
                                        <td className="px-5 py-3.5">
                                            {total !== null ? (
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${total >= 70 ? 'bg-green-50 text-green-700' : total >= 50 ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                                    {total}
                                                </span>
                                            ) : <span className="text-xs" style={{ color: '#4a6325' }}>—</span>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
