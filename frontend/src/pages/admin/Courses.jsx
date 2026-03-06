import { useState } from 'react'
import { Plus, Edit2, Users, BookOpen, Layers, AlertTriangle, ArrowRightLeft, MoveUp, Baby, Palette, Library } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../components/Modal'

const SEED_CLASSES = [
    { id: 1, name: 'Crèche Butterflies', level: 'Crèche', teacher: 'Miss Ade Bello', arm: 'A', students: 14, subjects: ['Rhymes', 'Sensory'] },
    { id: 2, name: 'Nursery 1A', level: 'Nursery', teacher: 'Mr. Emeka Obi', arm: 'A', students: 18, subjects: ['Phonics', 'Numeracy'] },
    { id: 3, name: 'Nursery 2A', level: 'Nursery', teacher: 'Mrs. Fatima Bello', arm: 'A', students: 17, subjects: ['Phonics', 'Numeracy'] },
    { id: 4, name: 'Primary 1A', level: 'Primary', teacher: 'Mrs. Amaka Okafor', arm: 'A', students: 26, subjects: ['English', 'Math', 'Science'] },
    { id: 5, name: 'Primary 2A', level: 'Primary', teacher: 'Mr. Seun Adeyinka', arm: 'A', students: 25, subjects: ['English', 'Math', 'Science'] },
]

const TEACHERS = ['Miss Ade Bello', 'Mr. Emeka Obi', 'Mrs. Ngozi Adeyemi', 'Mrs. Fatima Bello', 'Mr. Chidi Nwosu', 'Mrs. Amaka Okafor', 'Mr. Seun Adeyinka']
const SUBJECTS = ['Rhymes', 'Sensory', 'Phonics', 'Numeracy', 'English', 'Math', 'Science', 'Social Studies', 'French']
const BLANK = { name: '', level: 'Nursery', arm: 'A', teacher: TEACHERS[0], subjects: [] }

const loadClasses = () => {
    try {
        const saved = localStorage.getItem('nsa_classes')
        if (saved) return JSON.parse(saved)
    } catch { }
    return SEED_CLASSES
}

const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition"
const inputStyle = { borderColor: '#e8ede6', color: '#243316' }
const focus = e => e.target.style.borderColor = '#E86D2C'
const blur = e => e.target.style.borderColor = '#e8ede6'

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>{label}</label>
        {children}
    </div>
)

const LEVEL_CONFIG = {
    Crèche: { icon: Baby, bg: '#E86D2C' },
    Nursery: { icon: Palette, bg: '#0C2D1C' },
    Primary: { icon: Library, bg: '#164a2e' },
}

