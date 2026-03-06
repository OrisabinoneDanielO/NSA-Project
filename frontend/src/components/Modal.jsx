import { useEffect } from 'react'
import { X } from 'lucide-react'

const SIZES = {
    sm: 'max-w-sm rounded-2xl',
    md: 'max-w-lg rounded-2xl',
    lg: 'max-w-2xl rounded-2xl',
    xl: 'max-w-4xl rounded-2xl',
    full: 'max-w-none w-auto h-[100dvh] rounded-none m-0 shadow-none'
}

/**
 * Reusable modal overlay.
 * Close by clicking the × button, pressing Escape, or clicking the backdrop.
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    useEffect(() => {
        if (!isOpen) return
        const handler = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ${size === 'full' ? 'p-0' : 'p-4'}`}
            style={{ background: 'rgba(12,45,28,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={`bg-white shadow-2xl flex flex-col ${SIZES[size]} animate-slide-up w-full overflow-hidden`}
                style={{ border: size === 'full' ? 'none' : '1px solid #e8ede6' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                    style={{ borderBottom: '1px solid #e8ede6' }}>
                    <h3 className="font-extrabold text-base" style={{ color: '#243316' }}>{title}</h3>
                    <button onClick={onClose}
                        className="p-1.5 rounded-lg transition hover:bg-slate-100"
                        style={{ color: '#4a6325' }}>
                        <X size={18} />
                    </button>
                </div>
                {/* Body */}
                <div className={`p-6 flex-1 overflow-y-auto ${size === 'full' ? 'custom-scroll' : ''}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
