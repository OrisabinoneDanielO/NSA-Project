import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Filter, AlertTriangle, Upload, FileText, Download } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../components/Modal'

const SEED = [
    { id: 1, name: 'Mrs. Adaobi Nwosu', email: 'adaobi@nsa.edu.ng', role: 'Admin', status: 'Active', last: 'Today, 9:14 AM' },
    { id: 2, name: 'Mr. Emeka Obi', email: 'emeka@nsa.edu.ng', role: 'Teacher', status: 'Active', last: 'Today, 8:02 AM' },
    { id: 3, name: 'Miss Fatima Bello', email: 'fatima@nsa.edu.ng', role: 'Teacher', status: 'Active', last: 'Yesterday' },
    { id: 4, name: 'Mr. Chukwudi Eze', email: 'chukwudi@nsa.edu.ng', role: 'Teacher', status: 'Inactive', last: '3 days ago' },
    { id: 5, name: 'Mrs. Ngozi Adeyemi', email: 'ngozi@nsa.edu.ng', role: 'Teacher', status: 'Active', last: 'Today, 10:30 AM' },
    { id: 6, name: 'Mr. Tunde Bakare', email: 'tunde.p@gmail.com', role: 'Parent', status: 'Active', last: '2 hours ago' },
    { id: 7, name: 'Mrs. Sola Okafor', email: 'sola.p@gmail.com', role: 'Parent', status: 'Active', last: 'Yesterday' },
]

const ROLE_C = {
    Admin: { bg: '#fdf0e8', color: '#E86D2C' },
    Teacher: { bg: '#e8f4ec', color: '#1a6b3a' },
    Parent: { bg: '#eef2ff', color: '#4338ca' },
}

const BLANK = { name: '', email: '', role: 'Teacher', status: 'Active' }

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>{label}</label>
        {children}
    </div>
)

const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition"
const inputStyle = { borderColor: '#e8ede6', color: '#243316' }
const focus = (e) => e.target.style.borderColor = '#E86D2C'
const blur = (e) => e.target.style.borderColor = '#e8ede6'

