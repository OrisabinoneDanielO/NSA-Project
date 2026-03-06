import { useState } from 'react'
import { Printer, Download } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const RESULTS = [
    { subject: 'Literacy', ca1: 18, ca2: 17, exam: 55, total: 90, grade: 'A', remark: 'Excellent' },
    { subject: 'Numeracy', ca1: 15, ca2: 16, exam: 48, total: 79, grade: 'B+', remark: 'Very Good' },
    { subject: 'Art & Craft', ca1: 19, ca2: 18, exam: 58, total: 95, grade: 'A+', remark: 'Outstanding' },
    { subject: 'Social Studies', ca1: 14, ca2: 13, exam: 41, total: 68, grade: 'C+', remark: 'Good' },
]

const GRADE_C = g => ({
    'A+': 'bg-green-50 text-green-700', 'A': 'bg-green-50 text-green-700',
    'B+': 'bg-blue-50 text-blue-700', 'B': 'bg-blue-50 text-blue-700',
    'C+': 'bg-yellow-50 text-yellow-700', 'C': 'bg-yellow-50 text-yellow-700',
}[g] || 'bg-slate-100 text-slate-600')

export default function StudentGrades() {
    const avg = Math.round(RESULTS.reduce((a, r) => a + r.total, 0) / RESULTS.length)
    const overallGrade = avg >= 90 ? 'A+' : avg >= 80 ? 'A' : avg >= 70 ? 'B+' : avg >= 60 ? 'B' : 'C+'

    const handlePrint = () => {
        window.print()
        toast.success('Print dialog opened')
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8 print:hidden">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>My Grades</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>First Term Results — 2025/2026 Academic Session · Nursery 1A</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition hover:opacity-90"
                        style={{ background: '#E86D2C' }}>
                        <Printer size={14} /> Print Report
                    </button>
                </div>
            </div>

            <div className="print-content">
                {/* Print Only Header (Hidden on screen) */}
                <div className="hidden print:block mb-8 text-center border-b pb-4 border-gray-200">
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Nurtured Seeds Academy</h1>
                    <p className="text-sm font-bold mt-1" style={{ color: '#4a6325' }}>First Term Results — 2025/2026 Academic Session</p>
                    <p className="text-xs mt-1" style={{ color: '#4a6325' }}>Student: <strong>Demo Student</strong> | Class: <strong>Nursery 1A</strong></p>
                </div>

                {/* Summary banner */}
                <div className="rounded-2xl p-6 flex flex-wrap items-center gap-6 mb-8" style={{ background: '#0C2D1C' }}>
                    <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Overall Performance</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-5xl font-black" style={{ color: '#E86D2C' }}>{avg}%</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-extrabold ${GRADE_C(overallGrade)}`}>{overallGrade}</span>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {[['Subjects', RESULTS.length], ['Position', '3rd'], ['Term', '1st']].map(([l, v]) => (
                            <div key={l} className="text-center">
                                <p className="text-2xl font-black text-white">{v}</p>
                                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: '#F4F7F2' }}>
                                    {['Subject', 'CA1 /20', 'CA2 /20', 'Exam /60', 'Total /100', 'Grade', 'Remark'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                                            style={{ color: '#4a6325' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {RESULTS.map((r, i) => (
                                    <tr key={r.subject} className="hover:bg-[#fdf9f7] transition"
                                        style={{ borderTop: i === 0 ? 'none' : '1px solid #e8ede6' }}>
                                        <td className="px-5 py-4 font-semibold" style={{ color: '#243316' }}>{r.subject}</td>
                                        <td className="px-5 py-4 text-center" style={{ color: '#4a6325' }}>{r.ca1}</td>
                                        <td className="px-5 py-4 text-center" style={{ color: '#4a6325' }}>{r.ca2}</td>
                                        <td className="px-5 py-4 text-center" style={{ color: '#4a6325' }}>{r.exam}</td>
                                        <td className="px-5 py-4 text-center font-extrabold" style={{ color: '#243316' }}>{r.total}</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${GRADE_C(r.grade)}`}>{r.grade}</span>
                                        </td>
                                        <td className="px-5 py-4 text-xs" style={{ color: '#4a6325' }}>{r.remark}</td>
                                    </tr>
                                ))}
                                <tr style={{ borderTop: '2px solid #e8ede6', background: '#F4F7F2' }}>
                                    <td className="px-5 py-3.5 font-extrabold text-xs uppercase tracking-wide" style={{ color: '#243316' }}>Average</td>
                                    <td colSpan={3} />
                                    <td className="px-5 py-3.5 text-center font-extrabold text-base" style={{ color: '#E86D2C' }}>{avg}</td>
                                    <td className="px-5 py-3.5 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${GRADE_C(overallGrade)}`}>{overallGrade}</span>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs font-bold" style={{ color: '#243316' }}>Outstanding</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
