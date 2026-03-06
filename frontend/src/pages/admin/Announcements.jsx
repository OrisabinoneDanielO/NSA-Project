import { useState } from 'react'
import { Megaphone, Send, Bell, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const MOCK = [
    { id: 1, title: 'Term 1 Fees Due', body: 'Please ensure all outstanding fees are settled by Friday to avoid portal suspension.', audience: 'Parents Only', date: '2 hrs ago', urgent: true },
    { id: 2, title: 'Staff Meeting at 3PM', body: 'Mandatory briefing in the Main Hall regarding the new curriculum guidelines.', audience: 'Staff Only', date: 'Yesterday', urgent: false },
    { id: 3, title: 'Mid-Term Break Commences', body: 'The school will be closed from Wednesday. Classes resume on Monday morning.', audience: 'All Users', date: 'Last Week', urgent: false },
]

export default function Announcements() {
    const [history, setHistory] = useState(MOCK)
    const [form, setForm] = useState({ title: '', body: '', audience: 'All Users', urgent: false })
    const [sending, setSending] = useState(false)

    const handlePost = async () => {
        if (!form.title.trim() || !form.body.trim()) {
            toast.error('Title and message are required')
            return
        }
        setSending(true)
        await new Promise(r => setTimeout(r, 1000)) // simulate API
        setHistory([{ id: Date.now(), ...form, date: 'Just now' }, ...history])
        toast.success('Announcement broadcast successfully!')
        setForm({ title: '', body: '', audience: 'All Users', urgent: false })
        setSending(false)
    }

    const cls = 'w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition focus:border-[#E86D2C]'

    return (
        <div className="font-sans">
            <Toaster position="top-right" />
            <div className="mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#fdf0e8]">
                    <Megaphone size={22} color="#E86D2C" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>School Broadcasts</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Send one-way announcements and urgent alerts to specific user roles</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
                {/* Left: Compose Form */}
                <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                    <h2 className="text-base font-extrabold mb-5 flex items-center gap-2" style={{ color: '#243316' }}>
                        <Send size={16} /> Compose New Message
                    </h2>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#243316' }}>Audience</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['All Users', 'Parents Only', 'Staff Only'].map(a => (
                                    <button key={a} onClick={() => setForm(p => ({ ...p, audience: a }))}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                                        style={form.audience === a
                                            ? { background: '#0C2D1C', color: '#fff' }
                                            : { background: '#F4F7F2', color: '#4a6325', border: '1px solid #e8ede6' }}>
                                        <Users size={14} /> {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#243316' }}>Subject / Title</label>
                            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                placeholder="e.g. Important Update regarding..."
                                className={cls} style={{ borderColor: '#e8ede6', color: '#243316' }} />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#243316' }}>Message Body</label>
                            <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                                rows={5} placeholder="Type the announcement here..."
                                className={`${cls} resize-none`} style={{ borderColor: '#e8ede6', color: '#243316' }} />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <button onClick={() => setForm(p => ({ ...p, urgent: !p.urgent }))}
                                    className="w-11 h-6 rounded-full relative transition-colors duration-200"
                                    style={{ background: form.urgent ? '#E86D2C' : '#e8ede6' }}>
                                    <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
                                        style={{ left: form.urgent ? '22px' : '2px' }} />
                                </button>
                                <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: form.urgent ? '#E86D2C' : '#4a6325' }}>
                                    <AlertTriangle size={15} /> Flag as Urgent
                                </span>
                            </label>

                            <button onClick={handlePost} disabled={sending}
                                className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl text-sm transition hover:opacity-90 disabled:opacity-60"
                                style={{ background: '#E86D2C' }}>
                                {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={14} />} Broadcast Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: History */}
                <div>
                    <h2 className="text-base font-extrabold mb-4 flex items-center gap-2" style={{ color: '#243316' }}>
                        <Clock size={16} /> Broadcast History
                    </h2>
                    <div className="flex flex-col gap-3">
                        {history.map(h => (
                            <div key={h.id} className="bg-white rounded-2xl p-5 shadow-sm"
                                style={{ border: `1px solid ${h.urgent ? 'rgba(232,109,44,0.3)' : '#e8ede6'}` }}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                            style={{ background: '#F4F7F2', color: '#4a6325' }}>
                                            {h.audience}
                                        </span>
                                        {h.urgent && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"
                                                style={{ background: '#fdf0e8', color: '#E86D2C' }}>
                                                <Bell size={10} /> Urgent
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs" style={{ color: '#82996d' }}>{h.date}</span>
                                </div>
                                <h3 className="font-bold text-sm mb-1.5" style={{ color: h.urgent ? '#E86D2C' : '#243316' }}>{h.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: '#4a6325' }}>{h.body}</p>

                                <div className="mt-4 pt-3 flex items-center gap-1.5 text-xs font-semibold"
                                    style={{ borderTop: '1px dashed #e8ede6', color: '#1a6b3a' }}>
                                    <CheckCircle size={13} /> Delivered to target dashboards
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