export default function AdminUsers() {
    const [users, setUsers] = useState(SEED)
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('All')

    const [showForm, setShowForm] = useState(false)
    const [showDel, setShowDel] = useState(false)
    const [showBulk, setShowBulk] = useState(false)
    const [editUser, setEditUser] = useState(null)
    const [delTarget, setDelTarget] = useState(null)
    const [form, setForm] = useState(BLANK)
    const [uploading, setUploading] = useState(false)

    const filtered = users.filter(u =>
        (roleFilter === 'All' || u.role === roleFilter) &&
        (u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()))
    )

    const openAdd = () => { setEditUser(null); setForm(BLANK); setShowForm(true) }
    const openEdit = (u) => { setEditUser(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setShowForm(true) }
    const openDel = (u) => { setDelTarget(u); setShowDel(true) }

    const fc = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

    const incrementStats = (role, amount = 1) => {
        try {
            const saved = localStorage.getItem('nsa_home_stats')
            let stats = saved ? JSON.parse(saved) : { pupils: '500+', staff: '20+', years: '10+', levels: '3' }

            const updateField = (field) => {
                const currentStr = String(stats[field]);
                const match = currentStr.match(/^(\d+)(.*)$/)
                if (match) {
                    stats[field] = (parseInt(match[1], 10) + amount) + match[2]
                } else {
                    stats[field] = String((parseInt(currentStr) || 0) + amount)
                }
            }

            if (['Teacher', 'Admin', 'Accountant'].includes(role)) updateField('staff')
            else updateField('pupils')

            localStorage.setItem('nsa_home_stats', JSON.stringify(stats))
        } catch { }
    }

    const handleSave = () => {
        if (!form.name.trim() || !form.email.trim()) { toast.error('Name and email are required'); return }
        if (!/\S+@\S+\.\S+/.test(form.email)) { toast.error('Enter a valid email address'); return }
        if (editUser) {
            setUsers(us => us.map(u => u.id === editUser.id ? { ...u, ...form } : u))
            toast.success('User updated successfully')
        } else {
            setUsers(us => [{ id: Date.now(), ...form, last: 'Just now' }, ...us])
            toast.success('User created successfully')
            incrementStats(form.role, 1)
        }
        setShowForm(false)
    }

    const handleDelete = () => {
        setUsers(us => us.filter(u => u.id !== delTarget.id))
        toast.success(`${delTarget.name} has been removed`)
        setShowDel(false)
    }

    const toggleStatus = (id) => {
        setUsers(us => us.map(u => u.id === id
            ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
            : u
        ))
        const u = users.find(u => u.id === id)
        toast.success(`${u.name} is now ${u.status === 'Active' ? 'Inactive' : 'Active'}`)
    }

    const handleBulkUpload = async (e) => {
        e.preventDefault()
        setUploading(true)
        await new Promise(r => setTimeout(r, 1500)) // simulate upload
        toast.success('CSV processed: 45 new users enrolled successfully')
        incrementStats('Parent', 45)
        setUploading(false)
        setShowBulk(false)
    }

    const downloadTemplate = () => {
        const csv = 'name,email,role\nJohn Doe,john@example.com,Parent\nJane Smith,jane@nsa.edu.ng,Teacher'
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'NSA_Bulk_Enrollment_Template.csv'; a.click()
        URL.revokeObjectURL(url)
        toast.success('Template downloaded')
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>User Provisioning & Roles</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>
                        <strong>{users.length}</strong> total users · Manage accounts and RBAC permissions
                    </p>
                </div>
                <div className="flex gap-2 text-sm font-bold">
                    <button onClick={() => setShowBulk(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border transition hover:bg-[#F4F7F2]"
                        style={{ color: '#243316', borderColor: '#e8ede6' }}>
                        <Upload size={15} /> Bulk Register
                    </button>
                    <button onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl shadow-md transition hover:-translate-y-0.5"
                        style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                        <Plus size={16} strokeWidth={3} /> Add User
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center"
                style={{ border: '1px solid #e8ede6' }}>
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" size={16} style={{ color: '#4a6325' }} />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or email…"
                        className={inputCls + ' pl-10 pr-4'} style={inputStyle}
                        onFocus={focus} onBlur={blur} />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={15} style={{ color: '#4a6325' }} className="mr-1" />
                    {['All', 'Admin', 'Teacher', 'Parent'].map(r => (
                        <button key={r} onClick={() => setRoleFilter(r)}
                            className="px-4 py-2 rounded-xl text-xs font-bold transition"
                            style={roleFilter === r ? { background: '#E86D2C', color: '#fff' } : { background: '#F4F7F2', color: '#4a6325' }}>
                            {r}
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
                                {['User', 'Role', 'Status', 'Last Active', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                                        style={{ color: '#4a6325' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, i) => (
                                <tr key={u.id} className="hover:bg-[#fdf9f7] transition"
                                    style={{ borderTop: i === 0 ? 'none' : '1px solid #e8ede6' }}>
                                    <td className="px-5 py-4 min-w-[200px]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                                                style={{ background: '#0C2D1C' }}>{u.name[0]}</div>
                                            <div>
                                                <p className="font-semibold" style={{ color: '#243316' }}>{u.name}</p>
                                                <p className="text-xs" style={{ color: '#4a6325' }}>{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                                            style={ROLE_C[u.role] || { background: '#F4F7F2', color: '#4a6325' }}>{u.role}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => toggleStatus(u.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition hover:opacity-80 ${u.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                                                }`} title="Click to toggle status">
                                            {u.status}
                                        </button>
                                    </td>
                                    <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: '#4a6325' }}>{u.last}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openEdit(u)}
                                                className="p-2 rounded-lg transition hover:bg-[#fdf0e8]" style={{ color: '#E86D2C' }}
                                                title="Edit user"><Edit2 size={15} /></button>
                                            <button onClick={() => openDel(u)}
                                                className="p-2 rounded-lg transition hover:bg-red-50 text-red-400"
                                                title="Delete user"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={5} className="px-5 py-12 text-center text-sm" style={{ color: '#4a6325' }}>
                                    No users match your search.
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between text-xs"
                    style={{ borderTop: '1px solid #e8ede6', color: '#4a6325' }}>
                    <span>Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> users</span>
                </div>
            </div>

            {/* ── Add / Edit Modal ── */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}
                title={editUser ? 'Edit User' : 'Provision New User'}>
                <div className="flex flex-col gap-4">
                    <Field label="Full Name">
                        <input value={form.name} onChange={fc('name')} placeholder="e.g. Mrs. Ada Obi"
                            className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                    <Field label="Email Address">
                        <input value={form.email} onChange={fc('email')} type="email" placeholder="user@nsa.edu.ng"
                            className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="System Role">
                            <select value={form.role} onChange={fc('role')}
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                {['Admin', 'Teacher', 'Parent', 'Accountant'].map(r => <option key={r}>{r}</option>)}
                            </select>
                        </Field>
                        <Field label="Account Status">
                            <select value={form.status} onChange={fc('status')}
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                <option>Active</option><option>Inactive</option>
                            </select>
                        </Field>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setShowForm(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border transition hover:bg-[#F4F7F2]"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button onClick={handleSave}
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                            style={{ background: '#E86D2C' }}>
                            {editUser ? 'Save Changes' : 'Create User'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* ── Bulk Upload Modal ── */}
            <Modal isOpen={showBulk} onClose={() => !uploading && setShowBulk(false)} title="Bulk Registration" size="md">
                <form onSubmit={handleBulkUpload} className="flex flex-col gap-5">
                    <div className="bg-[#F4F7F2] rounded-2xl p-5" style={{ border: '1px dashed #E86D2C' }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#fdf0e8' }}>
                                <FileText size={20} color="#E86D2C" />
                            </div>
                            <p className="font-extrabold text-sm mb-1" style={{ color: '#243316' }}>Upload CSV File</p>
                            <p className="text-xs mb-4" style={{ color: '#4a6325' }}>Drag and drop your spreadsheet here or click to browse.</p>
                            <input type="file" accept=".csv" required className="text-xs w-full max-w-[220px]" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: '#fff', border: '1px solid #e8ede6' }}>
                        <span className="text-xs font-semibold" style={{ color: '#4a6325' }}>Need the exact format?</span>
                        <button type="button" onClick={downloadTemplate}
                            className="flex items-center gap-1.5 text-xs font-bold transition hover:opacity-80"
                            style={{ color: '#E86D2C' }}>
                            <Download size={13} /> Download Template
                        </button>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowBulk(false)} disabled={uploading}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border transition disabled:opacity-50"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button type="submit" disabled={uploading}
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                            style={{ background: '#E86D2C' }}>
                            {uploading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={15} />}
                            Process Upload
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Confirmation ── */}
            <Modal isOpen={showDel} onClose={() => setShowDel(false)} title="Confirm Deletion" size="sm">
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 text-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle />
                    </div>
                    <p className="text-sm mb-6" style={{ color: '#4a6325' }}>
                        Are you sure you want to delete <strong className="text-red-600">{delTarget?.name}</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setShowDel(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ color: '#243316', borderColor: '#e8ede6' }}>
                            Cancel
                        </button>
                        <button onClick={handleDelete}
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition">
                            Delete User
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
