import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Users, Award, Star, BookOpen,
    Library, TreePine, Utensils, Palette, Monitor, Stethoscope,
    CheckCircle, ArrowRight, MapPin, Phone,
    Baby, Brush, GraduationCap,
    Trophy, ShieldCheck, BarChart3, MessageCircle
} from 'lucide-react'

const STATS = [
    { value: '500+', label: 'Happy Pupils', Icon: Users },
    { value: '20+', label: 'Qualified Staff', Icon: Award },
    { value: '10+', label: 'Years of Excellence', Icon: Trophy },
    { value: '3', label: 'Levels of Study', Icon: BookOpen },
]

const LEVELS = [
    {
        Icon: Baby, tag: 'Ages 0 – 2', title: 'Crèche',
        img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Expert infant care in a warm, nurturing environment. Daily health tracking, feeding schedules, and real-time parent reports keep you fully informed.',
        points: ['Qualified nursery nurses', 'Real-time parent notifications', 'Safe & hygienic facilities'],
    },
    {
        Icon: Brush, tag: 'Ages 2 – 5', title: 'Nursery',
        img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Milestone-based learning through play. Our programmes focus on language, motor skills, and socialisation to give every child the best start.',
        points: ['Developmental milestone tracking', 'Activity-based assessment', 'Small class sizes'],
    },
    {
        Icon: GraduationCap, tag: 'Ages 5 – 11', title: 'Primary',
        img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'A structured academic curriculum built on core subjects, regular assessments, and character development to prepare pupils for secondary school.',
        points: ['Full academic curriculum', 'Automated term report cards', 'Extracurricular activities'],
    },
]

const FACILITIES = [
    { Icon: Library, title: 'World-Class Library', desc: 'Extensive collection of age-appropriate books and digital learning resources.' },
    { Icon: TreePine, title: 'Safe Play Area', desc: 'Modern outdoor play equipment in a fully fenced, supervised environment.' },
    { Icon: Utensils, title: 'Nutritious Meals', desc: 'Balanced mid-day meals prepared fresh daily by trained catering staff.' },
    { Icon: Palette, title: 'Art & Craft Studio', desc: 'Creative space to develop fine motor skills and artistic expression.' },
    { Icon: Monitor, title: 'ICT Lab', desc: 'Age-appropriate computer education for Primary pupils.' },
    { Icon: Stethoscope, title: 'Medical Sick Bay', desc: 'On-site nurse and first-aid facilities for pupil health and safety.' },
]

const WHY = [
    { Icon: Trophy, title: 'Award-Winning Teachers', desc: 'Relevant qualifications and continuous professional development.' },
    { Icon: ShieldCheck, title: 'Safe & Secure Campus', desc: 'CCTV, secure gates, and strict visitor policy keep every child safe.' },
    { Icon: BarChart3, title: 'Digital Progress Reports', desc: 'Parents access child\'s performance through our online portal.' },
    { Icon: MessageCircle, title: 'Parent Collaboration', desc: 'Direct messaging portal and regular parent-teacher meetings.' },
]

