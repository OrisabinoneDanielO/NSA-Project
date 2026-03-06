import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import StudentLayout from '../layouts/StudentLayout';

// Route guard
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Blog from '../pages/public/Blog';
import BlogPost from '../pages/public/BlogPost';
import Contact from '../pages/public/Contact';
import Courses from '../pages/public/Courses';
import Explore from '../pages/public/Explore';

// Auth pages
import Login from '../pages/auth/Login';

// ── Admin pages ───────────────────────────────────────────────
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminCourses from '../pages/admin/Courses';
import AdminAnnouncements from '../pages/admin/Announcements';
import AdminReports from '../pages/admin/Reports';
import AdminSettings from '../pages/admin/Settings';
import AdminSchedule from '../pages/admin/Schedule';
import AdminContent from '../pages/admin/Content';
import AdminArticles from '../pages/admin/Articles';

// ── Teacher pages ─────────────────────────────────────────────
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherCourses from '../pages/teacher/Courses';
import TeacherStudents from '../pages/teacher/Students';
import TeacherGrades from '../pages/teacher/Grades';
import TeacherSchedule from '../pages/teacher/Schedule';

// ── Student pages ─────────────────────────────────────────────
import StudentDashboard from '../pages/student/Dashboard';
import StudentCourses from '../pages/student/Courses';
import StudentGrades from '../pages/student/Grades';
import StudentSchedule from '../pages/student/Schedule';

// Misc
import Unauthorized from '../pages/Unauthorized';

const AppRoutes = () => (
    <Routes>
        {/* ── Public routes ── */}
        <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explore" element={<Explore />} />
        </Route>

        {/* ── Auth routes ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ── Admin routes ── */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/schedule" element={<AdminSchedule />} />
                <Route path="/admin/content" element={<AdminContent />} />
                <Route path="/admin/articles" element={<AdminArticles />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
        </Route>

        {/* ── Teacher routes ── */}
        <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route element={<TeacherLayout />}>
                <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher/courses" element={<TeacherCourses />} />
                <Route path="/teacher/students" element={<TeacherStudents />} />
                <Route path="/teacher/grades" element={<TeacherGrades />} />
                <Route path="/teacher/schedule" element={<TeacherSchedule />} />
            </Route>
        </Route>

        {/* ── Student routes ── */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route element={<StudentLayout />}>
                <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/courses" element={<StudentCourses />} />
                <Route path="/student/grades" element={<StudentGrades />} />
                <Route path="/student/schedule" element={<StudentSchedule />} />
            </Route>
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default AppRoutes;
