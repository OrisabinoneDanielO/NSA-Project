import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, School, BookOpen, Palette, TreePine, Monitor, Utensils, Music, Atom, LayoutGrid } from 'lucide-react'
import Modal from '../../components/Modal'

const GALLERY = [
    { Icon: School, label: 'School Building', desc: 'Our modern, purpose-built campus', span: 'col-span-2 row-span-2', bg: '#0C2D1C' },
    { Icon: BookOpen, label: 'The Library', desc: 'A world of books for curious minds', bg: '#164a2e' },
    { Icon: Palette, label: 'Art Studio', desc: 'Where creativity comes alive', bg: '#243316' },
    { Icon: TreePine, label: 'Sports Ground', desc: 'Safe outdoor play every day', bg: '#164a2e' },
    { Icon: Monitor, label: 'ICT Lab', desc: 'Future-ready digital education', bg: '#0C2D1C' },
    { Icon: Utensils, label: 'Dining Hall', desc: 'Fresh, nutritious meals daily', bg: '#243316' },
    { Icon: Music, label: 'Music Room', desc: 'Rhythm, songs, and instruments', bg: '#0C2D1C' },
    { Icon: Atom, label: 'Science Corner', desc: 'Curiosity-driven exploration', bg: '#164a2e' },
]

export default function Explore() {
    const [stats, setStats] = useState({ pupils: '500+', staff: '20+', years: '10+', levels: '3' })
    const [galleryData, setGalleryData] = useState([])
    const [activeLocation, setActiveLocation] = useState(null)

    useEffect(() => {
        try {
            const savedStats = localStorage.getItem('nsa_home_stats')
            if (savedStats) setStats(JSON.parse(savedStats))

            const savedGallery = localStorage.getItem('nsa_campus_gallery')
            if (savedGallery) setGalleryData(JSON.parse(savedGallery))
        } catch { }
    }, [])

    const HIGHLIGHTS = [
        { value: stats.pupils, label: 'Happy Pupils', desc: 'Enrolled across all three levels' },
        { value: stats.levels, label: 'Education Levels', desc: 'Crèche, Nursery, and Primary' },
        { value: stats.staff, label: 'Qualified Staff', desc: 'Teachers and support professionals' },
        { value: '10+', label: 'Campus Facilities', desc: 'Purpose-built learning spaces' },
        { value: stats.years, label: 'Years of Excellence', desc: 'Trusted by hundreds of families' },
        { value: '100%', label: 'Monitored Campus', desc: 'CCTV and secured gate system' },
    ]

    return (
        <>
            {/* Header */}
            <div className="pt-20" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E86D2C' }}>Virtual Tour</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-5">Explore Our Academy</h1>
                    <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Step inside Nurtured Seeds Academy. Discover the learning spaces, facilities, and vibrant community that make NSA truly special.
                    </p>
                </div>
            </div>

            {/* Highlights bar */}
            <section className="py-14 px-6" style={{ background: '#E86D2C' }}>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {HIGHLIGHTS.map(({ value, label, desc }) => (
                        <div key={label} className="text-center">
                            <p className="text-3xl font-black text-white">{value}</p>
                            <p className="text-xs font-bold text-white/80 mt-1">{label}</p>
                            <p className="text-[10px] text-white/55 mt-0.5 leading-snug">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Campus Gallery</span>
                        <h2 className="text-4xl font-black mt-2" style={{ color: '#0C2D1C' }}>Take a Look Around</h2>
                        <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: '#4a6325' }}>
                            From state-of-the-art classrooms to vibrant outdoor play areas, our campus is designed to inspire learning at every turn.
                        </p>
                    </div>

                    {/* Icon mosaic */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] mb-8">
                        {GALLERY.map(({ Icon, label, desc, span, bg }) => {
                            const count = galleryData.filter(g => g.category === label).length;
                            return (
                                <button key={label} onClick={() => setActiveLocation(label)}
                                    className={`rounded-2xl flex flex-col items-center justify-center p-5 hover:-translate-y-1 hover:shadow-xl transition-all relative group outline-none cursor-pointer ${span || ''}`}
                                    style={{ background: bg, border: 'none' }}>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                                        style={{ background: 'rgba(255,255,255,0.12)' }}>
                                        <Icon size={22} color="rgba(255,255,255,0.8)" />
                                    </div>
                                    <p className="text-white font-extrabold text-sm text-center">{label}</p>
                                    <p className="text-white/50 text-xs mt-0.5 text-center px-2 leading-tight">{desc}</p>

                                    {count > 0 && (
                                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            {count} Media
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Schedule a Tour */}
            <section className="py-20 px-6" style={{ background: '#0C2D1C' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Want to See It in Person?</h2>
                    <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Schedule a personal tour and experience the NSA environment firsthand.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact"
                            className="px-8 py-4 font-bold rounded-xl text-sm text-white"
                            style={{ background: '#E86D2C', boxShadow: '0 8px 24px rgba(232,109,44,0.4)' }}>
                            Book a School Tour
                        </Link>
                        <Link to="/courses"
                            className="px-8 py-4 font-bold rounded-xl text-sm border inline-flex items-center gap-2"
                            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                            View Programmes <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Gallery Modal */}
            <Modal isOpen={!!activeLocation} onClose={() => setActiveLocation(null)} title={activeLocation} size="full">
                <div className="flex flex-col gap-4">
                    <p className="text-sm" style={{ color: '#4a6325' }}>Virtual tour media for {activeLocation}.</p>

                    {galleryData.filter(g => g.category === activeLocation).length === 0 ? (
                        <div className="bg-[#F4F7F2] rounded-2xl py-12 flex flex-col items-center justify-center border border-dashed text-center" style={{ borderColor: '#e8ede6' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: '#fdf0e8' }}>
                                <LayoutGrid size={20} color="#E86D2C" />
                            </div>
                            <p className="font-bold text-sm" style={{ color: '#243316' }}>No Media Available</p>
                            <p className="text-xs mt-1 max-w-xs" style={{ color: '#4a6325' }}>Check back later as our administrators are currently updating the gallery.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                            {galleryData.filter(g => g.category === activeLocation).map((g, idx) => (
                                <div key={g.id} className="rounded-2xl overflow-hidden bg-black aspect-video relative shadow-sm border" style={{ borderColor: '#e8ede6' }}>
                                    {g.type === 'video' ? (
                                        <video src={g.file} controls className="w-full h-full object-contain" />
                                    ) : (
                                        <img src={g.file} alt={`${g.category} ${idx}`} className="w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}
