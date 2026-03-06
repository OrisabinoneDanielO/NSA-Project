import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Baby, Palette, GraduationCap } from 'lucide-react'

const LEVELS = [
    {
        Icon: Baby, tag: 'Ages 0 – 2', title: 'Crèche Programme', colour: '#E86D2C',
        desc: 'Our Crèche provides expert, loving care for infants from birth to age 2. Parents receive real-time updates on feeding, napping, and daily activities through our parent portal.',
        subjects: ['Daily health & nap tracking', 'Feeding schedule management', 'Developmental activity summaries', 'Secure check-in / check-out', 'Immunisation record keeping', 'Direct nurse on site'],
        highlights: ['Qualified nursery nurses', 'Maximum 7 infants per carer', 'CCTV-monitored environment'],
    },
    {
        Icon: Palette, tag: 'Ages 2 – 5', title: 'Nursery Programme', colour: '#0C2D1C',
        desc: 'Our Nursery programme is built around play-based learning and developmental milestones. Small classes ensure every child receives personalised attention and encouragement.',
        subjects: ['Literacy & phonics', 'Early Numeracy', 'Art & Creative Expression', 'Music & Movement', 'Social Studies', 'Environmental Studies'],
        highlights: ['Max 20 pupils per class', 'Milestone-based assessment', 'Visual report cards'],
    },
    {
        Icon: GraduationCap, tag: 'Ages 5 – 11', title: 'Primary Programme', colour: '#164a2e',
        desc: 'Our Primary school offers a structured, nationally-aligned academic curriculum with formal assessment, term report cards, and a rich extracurricular programme.',
        subjects: ['Mathematics', 'English Language', 'Basic Science & Technology', 'Social Studies', 'Civic Education', 'Christian / Islamic Religious Studies', 'Yoruba Language', 'Physical & Health Education'],
        highlights: ['6 year groups (P1 – P6)', 'Formal term report cards with positions', 'ICT & Computer lessons'],
    },
]

export default function Courses() {
    return (
        <>
            {/* Header */}
            <div className="pt-20" style={{ background: '#0C2D1C' }}>
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E86D2C' }}>Academics</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-5">Our Programmes</h1>
                    <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Three world-class educational programmes, each tailored to the unique developmental needs of your child's age group.
                    </p>
                </div>
            </div>

            {/* Level Detail Sections */}
            {LEVELS.map(({ Icon, tag, title, colour, desc, subjects, highlights }, idx) => (
                <section key={title} className="py-24 px-6"
                    style={{ background: idx % 2 === 0 ? '#F4F7F2' : '#fff' }}>
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ background: colour }}>
                                    <Icon size={28} color="#fff" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-1"
                                        style={{ background: '#fdf0e8', color: '#E86D2C' }}>{tag}</span>
                                    <h2 className="text-3xl font-black" style={{ color: '#0C2D1C' }}>{title}</h2>
                                </div>
                            </div>
                            <p className="text-base leading-relaxed mb-6" style={{ color: '#4a6325' }}>{desc}</p>
                            <div className="flex flex-col gap-2 mb-8">
                                {highlights.map(h => (
                                    <div key={h} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: '#243316' }}>
                                        <CheckCircle size={15} color="#E86D2C" style={{ flexShrink: 0 }} /> {h}
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl text-sm"
                                style={{ background: '#E86D2C', boxShadow: '0 6px 20px rgba(232,109,44,0.35)' }}>
                                Enrol Now <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4a6325' }}>
                                Subjects / Activities
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {subjects.map(s => (
                                    <div key={s}
                                        className="flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium"
                                        style={{ background: idx % 2 === 0 ? '#fff' : '#F4F7F2', border: '1px solid #e8ede6', color: '#243316' }}>
                                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colour }} />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA */}
            <section className="py-20 px-6" style={{ background: '#0C2D1C' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Not Sure Which Programme to Choose?</h2>
                    <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Get in touch and we'll help you find the perfect fit for your child's age and developmental stage.
                    </p>
                    <Link to="/contact"
                        className="px-8 py-4 font-bold rounded-xl text-sm text-white inline-block"
                        style={{ background: '#E86D2C', boxShadow: '0 8px 24px rgba(232,109,44,0.4)' }}>
                        Speak to an Admissions Officer
                    </Link>
                </div>
            </section>
        </>
    )
}
