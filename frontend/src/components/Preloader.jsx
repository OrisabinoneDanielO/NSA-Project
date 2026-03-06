import { useState, useEffect } from 'react'

const Preloader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-red-500 text-white font-black text-lg flex items-center justify-center animate-pulse">
          NSA
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-red-500"
              style={{ animation: `bounce 1s ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Preloader
