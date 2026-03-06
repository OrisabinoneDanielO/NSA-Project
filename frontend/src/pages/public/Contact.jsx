import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronRight } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const INFO = [
    { Icon: MapPin, title: 'Our Address', lines: ['NSA Building, XYZ Road, Akute', 'Ogun State, Nigeria'] },
    { Icon: Phone, title: 'Call Us', lines: ['+234 9876543210', '+234 8012345678'] },
    { Icon: Mail, title: 'Email Us', lines: ['info@nurturedseeds.com', 'admissions@nurturedseeds.com'] },
    { Icon: Clock, title: 'Office Hours', lines: ['Mon – Fri: 7:30 AM – 4:30 PM', 'Saturday: 9 AM – 12 PM (admin)'] },
]

const SUBJECTS = ['Admission Enquiry', 'Crèche Enquiry', 'Nursery Enquiry', 'Primary Enquiry', 'Fee Information', 'School Tour', 'General Enquiry']

const BLANK = { name: '', email: '', phone: '', subject: '', message: '' }
const inputBase = 'w-full px-4 py-3 rounded-xl text-sm border outline-none transition bg-white'
const iStyle = { borderColor: '#e8ede6', color: '#243316' }
const onFocus = e => e.target.style.borderColor = '#E86D2C'
const onBlur = e => e.target.style.borderColor = '#e8ede6'

const Label = ({ children }) => (
    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#243316' }}>{children}</label>
)

export default function Contact() {
    const [form, setForm] = useState(BLANK)
    const [loading, setLoad] = useState(false)
    const [done, setDone] = useState(false)

    const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

    const submit = async (e) => {
        e.preventDefault()
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error('Please fill in Name, Email and Message'); return
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('Enter a valid email address'); return
        }
        setLoad(true)
        await new Promise(r => setTimeout(r, 1200))
        setLoad(false); setDone(true)
        toast.success("Message sent! We'll reply within 24 hours.")
    }

    return (
        <>
            <Toaster position="top-right" />

            {/* ── Page Header ── */}
            <div className="pt-20" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E86D2C' }}>Reach Out</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-5">Contact Us</h1>
                    <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Have a question about admissions or want to schedule a tour? We'd love to hear from you.
                    </p>
                </div>
            </div>

            {/* ── Body ── */}
            <section className="py-20 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-10 items-start">

                    {/* Left — Info */}
                    <div className="flex flex-col gap-4">
                        {INFO.map(({ Icon, title, lines }) => (
                            <div key={title} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e8ede6' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: '#fdf0e8' }}>
                                        <Icon size={18} color="#E86D2C" />
                                    </div>
                                    <p className="font-extrabold text-sm" style={{ color: '#243316' }}>{title}</p>
                                </div>
                                {lines.map(l => (
                                    <p key={l} className="text-xs leading-relaxed pl-13" style={{ color: '#4a6325', paddingLeft: 52 }}>{l}</p>
                                ))}
                            </div>
                        ))}

                        {/* Admission CTA box */}
                        <div className="rounded-2xl p-5 text-white" style={{ background: '#0C2D1C' }}>
                            <p className="font-extrabold text-sm mb-2">Ready to Enroll?</p>
                            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                Spaces are limited each term. Secure your child's place today before they're filled.
                            </p>
                            <a href="tel:+23498765432100"
                                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold"
                                style={{ background: '#E86D2C' }}>
                                Call Admissions Now <ChevronRight size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                        {done ? (
                            <div className="flex flex-col items-center text-center py-10">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                                    style={{ background: '#e8f4ec' }}>
                                    <CheckCircle size={38} color="#1a6b3a" />
                                </div>
                                <h3 className="text-2xl font-extrabold mb-2" style={{ color: '#243316' }}>Message Sent!</h3>
                                <p className="text-sm mb-6 max-w-sm" style={{ color: '#4a6325' }}>
                                    Thank you for reaching out. A member of our admissions team will respond within 24 hours.
                                </p>
                                <button onClick={() => { setDone(false); setForm(BLANK) }}
                                    className="px-7 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                                    style={{ background: '#E86D2C' }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-extrabold mb-1" style={{ color: '#243316' }}>Send Us a Message</h2>
                                <p className="text-sm mb-7" style={{ color: '#4a6325' }}>We typically respond within one business day.</p>

                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <Label>Full Name <span style={{ color: '#E86D2C' }}>*</span></Label>
                                            <input value={form.name} onChange={set('name')} placeholder="e.g. Mrs. Ada Okafor"
                                                className={inputBase} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                                        </div>
                                        <div>
                                            <Label>Email Address <span style={{ color: '#E86D2C' }}>*</span></Label>
                                            <input value={form.email} onChange={set('email')} type="email" placeholder="you@example.com"
                                                className={inputBase} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <Label>Phone Number</Label>
                                            <input value={form.phone} onChange={set('phone')} type="tel" placeholder="+234 800 000 0000"
                                                className={inputBase} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                                        </div>
                                        <div>
                                            <Label>Subject</Label>
                                            <select value={form.subject} onChange={set('subject')}
                                                className={inputBase} style={iStyle} onFocus={onFocus} onBlur={onBlur}>
                                                <option value="">Select a topic…</option>
                                                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Your Message <span style={{ color: '#E86D2C' }}>*</span></Label>
                                        <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Tell us about your child and how we can help…"
                                            className={inputBase + ' resize-none'} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                                    </div>

                                    <button type="submit" disabled={loading}
                                        className="flex items-center justify-center gap-2.5 py-4 text-white font-bold rounded-xl text-sm transition hover:opacity-90 disabled:opacity-60"
                                        style={{ background: '#E86D2C', boxShadow: '0 6px 20px rgba(232,109,44,0.35)' }}>
                                        {loading
                                            ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            : <><Send size={15} /> Send Message</>}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
