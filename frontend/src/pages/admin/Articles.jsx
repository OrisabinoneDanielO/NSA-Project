import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, CheckCircle, Search, FileText, Calendar, Clock, Image as ImageIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../components/Modal'

const CATS = ['School News', 'Nursery Tips', 'Child Development', 'Academic Support', 'Crèche Insights']

const SEED_POSTS = [
    {
        id: Date.now().toString(), slug: 'preparing-child-for-nursery', featured: true,
        category: 'Nursery Tips', date: '3 Mar 2026', author: 'Admin', readTime: '4 min',
        title: 'How to Prepare Your Child for Their First Day at Nursery',
        excerpt: 'Starting nursery is a huge milestone. Here are practical steps to help your child feel confident.',
        image: '',
        content: [
            { id: '1', type: 'p', text: 'Starting nursery is one of the most significant transitions in a young child\'s life. Here are a number of evidence-based strategies that can make this transition smoother.' },
            { id: '2', type: 'h2', text: '1. Visit the School Together' },
            { id: '3', type: 'p', text: 'Before the first day, arrange a visit to the nursery so your child can explore the environment.' },
        ],
    }
]

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

export default function AdminArticles() {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)

    const blankForm = {
        title: '', category: 'School News', author: 'Admin', readTime: '3 min', excerpt: '', image: '',
        content: [{ id: Date.now().toString(), type: 'p', text: '' }], featured: false
    }
    const [form, setForm] = useState(blankForm)

    useEffect(() => {
        try {
            const saved = localStorage.getItem('nsa_blog_posts')
            if (saved) {
                setPosts(JSON.parse(saved))
            } else {
                setPosts(SEED_POSTS)
                localStorage.setItem('nsa_blog_posts', JSON.stringify(SEED_POSTS))
            }
        } catch { }
    }, [])

    const savePosts = (newPosts) => {
        setPosts(newPosts)
        localStorage.setItem('nsa_blog_posts', JSON.stringify(newPosts))
    }

    const handleDelete = (id) => {
        if (!window.confirm("Delete this article?")) return
        savePosts(posts.filter(p => p.id !== id))
        toast.success('Article deleted')
    }

    const handleEdit = (post) => {
        setForm({ ...post })
        setEditId(post.id)
        setShowForm(true)
    }

    const handleAddBlock = (type) => {
        setForm(prev => ({
            ...prev,
            content: [...prev.content, { id: Date.now().toString(), type, text: '' }]
        }))
    }

    const handleUpdateBlock = (id, text) => {
        setForm(prev => ({
            ...prev,
            content: prev.content.map(b => b.id === id ? { ...b, text } : b)
        }))
    }

    const handleRemoveBlock = (id) => {
        setForm(prev => ({
            ...prev, content: prev.content.filter(b => b.id !== id)
        }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (!form.title.trim()) return toast.error('Title is required')

        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        const newPost = {
            ...form,
            slug,
            date: form.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        }

        if (editId) {
            savePosts(posts.map(p => p.id === editId ? newPost : p))
            toast.success('Article updated')
        } else {
            newPost.id = Date.now().toString()
            savePosts([newPost, ...posts])
            toast.success('Article published')
        }

        setShowForm(false)
        setForm(blankForm)
        setEditId(null)
    }

    const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="font-sans">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Articles & Blog</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Manage public news, insights, and educational posts.</p>
                </div>
                <button onClick={() => { setForm(blankForm); setEditId(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl shadow-md transition hover:-translate-y-0.5 font-bold"
                    style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                    <Plus size={16} strokeWidth={3} /> Write Article
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#e8ede6' }}>
                <div className="flex bg-[#F4F7F2] rounded-xl px-4 py-3 items-center gap-3 mb-6" style={{ border: '1px solid #e8ede6' }}>
                    <Search size={18} style={{ color: '#4a6325' }} />
                    <input type="text" placeholder="Search articles by title..." className="bg-transparent border-none outline-none text-sm w-full"
                        style={{ color: '#243316' }} value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map(post => (
                        <div key={post.id} className="flex flex-col md:flex-row gap-4 p-5 rounded-xl border hover:shadow-md transition bg-white"
                            style={{ borderColor: '#e8ede6' }}>
                            <div className="w-full md:w-32 h-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                                {post.image ? (
                                    <img src={post.image} className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon size={24} className="text-gray-300" />
                                )}
                                {post.featured && (
                                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#E86D2C] text-white">Featured</div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex gap-2 mb-1">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fdf0e8', color: '#E86D2C' }}>{post.category}</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{post.date}</span>
                                </div>
                                <h3 className="font-extrabold text-base mb-1" style={{ color: '#243316' }}>{post.title}</h3>
                                <p className="text-xs line-clamp-2" style={{ color: '#4a6325' }}>{post.excerpt}</p>
                            </div>
                            <div className="flex items-center gap-2 md:pl-4">
                                <button onClick={() => handleEdit(post)} className="w-9 h-9 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition border" style={{ borderColor: '#e8ede6' }}>
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(post.id)} className="w-9 h-9 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition border" style={{ borderColor: '#e8ede6' }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-10" style={{ color: '#4a6325' }}>No articles found.</div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editId ? "Edit Article" : "Write Article"} size="lg">
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Article Title">
                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                        <Field label="Category">
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Author Name">
                            <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                        <Field label="Est. Read Time">
                            <input value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} placeholder="e.g. 5 min" required
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                    </div>

                    <Field label="Short Excerpt">
                        <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} required
                            className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>

                    <div className="grid md:grid-cols-2 gap-4 items-center">
                        <Field label="Featured Post">
                            <label className="flex items-center gap-2 text-sm cursor-pointer mt-2" style={{ color: '#243316' }}>
                                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })}
                                    className="w-4 h-4 accent-[#E86D2C]" />
                                Pin to top of Blog
                            </label>
                        </Field>
                        <Field label="Header Image (.jpg, .png)">
                            <input type="file" accept="image/*"
                                onChange={e => {
                                    const file = e.target.files[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => setForm({ ...form, image: reader.result })
                                        reader.readAsDataURL(file)
                                    }
                                }}
                                className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-semibold file:bg-[#fdf0e8] file:text-[#E86D2C] outline-none" />
                        </Field>
                    </div>
                    {form.image && (
                        <div className="h-24 w-40 rounded-lg overflow-hidden border" style={{ borderColor: '#e8ede6' }}>
                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Content Blocks */}
                    <div className="border-t pt-5" style={{ borderColor: '#e8ede6' }}>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: '#243316' }}>Article Content</label>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => handleAddBlock('h2')} className="text-xs font-bold px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition">Add Heading</button>
                                <button type="button" onClick={() => handleAddBlock('p')} className="text-xs font-bold px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition">Add Paragraph</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scroll">
                            {form.content.map((block, idx) => (
                                <div key={block.id} className="flex gap-3 items-start group">
                                    <div className="flex-1">
                                        {block.type === 'h2' ? (
                                            <input value={block.text} onChange={e => handleUpdateBlock(block.id, e.target.value)}
                                                placeholder="Section Heading" required
                                                className="w-full px-4 py-2 text-sm font-bold border-b outline-none bg-transparent"
                                                style={{ borderBottomColor: '#E86D2C', color: '#0C2D1C' }} />
                                        ) : (
                                            <textarea value={block.text} onChange={e => handleUpdateBlock(block.id, e.target.value)}
                                                placeholder="Paragraph text..." required rows={3}
                                                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                                                style={inputStyle} onFocus={focus} onBlur={blur} />
                                        )}
                                    </div>
                                    <button type="button" onClick={() => handleRemoveBlock(block.id)}
                                        className="mt-2 w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {form.content.length === 0 && (
                                <p className="text-xs text-center py-4 italic text-gray-500">No content added yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#e8ede6' }}>
                        <button type="button" onClick={() => setShowForm(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border transition hover:bg-[#F4F7F2]"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button type="submit"
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                            style={{ background: '#E86D2C' }}>
                            <CheckCircle size={16} /> {editId ? 'Save Changes' : 'Publish Article'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
