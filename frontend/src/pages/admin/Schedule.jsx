import { useState, useEffect } from 'react'
import { Calendar, Save, Edit2, AlertCircle, RefreshCw } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { getScheduleDB, updateSchedule, defaultScheduleDB } from '../../services/scheduleDb'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const CLASS_OPTIONS = ['Crèche', 'Nursery 1A', 'Primary 4 Gold']

export default function AdminSchedule() {
    const [scheduleDb, setScheduleDb] = useState({})
    const [selectedClass, setSelectedClass] = useState('Nursery 1A')
    const [activeDay, setActiveDay] = useState('Monday')
    const [editingCell, setEditingCell] = useState(null)
    const [editValue, setEditValue] = useState('')

    useEffect(() => {
        setScheduleDb(getScheduleDB())
    }, [])

    const currentSchedule = scheduleDb[selectedClass] || defaultScheduleDB['Nursery 1A']
    const daySchedule = currentSchedule[activeDay] || ['', '', '', '', '']

    const handleEditClick = (index, value) => {
        setEditingCell(index)
        setEditValue(value)
    }

    const handleSaveCell = (index) => {
        const newDb = updateSchedule(selectedClass, activeDay, index, editValue)
        setScheduleDb(newDb)
        setEditingCell(null)
        toast.success(`Schedule updated for ${selectedClass}`)
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') handleSaveCell(index)
        if (e.key === 'Escape') setEditingCell(null)
    }

    return (
        <div className="font-sans max-w-5xl">
            <Toaster position="top-right" />

            <div className="mb-8">
                <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Schedule Management</h1>
                <p className="text-sm mt-1" style={{ color: '#4a6325' }}>
                    View and amend class timetables across the entire academy.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-8">
                    <div className="flex-1 w-full max-w-xs">
                        <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: '#243316' }}>
                            Select Class
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => { setSelectedClass(e.target.value); setEditingCell(null); }}
                            className="w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm font-semibold outline-none focus:border-[#E86D2C] transition-colors"
                            style={{ color: '#243316' }}>
                            {CLASS_OPTIONS.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-orange-50 border border-orange-100 flex-1 sm:max-w-md">
                        <AlertCircle size={20} className="text-[#E86D2C] flex-shrink-0" />
                        <p className="text-xs text-orange-800 leading-relaxed">
                            Changes saved here will be immediately reflected on the respective Student and Teacher portals.
                        </p>
                    </div>
                </div>

                {/* Day selector */}
                <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
                    {DAYS.map(day => {
                        const active = activeDay === day;
                        return (
                            <button
                                key={day}
                                onClick={() => { setActiveDay(day); setEditingCell(null); }}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border
                                ${active ? 'bg-[#E86D2C] text-white border-[#E86D2C] shadow-md' : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'}`}
                            >
                                {day}
                            </button>
                        )
                    })}
                </div>

                {/* Schedule Editor */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden text-sm">
                    <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 font-bold uppercase tracking-wide text-xs">
                        <div className="col-span-3 p-4 pl-6 text-gray-500">Time</div>
                        <div className="col-span-1 border-l border-gray-200 h-full"></div>
                        <div className="col-span-8 p-4 text-[#243316]">Subject</div>
                    </div>

                    {daySchedule.map((subject, idx) => {
                        const isBreak = subject === 'Break' || subject.includes('Nap Time');
                        const isEditing = editingCell === idx;
                        const times = [
                            '08:00 AM - 09:30 AM',
                            '09:30 AM - 11:00 AM',
                            '11:00 AM - 11:45 AM',
                            '11:45 AM - 01:15 PM',
                            '01:15 PM - 02:30 PM'
                        ]

                        return (
                            <div key={idx} className={`grid grid-cols-12 border-b border-gray-100 last:border-b-0 transition-colors ${isBreak ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}>
                                <div className="col-span-3 p-4 pl-6 font-medium text-gray-600 flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${isBreak ? 'bg-orange-300' : 'bg-green-400'}`}></div>
                                    {times[idx]}
                                </div>

                                <div className="col-span-1 border-l border-gray-100 flex items-center justify-center text-gray-300">
                                    <div className="h-full w-px bg-gray-100 hidden sm:block"></div>
                                </div>

                                <div className="col-span-8 p-4 flex items-center justify-between group">
                                    {isEditing ? (
                                        <div className="flex items-center gap-2 w-full max-w-sm">
                                            <input
                                                type="text"
                                                autoFocus
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                                className="flex-1 px-3 py-1.5 rounded-lg border border-[#E86D2C] text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all font-semibold"
                                                style={{ color: '#243316' }}
                                            />
                                            <button
                                                onClick={() => handleSaveCell(idx)}
                                                className="p-1.5 rounded bg-[#E86D2C] text-white hover:bg-orange-700 transition">
                                                <Save size={16} />
                                            </button>
                                            <button
                                                onClick={() => setEditingCell(null)}
                                                className="p-1.5 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className={`font-bold ${isBreak ? 'text-[#E86D2C]' : 'text-[#243316]'}`}>
                                                {subject}
                                            </span>
                                            <button
                                                onClick={() => handleEditClick(idx, subject)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:bg-orange-100 hover:text-[#E86D2C] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Edit Subject">
                                                <Edit2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
