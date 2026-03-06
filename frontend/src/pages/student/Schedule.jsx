import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { getScheduleDB, defaultScheduleDB } from '../../services/scheduleDb'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TIMES = ['8:00 – 9:00', '9:00 – 10:00', '10:00 – 11:00', '11:00 – 12:00', '12:00 – 1:00']

const COLOURS = {
    'Literacy': 'bg-blue-50 text-blue-700 border-blue-200',
    'Numeracy': 'bg-purple-50 text-purple-700 border-purple-200',
    'Art & Craft': 'bg-pink-50 text-pink-700 border-pink-200',
    'Social Studies': 'bg-teal-50 text-teal-700 border-teal-200',
    'Music & Movement': 'bg-orange-50 text-orange-700 border-orange-200',
    'Story Time': 'bg-green-50 text-green-700 border-green-200',
    'Show & Tell': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Free Play': 'bg-slate-50 text-slate-500 border-slate-200',
    'Break': 'bg-red-50 text-red-500 border-red-100',
}

const today = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][
    Math.min(new Date().getDay() - 1, 4) >= 0 ? Math.min(new Date().getDay() - 1, 4) : 0
]

export default function StudentSchedule() {
    const [activeDay, setActiveDay] = useState(today)
    const [timetable, setTimetable] = useState(null)

    useEffect(() => {
        const db = getScheduleDB();
        setTimetable(db['Nursery 1A'] || defaultScheduleDB['Nursery 1A'])
    }, [])

    if (!timetable) return null;

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Class Schedule</h1>
                <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Weekly timetable — Nursery 1A · First Term 2025/2026</p>
            </div>

            {/* Day Toggle for Mobile / Quick View */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {DAYS.map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${activeDay === day
                            ? 'bg-[#E86D2C] text-white border-[#E86D2C] shadow-md'
                            : 'bg-white text-[#4a6325] border-[#e8ede6] hover:bg-[#F4F7F2]'
                            }`}
                    >
                        {day} {day === today && '(Today)'}
                    </button>
                ))}
            </div>

            {/* Selected Day's summary */}
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                <div className="flex items-center gap-2 mb-6">
                    <Calendar size={18} style={{ color: '#E86D2C' }} />
                    <h2 className="font-extrabold text-base" style={{ color: '#243316' }}>
                        {activeDay}'s Schedule
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {timetable[activeDay].map((s, i) => (
                        <div key={i} className={`p-4 rounded-xl border flex flex-col justify-center ${COLOURS[s] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            <span className="text-xs font-bold opacity-70 mb-1">{TIMES[i]}</span>
                            <span className="font-extrabold text-sm">{s}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop timetable */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-5 hidden md:block" style={{ border: '1px solid #e8ede6' }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wide w-32"
                                    style={{ background: '#F4F7F2', color: '#4a6325' }}>Time</th>
                                {DAYS.map(d => (
                                    <th key={d} className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wide"
                                        style={{
                                            background: d === today ? '#0C2D1C' : '#F4F7F2',
                                            color: d === today ? '#fff' : '#4a6325',
                                        }}>
                                        {d}
                                        {d === today && <span className="block text-[9px] font-normal opacity-60 normal-case">Today</span>}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TIMES.map((time, ti) => (
                                <tr key={time} style={{ borderTop: '1px solid #e8ede6' }}>
                                    <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap"
                                        style={{ color: '#4a6325', background: '#F4F7F2', borderRight: '1px solid #e8ede6' }}>
                                        {time}
                                    </td>
                                    {DAYS.map(day => {
                                        const subject = timetable[day][ti]
                                        const cls = COLOURS[subject] || 'bg-slate-50 text-slate-600 border-slate-200'
                                        return (
                                            <td key={day} className="px-3 py-2.5 text-center"
                                                style={{ background: day === today ? '#fdf9f7' : 'transparent' }}>
                                                <span className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border inline-block w-full ${cls}`}>
                                                    {subject}
                                                </span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
