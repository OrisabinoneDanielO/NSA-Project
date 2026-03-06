import { useState } from 'react'
import { Save, School, Calendar, Bell, Shield, Clock, Database, Download, History, Search, ChevronDown } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback }
    catch { return fallback }
}

const SECTIONS = [
    { Icon: School, id: 'school', label: 'School Information' },
    { Icon: Calendar, id: 'academic', label: 'Academic Session' },
    { Icon: Bell, id: 'notifs', label: 'Notification Preferences' },
    { Icon: Shield, id: 'security', label: 'Security & Access' },
    { Icon: History, id: 'audit', label: 'System Audit Logs' },
    { Icon: Database, id: 'backup', label: 'Data Backups' },
]

const MOCK_AUDIT = [
    { id: 1, user: 'Mrs. Adaobi Nwosu', action: 'Locked Grade Report', detail: 'Locked Primary 2A First Term Report', time: '10 mins ago' },
    { id: 2, user: 'System', action: 'Automated Backup', detail: 'Full daily database baseline created', time: '4 hours ago' },
    { id: 3, user: 'Mr. Emeka Obi', action: 'Grade Submission', detail: 'Submitted grades for Nursery 1A', time: 'Yesterday, 4:15 PM' },
    { id: 4, user: 'Mrs. Adaobi Nwosu', action: 'Broadcast Sent', detail: '"Term 1 Fees Due" sent to Parents', time: 'Yesterday, 2:00 PM' },
    { id: 5, user: 'Mr. Chidi Nwosu', action: 'Profile Update', detail: 'Updated contact phone number', time: '2 days ago' },
]

