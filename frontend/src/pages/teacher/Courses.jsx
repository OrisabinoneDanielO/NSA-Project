import { useNavigate } from 'react-router-dom'
import { BookOpen, Users, FileText, Calendar, TrendingUp } from 'lucide-react'

const MY_COURSES = [
    { id: 1, name: 'Nursery 1A', subject: 'All Subjects', students: 18, nextClass: 'Mon, 8:00 AM', progress: 70 },
    { id: 2, name: 'Nursery 1B', subject: 'All Subjects', students: 19, nextClass: 'Mon, 9:30 AM', progress: 65 },
    { id: 3, name: 'Primary 2A', subject: 'Mathematics', students: 25, nextClass: 'Mon, 11:00 AM', progress: 80 },
]

export default function TeacherCourses() {
    const navigate = useNavigate()

    return (
        <div className="font-sans">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold" style={{ color: '#243316' }}>My Courses</h1>
                <p className="text-sm mt-1" style={{ color: '#4a6325' }}>Your assigned classes and subjects for the current term</p>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { Icon: BookOpen, label: 'Assigned Classes', value: MY_COURSES.length },
                    { Icon: Users, label: 'Total Students', value: MY_COURSES.reduce((a, c) => a + c.students, 0) },
                    { Icon: Calendar, label: 'Classes This Week', value: 9 },
                ].map(({ Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: '#fdf0e8' }}>
                            <Icon size={18} color="#E86D2C" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold" style={{ color: '#243316' }}>{value}</p>
                            <p className="text-xs" style={{ color: '#4a6325' }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Course Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {MY_COURSES.map(c => (
                    <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                        style={{ border: '1px solid #e8ede6' }}>
                        <div className="px-5 py-4" style={{ background: '#0C2D1C' }}>
                            <p className="text-xs font-bold mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.subject}</p>
                            <h3 className="text-white font-extrabold text-lg">{c.name}</h3>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1.5 text-sm" style={{ color: '#4a6325' }}>
                                    <Users size={13} color="#E86D2C" />
                                    <span className="font-semibold">{c.students}</span> students
                                </div>
                                <div className="flex items-center gap-1.5 text-sm" style={{ color: '#4a6325' }}>
                                    <Calendar size={13} color="#E86D2C" />
                                    {c.nextClass}
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#4a6325' }}>
                                    <span>Syllabus progress</span>
                                    <span className="font-bold" style={{ color: '#243316' }}>{c.progress}%</span>
                                </div>
                                <div className="h-2 rounded-full" style={{ background: '#e8ede6' }}>
                                    <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: '#E86D2C' }} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate('/teacher/students')}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition hover:opacity-90"
                                    style={{ background: '#E86D2C' }}>
                                    <Users size={12} /> View Students
                                </button>
                                <button
                                    onClick={() => navigate('/teacher/grades')}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition hover:bg-[#F4F7F2]"
                                    style={{ color: '#243316', borderColor: '#e8ede6' }}>
                                    <FileText size={12} /> Enter Grades
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
