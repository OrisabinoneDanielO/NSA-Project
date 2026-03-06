import { useState } from 'react'
import { CheckSquare, Lock, FileText, CheckCircle, AlertTriangle, Eye } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../components/Modal'

const MOCK_REPORTS = [
    { id: 1, class: 'Nursery 1A', teacher: 'Mrs. Ngozi Adeyemi', status: 'Submitted', students: 18, date: 'Today, 10:15 AM' },
    { id: 2, class: 'Primary 2A', teacher: 'Mr. Emeka Obi', status: 'Submitted', students: 25, date: 'Yesterday' },
    { id: 3, class: 'Crèche Blue', teacher: 'Miss Ade Bello', status: 'Locked', students: 12, date: '2 days ago' },
    { id: 4, class: 'Nursery 2B', teacher: 'Mrs. Fatima Ibrahim', status: 'Pending', students: 20, date: '-' },
]

export default function AdminReports() {
    const [reports, setReports] = useState(MOCK_REPORTS)
    const [selected, setSelected] = useState([])
    const [preview, setPreview] = useState(null)

    const toggleSelect = (id) => {
        setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
    }

    const handleApprove = () => {
        if (selected.length === 0) return toast.error('Select at least one report')
        setReports(rs => rs.map(r => selected.includes(r.id) && r.status === 'Submitted' ? { ...r, status: 'Locked' } : r))
        toast.success(`${selected.length} report(s) approved and locked`)
        setSelected([])
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Academic Reports Validation</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Review teacher submissions and lock grades before publishing to parents</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleApprove} disabled={selected.length === 0}
                        className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl shadow-md transition disabled:opacity-50"
                        style={{ background: '#E86D2C' }}>
                        <Lock size={15} /> Lock Selected
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {[
                    { label: 'Pending Submission', value: reports.filter(r => r.status === 'Pending').length, Icon: AlertTriangle, color: '#eab308', bg: '#fefce8' },
                    { label: 'Ready for Review', value: reports.filter(r => r.status === 'Submitted').length, Icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
                    { label: 'Approved & Locked', value: reports.filter(r => r.status === 'Locked').length, Icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
                ].map(({ label, value, Icon, color, bg }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: '1px solid #e8ede6' }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                            <Icon size={20} color={color} />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold" style={{ color: '#243316' }}>{value}</p>
                            <p className="text-xs font-bold" style={{ color: '#4a6325' }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: '#F4F7F2' }}>
                                <th className="px-5 py-3.5 w-12"><CheckSquare size={16} style={{ color: '#82996d' }} /></th>
                                {['Class', 'Form Teacher', 'Status', 'Students', 'Submitted On', 'Action'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                                        style={{ color: '#4a6325' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((r, i) => (
                                <tr key={r.id} className="hover:bg-[#fdf9f7] transition" style={{ borderTop: i === 0 ? 'none' : '1px solid #e8ede6' }}>
                                    <td className="px-5 py-4">
                                        <input type="checkbox" checked={selected.includes(r.id)} disabled={r.status === 'Locked'}
                                            onChange={() => toggleSelect(r.id)} className="w-4 h-4 rounded border-gray-300 text-[#E86D2C] focus:ring-[#E86D2C]" />
                                    </td>
                                    <td className="px-5 py-4 font-bold" style={{ color: '#243316' }}>{r.class}</td>
                                    <td className="px-5 py-4 text-xs font-semibold" style={{ color: '#4a6325' }}>{r.teacher}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-max ${r.status === 'Locked' ? 'bg-green-50 text-green-700' :
                                                r.status === 'Submitted' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                                            }`}>
                                            {r.status === 'Locked' ? <Lock size={10} /> : r.status === 'Submitted' ? <FileText size={10} /> : <AlertTriangle size={10} />}
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center font-bold" style={{ color: '#243316' }}>{r.students}</td>
                                    <td className="px-5 py-4 text-xs" style={{ color: '#4a6325' }}>{r.date}</td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => setPreview(r)} disabled={r.status === 'Pending'}
                                            className="p-2 rounded-lg transition hover:bg-[#fdf0e8] disabled:opacity-30 disabled:hover:bg-transparent"
                                            style={{ color: '#E86D2C' }} title="Preview Grades">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal isOpen={!!preview} onClose={() => setPreview(null)} title={`Grade Preview: ${preview?.class}`} size="lg">
                <div className="bg-[#F4F7F2] p-4 rounded-xl text-center mb-6">
                    <p className="text-sm font-bold" style={{ color: '#243316' }}>{preview?.teacher}</p>
                    <p className="text-xs mt-1" style={{ color: '#4a6325' }}>{preview?.students} students · Submitted {preview?.date}</p>
                </div>

                <p className="text-sm mb-4" style={{ color: '#4a6325' }}>
                    This is a read-only preview of the submitted grades. If you identify an anomaly, contact the teacher to amend it, or Lock the grades if approved.
                </p>

                <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Student</th>
                                <th className="px-4 py-2 font-semibold text-center">Numeracy</th>
                                <th className="px-4 py-2 font-semibold text-center">Literacy</th>
                                <th className="px-4 py-2 font-semibold text-center">Avg</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {['Demo Student A', 'Demo Student B', 'Demo Student C'].map((s, idx) => (
                                <tr key={s}>
                                    <td className="px-4 py-2 font-medium">{s}</td>
                                    <td className="px-4 py-2 text-center text-green-600 font-bold">{85 - idx * 3}%</td>
                                    <td className="px-4 py-2 text-center text-green-600 font-bold">{92 - idx * 4}%</td>
                                    <td className="px-4 py-2 text-center font-bold bg-gray-50">{88.5 - idx * 3.5}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex gap-3 justify-end">
                    <button onClick={() => setPreview(null)}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold border transition hover:bg-gray-50">Close Preview</button>
                    {preview?.status !== 'Locked' && (
                        <button onClick={() => {
                            setReports(rs => rs.map(r => r.id === preview.id ? { ...r, status: 'Locked' } : r));
                            toast.success('Grades Locked Successfully');
                            setPreview(null);
                        }}
                            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition flex items-center gap-2"
                            style={{ background: '#E86D2C' }}><Lock size={12} /> Lock Grades Now</button>
                    )}
                </div>
            </Modal>

        </div>
    )
}
