import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectRole } from '../store/slices/authSlice'
import { Menu, X, LogIn } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const ROLE_DASHBOARD = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectRole)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans
      ${scrolled ? 'bg-nsa-green shadow-lg py-2' : 'bg-nsa-green/95 py-3'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <span className="w-10 h-10 rounded-xl bg-nsa-orange flex items-center justify-center font-black text-white text-sm shadow-md group-hover:scale-105 transition-transform">NSA</span>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm leading-tight">Nurtured Seeds Academy</p>
            <p className="text-white/50 text-[10px] font-medium tracking-wide">Excellence in Education</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = isActive(to)
            return (
              <li key={to}>
                <Link to={to}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all group
                    ${active ? 'text-nsa-orange' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-nsa-orange" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link to={ROLE_DASHBOARD[role] || '/'}
              className="px-5 py-2 bg-nsa-orange hover:bg-nsa-orange-dark text-white text-sm font-bold rounded-xl transition shadow-md shadow-nsa-orange/30">
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login"
                className="px-6 py-2 bg-nsa-orange hover:bg-nsa-orange-dark text-white text-sm font-bold rounded-xl transition shadow-md shadow-nsa-orange/30 flex items-center gap-1.5">
                <LogIn size={15} /> Go to Portal
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(o => !o)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-nsa-green-mid border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition
                ${isActive(to) ? 'bg-nsa-orange/20 text-nsa-orange' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 mt-1 flex flex-col gap-2">
            <Link to="/login" className="text-center py-2.5 bg-nsa-orange text-white text-sm font-bold rounded-lg hover:bg-nsa-orange-dark transition flex justify-center items-center gap-2">
              <LogIn size={16} /> Go to Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
