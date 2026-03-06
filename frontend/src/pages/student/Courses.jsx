import { BookOpen, Calendar, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const loadStudentClass = () => {
    try {
        const saved = localStorage.getItem('nsa_classes')
        if (saved) {
            const classes = JSON.parse(saved)
            // Mock: Assumes the student is enrolled in Nursery 1A or the first available class
            return classes.find(c => c.name === 'Nursery 1A') || classes[0]
        }
    } catch { }

    // Fallback seed data if no local storage exists
    return { name: 'Nursery 1A', level: 'Nursery', teacher: 'Mr. Emeka Obi', subjects: ['Phonics', 'Numeracy', 'Sensory'] }
}

export default function StudentCourses() {
    const [myClass, setMyClass] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const cls = loadStudentClass()
        setMyClass(cls)

        if (cls?.subjects) {
            // Generate mock progress course data based on the assigned subjects
            const dynamicCourses = cls.subjects.map((sub, i) => ({
                id: i,
                subject: sub,
                teacher: cls.teacher || 'Assigned Teacher',
                classes: ['Mon/Wed 8–9AM', 'Tue/Thu 9–10AM', 'Fri 10–11AM'][i % 3],
                progress: [75, 40, 90, 20, 100, 60][i % 6] || 50,
                completed: [6, 3, 7, 1, 8, 5][i % 6] || 4,
                total: 8
            }))
            setCourses(dynamicCourses)
        }
    }, [])

    if (!myClass) return null

    const avgProgress = courses.length ? Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length) : 0

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>My Courses</h1>
                <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Your enrolled subjects for the current term — {myClass.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { icon: BookOpen, label: 'Subjects', value: courses.length },
                    { icon: CheckCircle, label: 'Avg. Progress', value: avgProgress + '%' },
                    { icon: Calendar, label: 'Next Class', value: 'Mon 8:00 AM' },
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: '#fdf0e8', color: '#E86D2C' }}><Icon size={18} /></div>
                        <div>
                            <p className="text-2xl font-extrabold" style={{ color: '#243316' }}>{value}</p>
                            <p className="text-xs" style={{ color: '#4a6325' }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {courses.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-2xl p-8 text-center" style={{ border: '1px solid #e8ede6' }}>
                        <p className="text-sm" style={{ color: '#4a6325' }}>No subjects assigned to this class yet.</p>
                    </div>
                ) : courses.map(c => (
                    <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="px-5 pt-5 pb-4">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="font-extrabold text-base" style={{ color: '#243316' }}>{c.subject}</h3>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{ background: '#fdf0e8', color: '#E86D2C' }}>Active</span>
                            </div>
                            <p className="text-xs mb-4" style={{ color: '#4a6325' }}>
                                Teacher: <strong>{c.teacher}</strong> · {c.classes}
                            </p>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#4a6325' }}>
                                    <span>Lessons completed</span>
                                    <span className="font-bold" style={{ color: '#243316' }}>{c.completed}/{c.total}</span>
                                </div>
                                <div className="h-2 rounded-full" style={{ background: '#e8ede6' }}>
                                    <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, background: '#E86D2C' }} />
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition hover:opacity-90"
                                    style={{ background: '#0C2D1C' }}>View Assignments</button>
                                <button className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition hover:bg-gray-50"
                                    style={{ color: '#243316', borderColor: '#e8ede6' }}>Resources</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
