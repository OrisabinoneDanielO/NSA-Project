import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, User, Clock, Megaphone, Palette, Brain, BookOpen, Baby, ChevronRight, ChevronLeft } from 'lucide-react'

const DEFAULT_SLIDES = [
    { id: 1, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', title: 'Welcome to NSA Blog', subtitle: 'Excellence in Early Education Insights' },
    { id: 2, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80', title: 'Creative Learning', subtitle: 'Inspiring young minds through art and play.' },
]

const CAT_ICON = {
    'School News': <Megaphone size={20} />,
    'Nursery Tips': <Palette size={20} />,
    'Child Development': <Brain size={20} />,
    'Academic Support': <BookOpen size={20} />,
    'Crèche Insights': <Baby size={20} />,
}

// Removed static POSTS

const CATS = ['All', 'School News', 'Nursery Tips', 'Child Development', 'Academic Support', 'Crèche Insights']

const ACCENT = {
    'School News': '#E86D2C', 'Nursery Tips': '#1a6b3a',
    'Child Development': '#4338ca', 'Academic Support': '#0C2D1C', 'Crèche Insights': '#E86D2C',
}

export default function Blog() {
    const [cat, setCat] = useState('All')
    const [posts, setPosts] = useState([])

    // Carousel State
    const [slides, setSlides] = useState(DEFAULT_SLIDES)
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        try {
            const savedCarousel = localStorage.getItem('nsa_carousel')
            if (savedCarousel) {
                const parsed = JSON.parse(savedCarousel)
                if (parsed.length > 0) setSlides(parsed)
            }

            const savedPosts = localStorage.getItem('nsa_blog_posts')
            if (savedPosts) {
                setPosts(JSON.parse(savedPosts))
            }
        } catch { } // fallback to DEFAULT_SLIDES
    }, [])

    useEffect(() => {
        if (slides.length <= 1) return
        const timer = setInterval(() => {
            setCurrentSlide(s => (s + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide(s => (s + 1) % slides.length)
    const prevSlide = () => setCurrentSlide(s => (s - 1 + slides.length) % slides.length)

    const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat)
    const featured = filtered.find(p => p.featured) || filtered[0]
    const grid = filtered.filter(p => p.id !== featured?.id)

    return (
        <>
            {/* Hero Carousel */}
            <div className="relative pt-20 h-[500px] sm:h-[600px] overflow-hidden bg-[#0C2D1C]">
                {slides.map((s, i) => (
                    <div key={s.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2D1C] via-[#0C2D1C]/60 to-transparent opacity-90" />
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-6 w-full">
                                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E86D2C' }}>Insights & Updates</p>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-5 drop-shadow-lg leading-tight max-w-2xl">{s.title}</h1>
                                <p className="text-lg md:text-xl max-w-xl leading-relaxed text-white/80 drop-shadow">{s.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Controls */}
                {slides.length > 1 && (
                    <>
                        <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
                            <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2">
                            <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {slides.map((s, i) => (
                                <button key={s.id} onClick={() => setCurrentSlide(i)}
                                    className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-[#E86D2C]' : 'w-2 bg-white/50 hover:bg-white'}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <section className="py-20 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto">

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {CATS.map(c => (
                            <button key={c} onClick={() => setCat(c)}
                                className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                style={cat === c
                                    ? { background: '#E86D2C', color: '#fff', boxShadow: '0 4px 14px rgba(232,109,44,0.3)' }
                                    : { background: '#fff', color: '#4a6325', border: '1px solid #e8ede6' }}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    {featured && (
                        <div className="rounded-2xl overflow-hidden mb-8 grid md:grid-cols-[1fr_280px]"
                            style={{ border: '1px solid #e8ede6', background: '#fff' }}>
                            <div className="p-8 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    {cat === 'All' && (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                                            style={{ background: '#E86D2C' }}>Featured</span>
                                    )}
                                    <span className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ background: '#fdf0e8', color: '#E86D2C' }}>{featured.category}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-snug" style={{ color: '#243316' }}>
                                    {featured.title}
                                </h2>
                                <p className="text-sm leading-relaxed mb-6" style={{ color: '#4a6325' }}>{featured.excerpt}</p>
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs" style={{ color: '#4a6325' }}>
                                    <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} />{featured.author}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime} read</span>
                                </div>
                                <Link to={`/blog/${featured.slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl text-sm self-start transition hover:opacity-90"
                                    style={{ background: '#E86D2C' }}>
                                    Read Article <ArrowRight size={14} />
                                </Link>
                            </div>

                            {/* Category visual panel */}
                            <div className="hidden md:flex flex-col items-center justify-center gap-4 p-8"
                                style={{ background: '#0C2D1C' }}>
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                                    style={{ background: 'rgba(232,109,44,0.2)' }}>
                                    <span style={{ color: '#E86D2C' }}>{CAT_ICON[featured.category]}</span>
                                </div>
                                <p className="text-white font-bold text-sm text-center">{featured.category}</p>
                                <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>{featured.readTime} read</p>
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    {grid.length > 0 && (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {grid.map(p => {
                                const accent = ACCENT[p.category] || '#E86D2C'
                                return (
                                    <div key={p.id}
                                        className="bg-white rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all"
                                        style={{ border: '1px solid #e8ede6' }}>
                                        {/* Top colour stripe with icon */}
                                        <div className="h-28 flex items-center justify-center"
                                            style={{ background: accent === '#E86D2C' ? 'linear-gradient(135deg,#0C2D1C,#164a2e)' : `linear-gradient(135deg,${accent},${accent}cc)` }}>
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15">
                                                <span className="text-white">{CAT_ICON[p.category]}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                                                    style={{ background: '#fdf0e8', color: '#E86D2C' }}>{p.category}</span>
                                                <span className="text-[11px] flex items-center gap-1" style={{ color: '#4a6325' }}>
                                                    <Clock size={10} />{p.readTime}
                                                </span>
                                            </div>
                                            <h3 className="font-extrabold text-sm leading-snug mb-2 flex-1" style={{ color: '#243316' }}>
                                                {p.title}
                                            </h3>
                                            <p className="text-xs leading-relaxed mb-4" style={{ color: '#4a6325' }}>
                                                {p.excerpt.substring(0, 110)}…
                                            </p>
                                            <div className="flex items-center justify-between pt-3 text-xs"
                                                style={{ borderTop: '1px solid #e8ede6' }}>
                                                <span style={{ color: '#4a6325' }}>{p.date} · {p.author.split(' ')[0]}</span>
                                                <Link to={`/blog/${p.slug}`}
                                                    className="font-bold flex items-center gap-1 transition hover:gap-2"
                                                    style={{ color: '#E86D2C' }}>
                                                    Read <ArrowRight size={11} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {filtered.length === 0 && (
                        <div className="text-center py-16" style={{ color: '#4a6325' }}>
                            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
                            <p className="font-semibold">No articles in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