export default function AdminCourses() {
    const [classes, setClasses] = useState(loadClasses())
    const [activeLevel, setActiveLevel] = useState('All')

    const saveClasses = (newClasses) => {
        setClasses(newClasses)
        localStorage.setItem('nsa_classes', JSON.stringify(newClasses))
    }

    const [showForm, setShowForm] = useState(false)
    const [showDel, setShowDel] = useState(false)
    const [showPromo, setShowPromo] = useState(false)

    const [editItem, setEditItem] = useState(null)
    const [delTarget, setDelTarget] = useState(null)
    const [form, setForm] = useState(BLANK)
    const [promoForm, setPromoForm] = useState({ from: SEED_CLASSES[3].id, to: SEED_CLASSES[4].id })

    const filtered = activeLevel === 'All' ? classes : classes.filter(c => c.level === activeLevel)
    const levelStats = (lvl) => ({
        count: classes.filter(c => c.level === lvl).length,
        students: classes.filter(c => c.level === lvl).reduce((a, c) => a + c.students, 0),
        teachers: [...new Set(classes.filter(c => c.level === lvl).map(c => c.teacher))].length,
    })

    const fc = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

    const toggleSubject = (sub) => setForm(p => ({
        ...p,
        subjects: p.subjects.includes(sub) ? p.subjects.filter(s => s !== sub) : [...p.subjects, sub]
    }))

    const openAdd = () => { setEditItem(null); setForm(BLANK); setShowForm(true) }
    const openEdit = c => { setEditItem(c); setForm({ name: c.name, level: c.level, arm: c.arm, teacher: c.teacher, subjects: c.subjects || [] }); setShowForm(true) }
    const openDel = c => { setDelTarget(c); setShowDel(true) }

    const handleSave = () => {
        if (!form.name.trim()) { toast.error('Class name is required'); return }
        if (editItem) {
            saveClasses(classes.map(c => c.id === editItem.id ? { ...c, ...form } : c))
            toast.success('Class updated successfully')
        } else {
            saveClasses([{ id: Date.now(), ...form, students: 0 }, ...classes])
            toast.success('Class created successfully')
        }
        setShowForm(false)
    }

    const handleDel = () => {
        saveClasses(classes.filter(c => c.id !== delTarget.id))
        toast.success(`${delTarget.name} deleted`)
        setShowDel(false)
    }

    const handlePromote = (e) => {
        e.preventDefault()
        if (promoForm.from === promoForm.to) return toast.error('Source and Destination must be different classes')

        saveClasses(classes.map(c => {
            const fromCount = classes.find(x => x.id == promoForm.from)?.students || 0
            if (c.id == promoForm.from) return { ...c, students: 0 }
            if (c.id == promoForm.to) return { ...c, students: c.students + fromCount }
            return c
        }))
        toast.success('Students promoted to the next grade successfully')
        setShowPromo(false)
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Academic Infrastructure</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Manage classes, subject mapping, form teachers, and bulk promotions</p>
                </div>
                <div className="flex gap-2 text-sm font-bold">
                    <button onClick={() => setShowPromo(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border transition hover:bg-[#F4F7F2]"
                        style={{ color: '#243316', borderColor: '#e8ede6' }}>
                        <MoveUp size={15} /> Promote / Transfer
                    </button>
                    <button onClick={openAdd}
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl shadow-md transition hover:-translate-y-0.5"
                        style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                        <Plus size={16} strokeWidth={3} /> Add Class
                    </button>
                </div>
            </div>

            {/* Level cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {['Crèche', 'Nursery', 'Primary'].map(lvl => {
                    const { icon: LevelIcon, bg } = LEVEL_CONFIG[lvl]
                    const { count, students, teachers } = levelStats(lvl)
                    return (
                        <div key={lvl} className="rounded-2xl p-6 text-white cursor-pointer hover:-translate-y-0.5 hover:shadow-xl transition-all"
                            style={{ background: bg }}
                            onClick={() => setActiveLevel(l => l === lvl ? 'All' : lvl)}>
                            <div className="flex items-start justify-between mb-4">
                                <LevelIcon size={28} />
                                {activeLevel === lvl && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 uppercase tracking-widest">Filtered</span>}
                            </div>
                            <h3 className="text-lg font-extrabold mb-3">{lvl}</h3>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                {[['Classes', <Layers size={13} />, count], ['Pupils', <Users size={13} />, students], ['Teachers', <BookOpen size={13} />, teachers]]
                                    .map(([l, ic, v]) => (
                                        <div key={l} className="bg-white/15 rounded-xl py-2">
                                            <p className="text-lg font-black">{v}</p>
                                            <p className="text-[10px] uppercase tracking-wide opacity-80 flex items-center justify-center gap-1 mt-0.5">{ic}{l}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Classes table */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #e8ede6' }}>
                    <h2 className="font-bold text-sm" style={{ color: '#243316' }}>
                        {activeLevel === 'All' ? 'All Classes' : `${activeLevel} Classes`}
                        <span className="ml-2 px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-full font-bold"
                            style={{ background: '#fdf0e8', color: '#E86D2C' }}>{filtered.length} Groups</span>
                    </h2>
                    {activeLevel !== 'All' && (
                        <button onClick={() => setActiveLevel('All')} className="text-xs font-bold transition hover:opacity-70" style={{ color: '#E86D2C' }}>
                            Clear Filter ×
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: '#F4F7F2' }}>
                                {['Class / Group', 'Level', 'Form Teacher', 'Subjects', 'Pupils', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                                        style={{ color: '#4a6325' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c, i) => (
                                <tr key={c.id} className="hover:bg-[#fdf9f7] transition" style={{ borderTop: i === 0 ? 'none' : '1px solid #e8ede6' }}>
                                    <td className="px-5 py-4">
                                        <p className="font-extrabold" style={{ color: '#243316' }}>{c.name}</p>
                                        <p className="text-[10px] tracking-wide font-bold uppercase mt-0.5" style={{ color: '#4a6325' }}>Arm {c.arm}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#fdf0e8', color: '#E86D2C' }}>{c.level}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="font-semibold text-xs" style={{ color: '#243316' }}>{c.teacher}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {c.subjects?.slice(0, 2).map(s => (
                                                <span key={s} className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-gray-100 text-gray-600">{s}</span>
                                            ))}
                                            {c.subjects?.length > 2 && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-gray-50 text-gray-500">+{c.subjects.length - 2}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5 font-bold" style={{ color: '#243316' }}>
                                            <Users size={14} style={{ color: '#E86D2C' }} /> {c.students}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openEdit(c)}
                                                className="p-2 rounded-lg transition hover:bg-[#fdf0e8]" style={{ color: '#E86D2C' }} title="Edit Class">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => openDel(c)}
                                                className="p-2 rounded-lg transition hover:bg-red-50 text-red-400" title="Delete Class">
                                                <AlertTriangle size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Promote / Transfer Modal ── */}
            <Modal isOpen={showPromo} onClose={() => setShowPromo(false)} title="Bulk Student Transfer" size="md">
                <form onSubmit={handlePromote} className="flex flex-col gap-6">
                    <p className="text-sm" style={{ color: '#4a6325' }}>Move all students from one class to another at the end of an academic session.</p>

                    <div className="bg-[#F4F7F2] p-5 rounded-2xl border flex flex-col gap-4" style={{ borderColor: '#e8ede6' }}>
                        <Field label="Migrate Students From">
                            <select value={promoForm.from} onChange={e => setPromoForm(p => ({ ...p, from: e.target.value }))}
                                className={inputCls} style={inputStyle}>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name} ({c.students} active pupils)</option>)}
                            </select>
                        </Field>

                        <div className="flex justify-center -my-3 relative z-10">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-200">
                                <ArrowRightLeft size={14} className="rotate-90 text-[#E86D2C]" />
                            </div>
                        </div>

                        <Field label="Promote To">
                            <select value={promoForm.to} onChange={e => setPromoForm(p => ({ ...p, to: e.target.value }))}
                                className={inputCls} style={inputStyle}>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </Field>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowPromo(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button type="submit"
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                            style={{ background: '#E86D2C' }}><MoveUp size={15} /> Execute Promotion</button>
                    </div>
                </form>
            </Modal>

            {/* ── Add/Edit Modal (With Subject Mapping) ── */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editItem ? 'Edit Class Structure' : 'Create New Class'} size="lg">
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Class Name">
                            <input value={form.name} onChange={fc('name')} placeholder="e.g. Nursery 2A"
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                        <Field label="Form Teacher">
                            <select value={form.teacher} onChange={fc('teacher')} className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                {TEACHERS.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Academic Level">
                            <select value={form.level} onChange={fc('level')} className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                {['Crèche', 'Nursery', 'Primary'].map(l => <option key={l}>{l}</option>)}
                            </select>
                        </Field>
                        <Field label="Arm (Optional)">
                            <select value={form.arm} onChange={fc('arm')} className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                {['A', 'B', 'C', 'D', 'None'].map(a => <option key={a}>{a}</option>)}
                            </select>
                        </Field>
                    </div>

                    <div className="pt-2">
                        <Field label="Subject Mapping (Assigned Curriculum)">
                            <div className="flex flex-wrap gap-2 mt-2">
                                {SUBJECTS.map(s => {
                                    const active = form.subjects?.includes(s);
                                    return (
                                        <button key={s} onClick={() => toggleSubject(s)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
                                            style={active ? { background: '#fdf0e8', color: '#E86D2C', borderColor: '#E86D2C' } : { background: '#F4F7F2', color: '#4a6325', borderColor: '#e8ede6' }}>
                                            {s}
                                        </button>
                                    )
                                })}
                            </div>
                        </Field>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button onClick={() => setShowForm(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-[#F4F7F2]"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button onClick={handleSave}
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                            style={{ background: '#E86D2C' }}>
                            {editItem ? 'Update Configuration' : 'Deploy Class Structure'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* ── Delete Confirm ── */}
            <Modal isOpen={showDel} onClose={() => setShowDel(false)} title="Destroy Class" size="sm">
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 text-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle />
                    </div>
                    <p className="text-sm mb-6" style={{ color: '#4a6325' }}>
                        Completely remove <strong className="text-red-600 font-extrabold">{delTarget?.name}</strong>?
                        Its pupils will need to be re-assigned. This cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setShowDel(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button onClick={handleDel}
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition tracking-wide">CONFIRM DELETE</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
