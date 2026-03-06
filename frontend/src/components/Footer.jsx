import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin, MessageCircle, Heart } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-nsa-green text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-nsa-orange text-white font-black text-sm flex items-center justify-center flex-shrink-0">NSA</span>
            <div>
              <p className="text-white font-bold text-sm">Nurtured Seeds Academy</p>
              <p className="text-white/40 text-xs">Excellence in Education</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            Providing quality education from Crèche through Primary. Empowering young minds for a brighter tomorrow.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
              { icon: <Twitter size={16} />, label: 'Twitter', href: '#' },
              { icon: <MessageCircle size={16} />, label: 'WhatsApp', href: '#' },
              { icon: <Youtube size={16} />, label: 'YouTube', href: '#' },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-nsa-orange text-white/60 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-2.5">
            {[
              ['/', 'Home'], ['/about', 'About Us'], ['/courses', 'Courses'],
              ['/blog', 'Blog'], ['/contact', 'Contact'], ['/login', 'Staff Portal'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to}
                  className="text-sm text-white/60 hover:text-nsa-orange transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-nsa-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contact Us</h3>
          <ul className="flex flex-col gap-4">
            {[
              { icon: <MapPin size={15} />, text: 'XYZ Road, ABC Building, Akute, Ogun State' },
              { icon: <Phone size={15} />, text: '+234 9876543210' },
              { icon: <Mail size={15} />, text: 'info@nurturedseeds.com' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/60">
                <span className="text-nsa-orange flex-shrink-0 mt-0.5">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">© {year} Nurtured Seeds Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
