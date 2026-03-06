import { useState, useEffect } from 'react'
import { Plus, Image as ImageIcon, Trash2, Edit2, CheckCircle, GripVertical, Save, BarChart2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../components/Modal'

const DEFAULT_SLIDES = [
    { id: 1, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', title: 'Welcome to NSA Blog', subtitle: 'Excellence in Early Education Insights' },
    { id: 2, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80', title: 'Creative Learning', subtitle: 'Inspiring young minds through art and play.' },
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

export default function AdminContent() {
    const [slides, setSlides] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ image: '', title: '', subtitle: '' })

    // Campus Gallery State
    const [gallery, setGallery] = useState([])
    const [showGalleryForm, setShowGalleryForm] = useState(false)
    const [galleryForm, setGalleryForm] = useState({ category: 'School Building', type: 'image', file: '' })

    // Homepage Stats State
    const [stats, setStats] = useState({ pupils: '500+', staff: '20+', years: '10+', levels: '3' })

    // Load from local storage
    useEffect(() => {
        try {
            const savedCarousel = localStorage.getItem('nsa_carousel')
            if (savedCarousel) setSlides(JSON.parse(savedCarousel))
            else {
                setSlides(DEFAULT_SLIDES)
                localStorage.setItem('nsa_carousel', JSON.stringify(DEFAULT_SLIDES))
            }

            const savedStats = localStorage.getItem('nsa_home_stats')
            if (savedStats) setStats(JSON.parse(savedStats))
            else localStorage.setItem('nsa_home_stats', JSON.stringify(stats))

            const savedGallery = localStorage.getItem('nsa_campus_gallery')
            if (savedGallery) setGallery(JSON.parse(savedGallery))
        } catch { }
    }, [])

    const saveSlides = (newSlides) => {
        setSlides(newSlides)
        localStorage.setItem('nsa_carousel', JSON.stringify(newSlides))
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this slide?")
        if (!confirmDelete) return
        const updated = slides.filter(s => s.id !== id)
        saveSlides(updated)
        toast.success('Slide removed successfully')
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (!form.image.trim() || !form.title.trim()) {
            toast.error('Image URL and Title are required')
            return
        }

        const newSlide = {
            id: Date.now(),
            image: form.image,
            title: form.title,
            subtitle: form.subtitle
        }

        saveSlides([...slides, newSlide])
        toast.success('New carousel slide added')
        setShowForm(false)
        setForm({ image: '', title: '', subtitle: '' })
    }

    const handleSaveStats = () => {
        localStorage.setItem('nsa_home_stats', JSON.stringify(stats))
        toast.success('Homepage statistics updated')
    }

    const saveGallery = (newGallery) => {
        setGallery(newGallery)
        localStorage.setItem('nsa_campus_gallery', JSON.stringify(newGallery))
    }

    const handleSaveGallery = (e) => {
        e.preventDefault()
        if (!galleryForm.file) return toast.error('Please upload a file')
        saveGallery([...gallery, { id: Date.now(), ...galleryForm }])
        setShowGalleryForm(false)
        setGalleryForm({ category: 'School Building', type: 'image', file: '' })
        toast.success('Media added to campus gallery')
    }

    return (
        <div className="font-sans">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>Content & Media</h1>
                    <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Manage graphics, carousels, and landing page elements</p>
                </div>
                <button onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl shadow-md transition hover:-translate-y-0.5"
                    style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                    <Plus size={16} strokeWidth={3} /> Add Slide
                </button>
            </div>

            {/* Carousel Manager Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8" style={{ border: '1px solid #e8ede6' }}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fdf0e8] text-[#E86D2C]">
                        <ImageIcon size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold" style={{ color: '#243316' }}>Blog Hero Carousel</h2>
                        <p className="text-xs" style={{ color: '#4a6325' }}>These images appear at the top of the public Blog page.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {slides.map((s, index) => (
                        <div key={s.id} className="rounded-2xl overflow-hidden border group" style={{ borderColor: '#e8ede6' }}>
                            <div className="h-40 relative bg-gray-100">
                                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                                    Slide {index + 1}
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(s.id)}
                                        className="w-8 h-8 rounded-lg bg-white text-red-500 flex items-center justify-center shadow hover:bg-red-50 transition">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <GripVertical size={14} className="text-gray-400 cursor-move" />
                                    <h3 className="font-bold text-sm truncate" style={{ color: '#243316' }} title={s.title}>{s.title}</h3>
                                </div>
                                <p className="text-xs truncate pl-6" style={{ color: '#4a6325' }} title={s.subtitle}>{s.subtitle || 'No subtitle'}</p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    <button onClick={() => setShowForm(true)}
                        className="rounded-2xl h-[230px] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-50 bg-[#F4F7F2]"
                        style={{ borderColor: '#e8ede6' }}>
                        <div className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: '#E86D2C', color: '#E86D2C' }}>
                            <Plus size={20} />
                        </div>
                        <span className="text-sm font-bold" style={{ color: '#4a6325' }}>Upload New Image</span>
                    </button>
                </div>
            </div>

            {/* Homepage Statistics Editor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8" style={{ border: '1px solid #e8ede6' }}>
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fdf0e8] text-[#E86D2C]">
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold" style={{ color: '#243316' }}>Homepage Statistics</h2>
                            <p className="text-xs" style={{ color: '#4a6325' }}>Update the four main capability metrics shown on the Home page.</p>
                        </div>
                    </div>
                    <button onClick={handleSaveStats}
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-bold shadow-md transition hover:-translate-y-0.5"
                        style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                        <Save size={16} /> Save Stats
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#F4F7F2] p-6 rounded-2xl border" style={{ borderColor: '#e8ede6' }}>
                    <Field label="Happy Pupils">
                        <input value={stats.pupils} onChange={e => setStats({ ...stats, pupils: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl font-bold border outline-none transition"
                            style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                    <Field label="Qualified Staff">
                        <input value={stats.staff} onChange={e => setStats({ ...stats, staff: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl font-bold border outline-none transition"
                            style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                    <Field label="Years of Excellence">
                        <input value={stats.years} onChange={e => setStats({ ...stats, years: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl font-bold border outline-none transition"
                            style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                    <Field label="Levels of Study">
                        <input value={stats.levels} onChange={e => setStats({ ...stats, levels: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl font-bold border outline-none transition"
                            style={inputStyle} onFocus={focus} onBlur={blur} />
                    </Field>
                </div>
            </div>

            {/* Campus Gallery Editor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8" style={{ border: '1px solid #e8ede6' }}>
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fdf0e8] text-[#E86D2C]">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold" style={{ color: '#243316' }}>Campus Gallery</h2>
                            <p className="text-xs" style={{ color: '#4a6325' }}>Upload photos and videos for the Explore page virtual tour.</p>
                        </div>
                    </div>
                    <button onClick={() => setShowGalleryForm(true)}
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-bold shadow-md transition hover:-translate-y-0.5"
                        style={{ background: '#E86D2C', boxShadow: '0 4px 14px rgba(232,109,44,0.35)' }}>
                        <Plus size={16} /> Add Media
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {gallery.map((g) => (
                        <div key={g.id} className="relative rounded-xl overflow-hidden group border h-28" style={{ borderColor: '#e8ede6' }}>
                            <div className="w-full h-full bg-black flex items-center justify-center">
                                {g.type === 'video' ? (
                                    <video src={g.file} className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <img src={g.file} alt={g.category} className="w-full h-full object-cover opacity-80" />
                                )}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-2 pt-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-[10px] font-bold truncate leading-tight">{g.category}</p>
                            </div>
                            <button onClick={() => {
                                if (window.confirm('Remove media?')) {
                                    saveGallery(gallery.filter(x => x.id !== g.id))
                                }
                            }} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 flex items-center justify-center shadow transition-all hover:bg-white">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    {gallery.length === 0 && (
                        <div className="col-span-full py-8 text-center text-sm" style={{ color: '#4a6325' }}>
                            No facility media uploaded yet.
                        </div>
                    )}
                </div>
            </div>

            {/* ── Add Slide Modal ── */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Carousel Slide" size="md">
                <form onSubmit={handleSave} className="flex flex-col gap-5">
                    <p className="text-sm" style={{ color: '#4a6325' }}>Add a high-quality image URL to feature on the Blog page.</p>

                    <Field label="Upload Image (.jpg, .png)">
                        <input type="file" accept="image/png, image/jpeg" required
                            onChange={e => {
                                const file = e.target.files[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onloadend = () => setForm({ ...form, image: reader.result })
                                    reader.readAsDataURL(file)
                                }
                            }}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#fdf0e8] file:text-[#E86D2C] hover:file:bg-[#fae2d1] transition outline-none" />
                    </Field>

                    <div className="grid grid-cols-1 gap-4">
                        <Field label="Headline Text">
                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. Welcome to NSA" required
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                        <Field label="Subtitle Text (Optional)">
                            <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })}
                                placeholder="e.g. Excellence in Education"
                                className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur} />
                        </Field>
                    </div>

                    {/* Preview box if image is loaded */}
                    {form.image && (
                        <div className="mt-2 h-32 rounded-xl border overflow-hidden relative" style={{ borderColor: '#e8ede6' }}>
                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
                                <p className="text-white font-bold text-sm leading-tight">{form.title || 'Headline Preview'}</p>
                                <p className="text-white/80 text-xs">{form.subtitle || 'Subtitle preview'}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-3">
                        <button type="button" onClick={() => setShowForm(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border transition hover:bg-[#F4F7F2]"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button type="submit"
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                            style={{ background: '#E86D2C' }}>
                            <CheckCircle size={16} /> Save Slide
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Add Gallery Modal ── */}
            <Modal isOpen={showGalleryForm} onClose={() => setShowGalleryForm(false)} title="Add Campus Media" size="md">
                <form onSubmit={handleSaveGallery} className="flex flex-col gap-5">
                    <Field label="Location / Category">
                        <select value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                            className={inputCls} style={inputStyle} onFocus={focus} onBlur={blur}>
                            {['School Building', 'The Library', 'Art Studio', 'Sports Ground', 'ICT Lab', 'Dining Hall', 'Music Room', 'Science Corner'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Upload Media (.jpg, .png, .mp4)">
                        <input type="file" accept="image/*,video/*" required
                            onChange={e => {
                                const file = e.target.files[0]
                                if (file) {
                                    const isVideo = file.type.startsWith('video/')
                                    const reader = new FileReader()
                                    reader.onloadend = () => setGalleryForm({ ...galleryForm, type: isVideo ? 'video' : 'image', file: reader.result })
                                    reader.readAsDataURL(file)
                                }
                            }}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#fdf0e8] file:text-[#E86D2C] hover:file:bg-[#fae2d1] transition outline-none" />
                    </Field>

                    {galleryForm.file && (
                        <div className="mt-2 h-40 rounded-xl border overflow-hidden relative bg-black" style={{ borderColor: '#e8ede6' }}>
                            {galleryForm.type === 'video' ? (
                                <video src={galleryForm.file} autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                            ) : (
                                <img src={galleryForm.file} alt="Preview" className="w-full h-full object-cover opacity-80" />
                            )}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <p className="text-white font-extrabold text-lg leading-tight">{galleryForm.category}</p>
                                <p className="text-white/80 text-xs mt-1 uppercase tracking-widest font-bold">{galleryForm.type}PREVIEW</p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-3">
                        <button type="button" onClick={() => setShowGalleryForm(false)}
                            className="flex-1 py-3 rounded-xl text-sm font-bold border transition hover:bg-[#F4F7F2]"
                            style={{ color: '#243316', borderColor: '#e8ede6' }}>Cancel</button>
                        <button type="submit"
                            className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                            style={{ background: '#E86D2C' }}>
                            <CheckCircle size={16} /> Upload Media
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