const Home = () => {
    const [stats, setStats] = useState({ pupils: '500+', staff: '20+', years: '10+', levels: '3' })

    useEffect(() => {
        try {
            const saved = localStorage.getItem('nsa_home_stats')
            if (saved) setStats(JSON.parse(saved))
        } catch { }
    }, [])

    const DISPLAY_STATS = [
        { value: stats.pupils, label: 'Happy Pupils', Icon: Users },
        { value: stats.staff, label: 'Qualified Staff', Icon: Award },
        { value: stats.years, label: 'Years of Excellence', Icon: Trophy },
        { value: stats.levels, label: 'Levels of Study', Icon: BookOpen },
    ]

    return (
        <>
            {/* ─── HERO ── */}
            <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0C2D1C' }}>
                <div className="absolute inset-0">
                    <img src="/images/hero.png" alt="Nurtured Seeds Academy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(12,45,28,0.94) 0%, rgba(12,45,28,0.72) 60%, rgba(12,45,28,0.3) 100%)' }} />
                </div>
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 border-[60px]"
                    style={{ borderColor: '#E86D2C' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 border"
                        style={{ background: 'rgba(232,109,44,0.15)', color: '#E86D2C', borderColor: 'rgba(232,109,44,0.3)' }}>
                        <Star size={12} /> Enrolment Open — 2025/2026 Academic Session
                    </div>

                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6">
                            Nurtured<br />Seeds<br /><span style={{ color: '#E86D2C' }}>Academy</span>
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
                            From Crèche to Primary — a safe, loving, and academically excellent environment where every child is empowered to grow, discover, and thrive.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl text-sm transition hover:-translate-y-1"
                                style={{ background: '#E86D2C', boxShadow: '0 8px 24px rgba(232,109,44,0.5)' }}>
                                Contact Admissions <ArrowRight size={14} />
                            </Link>
                            <Link to="/about"
                                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl text-sm border transition hover:bg-white/10"
                                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                                Learn More <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {DISPLAY_STATS.map(({ value, label, Icon }) => (
                            <div key={label} className="rounded-2xl px-5 py-5 flex items-center gap-4"
                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(232,109,44,0.2)' }}>
                                    <Icon size={20} color="#E86D2C" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-white">{value}</p>
                                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── LEVELS ── */}
            <section className="py-24 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Our Programmes</span>
                        <h2 className="text-4xl font-black mt-2 mb-4" style={{ color: '#0C2D1C' }}>Education at Every Stage</h2>
                        <p className="text-base max-w-xl mx-auto" style={{ color: '#4a6325' }}>
                            Tailored learning programmes from infancy through primary school, designed to meet the developmental needs of every age group.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {LEVELS.map(({ Icon, tag, title, desc, points, img }) => (
                            <div key={title}
                                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                                style={{ background: '#fff', border: '1px solid #e8ede6' }}>
                                <div className="h-48 overflow-hidden relative">
                                    <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2D1C] to-transparent opacity-90" />
                                    <div className="absolute inset-0 p-6 flex items-end">
                                        <div className="flex flex-col">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-white/20 backdrop-blur-sm shadow-md">
                                                <Icon size={22} color="#fff" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase rounded-full px-2.5 py-1 w-max"
                                                style={{ background: '#E86D2C', color: '#fff' }}>{tag}</span>
                                            <h3 className="text-2xl font-extrabold text-white mt-2">{title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#4a6325' }}>{desc}</p>
                                    <ul className="flex flex-col gap-2 mb-6">
                                        {points.map(pt => (
                                            <li key={pt} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#243316' }}>
                                                <CheckCircle size={14} color="#E86D2C" style={{ flexShrink: 0 }} /> {pt}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#E86D2C' }}>
                                        Learn more <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE NSA ── */}
            <section className="py-24 px-6 overflow-hidden" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 min-h-[380px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0" style={{ maxWidth: 500 }}>
                        <img src="/images/teaching.png" alt="Teacher with students" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Why Choose Us</span>
                        <h2 className="text-4xl font-black text-white mt-2 mb-6">A School Built<br />for Your Child</h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            At Nurtured Seeds Academy, we combine caring teachers, a safe environment, and a rich curriculum to give every pupil the foundation they deserve.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {WHY.map(({ Icon, title, desc }) => (
                                <div key={title} className="rounded-2xl p-4"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                                        style={{ background: 'rgba(232,109,44,0.2)' }}>
                                        <Icon size={18} color="#E86D2C" />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/about"
                            className="inline-flex items-center gap-2 px-6 py-3.5 font-bold rounded-xl text-sm"
                            style={{ background: '#E86D2C', color: '#fff', boxShadow: '0 6px 20px rgba(232,109,44,0.4)' }}>
                            About Our School <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── FACILITIES ── */}
            <section className="py-24 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Campus Life</span>
                        <h2 className="text-4xl font-black mt-2 mb-3" style={{ color: '#0C2D1C' }}>World-Class Facilities</h2>
                        <p className="text-base max-w-xl mx-auto" style={{ color: '#4a6325' }}>
                            Modern infrastructure designed to make learning enjoyable, safe, and stimulating.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FACILITIES.map(({ Icon, title, desc, img }) => (
                            <div key={title}
                                className="rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                                style={{ background: '#fff', border: '1px solid #e8ede6' }}>
                                {img ? (
                                    <div className="h-44 overflow-hidden">
                                        <img src={img} alt={title} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="h-44 flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #0C2D1C 0%, #164a2e 100%)' }}>
                                        <Icon size={48} color="rgba(255,255,255,0.25)" />
                                    </div>
                                )}
                                <div className="p-5">
                                    <div className="flex items-center gap-2.5 mb-1.5">
                                        <Icon size={16} color="#E86D2C" />
                                        <h4 className="font-bold text-sm" style={{ color: '#243316' }}>{title}</h4>
                                    </div>
                                    <p className="text-xs leading-relaxed" style={{ color: '#4a6325' }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ── */}
            <section className="py-24 px-6" style={{ background: '#fff' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Testimonials</span>
                        <h2 className="text-4xl font-black mt-2" style={{ color: '#0C2D1C' }}>What Parents Say</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: 'Mrs. Adaeze O.', role: 'Parent — Crèche', rating: 5, text: 'I was nervous about leaving my 10-month-old, but NSA staff treated her like family. The daily updates put my mind completely at rest.' },
                            { name: 'Mr. Tunde B.', role: 'Parent — Primary 4', rating: 5, text: "My son's grades and confidence have improved remarkably since joining NSA. The teachers are truly dedicated professionals." },
                            { name: 'Mrs. Ngozi C.', role: 'Parent — Nursery 2', rating: 4, text: 'Fantastic school. The milestone reports tell me exactly how my daughter is developing socially and academically. Highly recommended.' },
                            { name: 'Mr. Emeka S.', role: 'Parent — Primary 1', rating: 5, text: 'From enrolment to daily communication, NSA is extremely professional. The parent portal makes everything transparent.' },
                        ].map(({ name, role, rating, text }) => (
                            <div key={name}
                                className="rounded-2xl p-7 flex gap-4 hover:shadow-md transition-all"
                                style={{ background: '#F4F7F2', border: '1px solid #e8ede6' }}>
                                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-black text-white text-base"
                                    style={{ background: '#0C2D1C' }}>
                                    {name[0]}
                                </div>
                                <div>
                                    <div className="flex gap-0.5 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={14} fill={i < rating ? '#E86D2C' : 'none'} color={i < rating ? '#E86D2C' : '#d4dcd0'} />
                                        ))}
                                    </div>
                                    <p className="text-sm leading-relaxed mb-3 italic" style={{ color: '#4a6325' }}>"{text}"</p>
                                    <p className="font-bold text-sm" style={{ color: '#243316' }}>{name}</p>
                                    <p className="text-xs" style={{ color: '#4a6325' }}>{role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ── */}
            <section className="py-20 px-6" style={{ background: '#0C2D1C' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready to Enroll Your Child?</h2>
                    <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Join hundreds of families who trust Nurtured Seeds Academy. Spaces are limited — apply today.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mb-10">
                        <Link to="/contact"
                            className="px-8 py-4 font-bold rounded-xl text-sm text-white transition hover:-translate-y-1"
                            style={{ background: '#E86D2C', boxShadow: '0 8px 24px rgba(232,109,44,0.4)' }}>
                            Contact Admissions
                        </Link>
                        <Link to="/explore"
                            className="px-8 py-4 font-bold rounded-xl text-sm border transition hover:bg-white/10"
                            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                            Explore the Academy
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {[
                            { Icon: MapPin, text: 'Akute, Ogun State' },
                            { Icon: Phone, text: '+234 9876543210' },
                        ].map(({ Icon, text }) => (
                            <span key={text} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                <Icon size={14} color="#E86D2C" /> {text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
