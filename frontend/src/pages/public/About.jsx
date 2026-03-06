import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Handshake, Sprout, CheckCircle } from 'lucide-react'

const VALUES = [
    { Icon: Target, title: 'Academic Excellence', desc: 'We set high standards and support every pupil through quality teaching and continuous assessment.' },
    { Icon: Heart, title: 'Care & Nurturing', desc: 'Every child is treated as an individual. Our staff build warm, trusting relationships that build confidence.' },
    { Icon: Handshake, title: 'Partnership with Parents', desc: 'We believe parents are equal partners in education. Open communication underpins everything we do.' },
    { Icon: Sprout, title: 'Holistic Development', desc: 'Beyond academics, we develop creativity, social skills, character, and physical wellbeing.' },
]

const TEAM = [
    { name: 'Mrs. Adaobi Nwosu', role: 'School Proprietress', initial: 'A', colour: '#E86D2C' },
    { name: 'Mr. Jonathan Bello', role: 'Academic Head', initial: 'J', colour: '#0C2D1C' },
    { name: 'Mrs. Fatima Ibrahim', role: 'Head of Nursery', initial: 'F', colour: '#164a2e' },
    { name: 'Mr. Emeka Obi', role: 'Primary 3 / ICT Lead', initial: 'E', colour: '#E86D2C' },
    { name: 'Miss Ade Bello', role: 'Head of Crèche', initial: 'A', colour: '#0C2D1C' },
    { name: 'Mrs. Ngozi Adeyemi', role: 'Nursery 1 Teacher', initial: 'N', colour: '#164a2e' },
    { name: 'Mrs. Adaobi Nwosu', role: 'School Proprietress', initial: 'A', colour: '#E86D2C' },
    { name: 'Mr. Jonathan Bello', role: 'Academic Head', initial: 'J', colour: '#0C2D1C' },
    { name: 'Mrs. Fatima Ibrahim', role: 'Head of Nursery', initial: 'F', colour: '#164a2e' },
    { name: 'Mr. Emeka Obi', role: 'Primary 3 / ICT Lead', initial: 'E', colour: '#E86D2C' },
    { name: 'Miss Ade Bello', role: 'Head of Crèche', initial: 'A', colour: '#0C2D1C' },
    { name: 'Mrs. Ngozi Adeyemi', role: 'Nursery 1 Teacher', initial: 'N', colour: '#164a2e' },
    { name: 'Mrs. Adaobi Nwosu', role: 'School Proprietress', initial: 'A', colour: '#E86D2C' },
    { name: 'Mr. Jonathan Bello', role: 'Academic Head', initial: 'J', colour: '#0C2D1C' },
    { name: 'Mrs. Fatima Ibrahim', role: 'Head of Nursery', initial: 'F', colour: '#164a2e' },
    { name: 'Mr. Emeka Obi', role: 'Primary 3 / ICT Lead', initial: 'E', colour: '#E86D2C' },
    { name: 'Miss Ade Bello', role: 'Head of Crèche', initial: 'A', colour: '#0C2D1C' },
    { name: 'Mrs. Ngozi Adeyemi', role: 'Nursery 1 Teacher', initial: 'N', colour: '#164a2e' },
    { name: 'Mrs. Adaobi Nwosu', role: 'School Proprietress', initial: 'A', colour: '#E86D2C' },
    { name: 'Mr. Jonathan Bello', role: 'Academic Head', initial: 'J', colour: '#0C2D1C' },
    { name: 'Mrs. Fatima Ibrahim', role: 'Head of Nursery', initial: 'F', colour: '#164a2e' },
    { name: 'Mr. Emeka Obi', role: 'Primary 3 / ICT Lead', initial: 'E', colour: '#E86D2C' },
    { name: 'Miss Ade Bello', role: 'Head of Crèche', initial: 'A', colour: '#0C2D1C' },
    { name: 'Mrs. Ngozi Adeyemi', role: 'Nursery 1 Teacher', initial: 'N', colour: '#164a2e' },
]