export default function AdminSettings() {
    const [activeTab, setTab] = useState('school')
    const [auditSearch, setAuditSearch] = useState('')

    const [school, setSchool] = useState(load('nsa_school', {
        name: 'Nurtured Seeds Academy', tagline: 'Growing Minds, Shaping Futures',
        email: 'info@nurturedseeds.com', phone: '+234 9876543210',
        address: 'NSA Building, XYZ Road, Akute', state: 'Ogun State', principal: 'Mrs. Adaobi Nwosu',
    }))

    const [academic, setAcademic] = useState(load('nsa_academic', {
        session: '2025/2026', term: 'First Term', termStart: '2026-01-13', termEnd: '2026-04-04', nextSession: '2026/2027',
    }))

    const [notifs, setNotifs] = useState(load('nsa_notifs', {
        gradeAlerts: true, attendanceAlerts: true, feeReminders: true, parentMessages: true, systemUpdates: false, weeklyReport: true,
    }))

    const [security, setSecurity] = useState(load('nsa_security', {
        mfaEnabled: false, sessionTimeout: '60', auditLog: true, loginNotifications: true,
    }))

    const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition"
    const inputStyle = { borderColor: '#e8ede6', color: '#243316' }
    const onFocus = e => e.target.style.borderColor = '#E86D2C'
    const onBlur = e => e.target.style.borderColor = '#e8ede6'

    const Field = ({ label, children }) => (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>{label}</label>
            {children}
        </div>
    )

    const Toggle = ({ label, desc, checked, onChange }) => (
        <div className="flex items-start justify-between gap-4 py-3" style={{ borderBottom: '1px solid #e8ede6' }}>
            <div>
                <p className="text-sm font-semibold" style={{ color: '#243316' }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4a6325' }}>{desc}</p>
            </div>
            <button onClick={() => onChange(!checked)}
                className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200"
                style={{ background: checked ? '#E86D2C' : '#e8ede6' }}>
                <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: checked ? '22px' : '2px' }} />
            </button>
        </div>
    )

    const saveSection = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data)); toast.success('Settings saved successfully')
    }

    const triggerBackup = () => {
        const data = JSON.stringify({ school, academic, security, timestamp: new Date().toISOString() }, null, 2)
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `NSA_Backup_${new Date().getTime()}.json`; a.click()
        URL.revokeObjectURL(url)
        toast.success('Database backup generated successfully')
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />
            <div className="mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-gray-200 object-contain">
                    <Shield size={22} color="#E86D2C" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>System Settings & Security</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Configure school parameters, view audit trails, and manage data backups</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar tabs */}
                <div className="lg:w-60 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-2" style={{ border: '1px solid #e8ede6' }}>
                        {SECTIONS.map(({ Icon, id, label }) => (
                            <button key={id} onClick={() => setTab(id)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition"
                                style={activeTab === id ? { background: '#fdf0e8', color: '#E86D2C' } : { color: '#4a6325' }}>
                                <Icon size={16} /> {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panel */}
                <div className="flex-1 bg-white rounded-2xl p-7" style={{ border: '1px solid #e8ede6' }}>

                    {activeTab === 'school' && (
                        <>
                            <h2 className="font-extrabold text-base mb-6" style={{ color: '#243316' }}>School Information</h2>
                            <div className="grid sm:grid-cols-2 gap-5 mb-6">
                                <Field label="School Name"><input value={school.name} onChange={e => setSchool(p => ({ ...p, name: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Tagline / Motto"><input value={school.tagline} onChange={e => setSchool(p => ({ ...p, tagline: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Email Address"><input type="email" value={school.email} onChange={e => setSchool(p => ({ ...p, email: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Phone Number"><input value={school.phone} onChange={e => setSchool(p => ({ ...p, phone: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Street Address"><input value={school.address} onChange={e => setSchool(p => ({ ...p, address: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Principal"><input value={school.principal} onChange={e => setSchool(p => ({ ...p, principal: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                            </div>
                            <button onClick={() => saveSection('nsa_school', school)} className="flex items-center gap-2 px-7 py-3 text-white font-bold rounded-xl text-sm" style={{ background: '#E86D2C' }}><Save size={15} /> Save School Info</button>
                        </>
                    )}

                    {activeTab === 'academic' && (
                        <>
                            <h2 className="font-extrabold text-base mb-6" style={{ color: '#243316' }}>Academic Session</h2>
                            <div className="grid sm:grid-cols-2 gap-5 mb-6">
                                <Field label="Current Session"><input value={academic.session} onChange={e => setAcademic(p => ({ ...p, session: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Current Term">
                                    <div className="relative">
                                        <select value={academic.term} onChange={e => setAcademic(p => ({ ...p, term: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}>
                                            <option>First Term</option><option>Second Term</option><option>Third Term</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={16} />
                                    </div>
                                </Field>
                                <Field label="Term Start Date"><input type="date" value={academic.termStart} onChange={e => setAcademic(p => ({ ...p, termStart: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                                <Field label="Term End Date"><input type="date" value={academic.termEnd} onChange={e => setAcademic(p => ({ ...p, termEnd: e.target.value }))} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></Field>
                            </div>
                            <button onClick={() => saveSection('nsa_academic', academic)} className="flex items-center gap-2 px-7 py-3 text-white font-bold rounded-xl text-sm" style={{ background: '#E86D2C' }}><Save size={15} /> Save Session Info</button>
                        </>
                    )}

                    {activeTab === 'notifs' && (
                        <>
                            <h2 className="font-extrabold text-base mb-6" style={{ color: '#243316' }}>Notification Preferences</h2>
                            <div className="mb-6">
                                {[
                                    { k: 'gradeAlerts', l: 'Grade Alerts', d: 'Notify parents when new grades are published' },
                                    { k: 'attendanceAlerts', l: 'Attendance Alerts', d: 'Send alerts for pupil absences' },
                                    { k: 'parentMessages', l: 'Parent Messages', d: 'Enable direct parent-teacher messaging' },
                                ].map(({ k, l, d }) => <Toggle key={k} label={l} desc={d} checked={notifs[k]} onChange={v => setNotifs(p => ({ ...p, [k]: v }))} />)}
                            </div>
                            <button onClick={() => saveSection('nsa_notifs', notifs)} className="flex items-center gap-2 px-7 py-3 text-white font-bold rounded-xl text-sm" style={{ background: '#E86D2C' }}><Save size={15} /> Save Preferences</button>
                        </>
                    )}

                    {activeTab === 'security' && (
                        <>
                            <h2 className="font-extrabold text-base mb-6" style={{ color: '#243316' }}>Security & Access</h2>
                            <div className="mb-6">
                                {[
                                    { k: 'mfaEnabled', l: 'Multi-Factor Authentication', d: 'Require MFA for all admin logins' },
                                    { k: 'auditLog', l: 'Audit Logging', d: 'Log all user actions for security review' },
                                    { k: 'loginNotifications', l: 'Login Notifications', d: 'Email alert on new device login' },
                                ].map(({ k, l, d }) => <Toggle key={k} label={l} desc={d} checked={security[k]} onChange={v => setSecurity(p => ({ ...p, [k]: v }))} />)}
                                <div className="mt-5"><Field label="Session Timeout (minutes)"><div className="relative"><Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#4a6325' }} /><input type="number" value={security.sessionTimeout} onChange={e => setSecurity(p => ({ ...p, sessionTimeout: e.target.value }))} className={inputCls + ' pl-9'} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div></Field></div>
                            </div>
                            <button onClick={() => saveSection('nsa_security', security)} className="flex items-center gap-2 px-7 py-3 text-white font-bold rounded-xl text-sm" style={{ background: '#E86D2C' }}><Save size={15} /> Save Security Settings</button>
                        </>
                    )}

                    {/* ── God Mode: Audit Logs ── */}
                    {activeTab === 'audit' && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-extrabold text-base" style={{ color: '#243316' }}>System Audit Logs</h2>
                                <div className="relative w-64">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input value={auditSearch} onChange={e => setAuditSearch(e.target.value)}
                                        placeholder="Search logs..." className="w-full pl-8 pr-4 py-2 border border-gray-200 outline-none rounded-lg text-xs" />
                                </div>
                            </div>
                            <p className="text-sm mb-5" style={{ color: '#4a6325' }}>Monitor high-privilege actions, logins, and data modifications.</p>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr><th className="p-3 font-semibold text-gray-600">Timestamp</th><th className="p-3 font-semibold text-gray-600">User</th><th className="p-3 font-semibold text-gray-600">Action</th><th className="p-3 font-semibold text-gray-600">Details</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {MOCK_AUDIT.filter(a => a.user.toLowerCase().includes(auditSearch.toLowerCase()) || a.action.toLowerCase().includes(auditSearch.toLowerCase())).map(a => (
                                            <tr key={a.id} className="hover:bg-gray-50">
                                                <td className="p-3 text-xs text-gray-500 whitespace-nowrap">{a.time}</td>
                                                <td className="p-3 font-medium text-gray-800">{a.user}</td>
                                                <td className="p-3"><span className="px-2 py-1 bg-[#F4F7F2] text-[#4a6325] text-[10px] font-bold uppercase tracking-wider rounded">{a.action}</span></td>
                                                <td className="p-3 text-xs text-gray-600">{a.detail}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* ── God Mode: Database Backups ── */}
                    {activeTab === 'backup' && (
                        <>
                            <h2 className="font-extrabold text-base mb-4" style={{ color: '#243316' }}>Database Backups</h2>
                            <p className="text-sm mb-6 max-w-xl" style={{ color: '#4a6325' }}>
                                Manually trigger a full snapshot of the school's database including student records, grades, and system settings. Ensure you store downloaded JSON backups securely.
                            </p>

                            <div className="bg-[#fdf0e8] p-6 rounded-2xl border flex items-start gap-4 mb-8" style={{ borderColor: 'rgba(232,109,44,0.3)' }}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm"><Download size={18} color="#E86D2C" /></div>
                                <div>
                                    <h3 className="font-bold text-sm mb-1" style={{ color: '#E86D2C' }}>Manual System Output</h3>
                                    <p className="text-xs mb-4" style={{ color: '#E86D2C', opacity: 0.8 }}>Generates a signed JSON file containing all active system indices.</p>
                                    <button onClick={triggerBackup}
                                        className="flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl text-sm transition shadow-md hover:-translate-y-0.5"
                                        style={{ background: '#E86D2C' }}>
                                        <Database size={15} /> Trigger JSON Backup
                                    </button>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200"><h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Recent Backups</h4></div>
                                <div className="divide-y divide-gray-100">
                                    {['Today, 00:00 AM (Auto)', 'Yesterday, 00:00 AM (Auto)', 'Oct 24, 2:30 PM (Manual)'].map((b, i) => (
                                        <div key={i} className="px-5 py-3.5 flex justify-between items-center bg-white hover:bg-gray-50 transition">
                                            <div className="flex items-center gap-3">
                                                <History size={16} className="text-gray-400" />
                                                <div><p className="text-sm font-semibold text-gray-800">NSA_DB_Backup</p><p className="text-xs text-gray-500">{b}</p></div>
                                            </div>
                                            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">24.5 MB</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}