export default function About() {
    const [stats, setStats] = useState({ pupils: '500+', staff: '20+', years: '10+', levels: '3' })

    useEffect(() => {
        try {
            const saved = localStorage.getItem('nsa_home_stats')
            if (saved) setStats(JSON.parse(saved))
        } catch { }
    }, [])

    return (
        <>
            {/* Header */}
            <div className="pt-20" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E86D2C' }}>Who We Are</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-5">About Nurtured Seeds Academy</h1>
                    <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Founded over a decade ago, we have grown into one of the most trusted private nursery and primary schools in Akute, Ogun State.
                    </p>
                </div>
            </div>

            {/* Story */}
            <section className="py-24 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Our Story</span>
                        <h2 className="text-3xl font-black mt-2 mb-5" style={{ color: '#0C2D1C' }}>Over a Decade of Shaping Young Minds</h2>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a6325' }}>
                            Nurtured Seeds Academy was established with a simple yet powerful vision: to create an educational environment where every child feels safe, valued, and inspired to learn.
                        </p>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#4a6325' }}>
                            What began as a small nursery class has grown into a fully-fledged school offering Crèche, Nursery, and Primary education to over 500 pupils annually, shaped by the trust of hundreds of families and the dedication of our remarkable staff.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[[stats.years, 'Years operating'], [stats.pupils, 'Happy pupils'], [stats.staff, 'Qualified staff']].map(([v, l]) => (
                                <div key={l} className="rounded-2xl p-4 text-center" style={{ background: '#fff', border: '1px solid #e8ede6' }}>
                                    <p className="text-2xl font-black" style={{ color: '#E86D2C' }}>{v}</p>
                                    <p className="text-xs mt-1" style={{ color: '#4a6325' }}>{l}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl text-sm"
                            style={{ background: '#E86D2C', boxShadow: '0 6px 20px rgba(232,109,44,0.4)' }}>
                            Get in Touch <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl" style={{ maxWidth: 500, minHeight: 380 }}>
                        <img src="/images/teaching.png" alt="Classroom at NSA" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-6" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {[
                        { Icon: Target, title: 'Our Mission', text: "To provide a rich, nurturing, and inclusive educational experience that develops curious, confident, and compassionate young people who are ready for the challenges of the future." },
                        { Icon: Sprout, title: 'Our Vision', text: "To be the leading nursery and primary school in Ogun State, recognised for academic excellence, innovative teaching, and the outstanding character development of every pupil." },
                    ].map(({ Icon, title, text }) => (
                        <div key={title} className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                style={{ background: 'rgba(232,109,44,0.2)' }}>
                                <Icon size={22} color="#E86D2C" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-3">{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Our Core Values</span>
                        <h2 className="text-4xl font-black mt-2" style={{ color: '#0C2D1C' }}>What We Stand For</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {VALUES.map(({ Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
                                style={{ border: '1px solid #e8ede6' }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: '#fdf0e8' }}>
                                    <Icon size={22} color="#E86D2C" />
                                </div>
                                <h4 className="font-extrabold text-sm mb-2" style={{ color: '#243316' }}>{title}</h4>
                                <p className="text-xs leading-relaxed" style={{ color: '#4a6325' }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-6" style={{ background: '#fff' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E86D2C' }}>Meet the Team</span>
                        <h2 className="text-4xl font-black mt-2" style={{ color: '#0C2D1C' }}>Our Dedicated Staff</h2>
                        <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: '#4a6325' }}>
                            Every member of our team is passionate about education and committed to the wellbeing of every child.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {TEAM.map(({ name, role, initial, colour }) => (
                            <div key={name} className="flex items-center gap-4 p-5 rounded-2xl hover:shadow-md transition-all"
                                style={{ border: '1px solid #e8ede6' }}>
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white flex-shrink-0"
                                    style={{ background: colour }}>{initial}</div>
                                <div>
                                    <p className="font-extrabold text-sm" style={{ color: '#243316' }}>{name}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#4a6325' }}>{role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6" style={{ background: '#0C2D1C' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Come See Us in Person</h2>
                    <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        We welcome prospective parents to visit, meet our staff, and see the learning environment firsthand.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact"
                            className="px-8 py-4 font-bold rounded-xl text-sm text-white"
                            style={{ background: '#E86D2C', boxShadow: '0 8px 24px rgba(232,109,44,0.4)' }}>
                            Book a School Tour
                        </Link>
                        <Link to="/courses"
                            className="px-8 py-4 font-bold rounded-xl text-sm border"
                            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                            View Our Programmes
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
