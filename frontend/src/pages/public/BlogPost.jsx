import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, FileText } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react'

export default function BlogPost() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const savedPosts = localStorage.getItem('nsa_blog_posts')
            if (savedPosts) {
                const parsed = JSON.parse(savedPosts)
                const found = parsed.find(p => p.slug === id)
                if (found) setPost(found)
            }
        } catch { }
        setLoading(false)
    }, [id])

    if (loading) return <div className="min-h-screen pt-40 text-center" style={{ background: '#F4F7F2' }}><span className="loading" /></div>

    if (!post) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F2' }}>
            <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 text-slate-400" />
                <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#243316' }}>Article Not Found</h2>
                <p className="text-sm mb-6" style={{ color: '#4a6325' }}>This article doesn't exist or has been moved.</p>
                <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-3 text-white font-bold rounded-xl text-sm"
                    style={{ background: '#E86D2C' }}><ArrowLeft size={13} />Back to Blog</Link>
            </div>
        </div>
    )

    return (
        <>
            <div className="pt-20" style={{ background: '#0C2D1C' }}>
                <div className="max-w-3xl mx-auto px-6 py-16">
                    <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold mb-6 transition hover:gap-2.5"
                        style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <ArrowLeft size={12} /> Back to Blog
                    </Link>
                    <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block"
                        style={{ background: 'rgba(232,109,44,0.2)', color: '#E86D2C' }}>{post.category}</span>
                    <h1 className="text-3xl md:text-4xl font-black text-white mt-3 mb-5 leading-snug">{post.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <span>{post.date}</span><span>·</span><span>{post.author}</span><span>·</span><span>{post.readTime}</span>
                    </div>
                </div>
            </div>

            <section className="py-16 px-6" style={{ background: '#F4F7F2' }}>
                <div className="max-w-3xl mx-auto">
                    {post.image && (
                        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm" style={{ border: '1px solid #e8ede6' }}>
                        {post.content.map((block, i) =>
                            block.type === 'h2'
                                ? <h2 key={i} className="text-xl font-extrabold mt-8 mb-3" style={{ color: '#0C2D1C' }}>{block.text}</h2>
                                : <p key={i} className="text-sm leading-relaxed" style={{ color: '#4a6325' }}>{block.text}</p>
                        )}
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold"
                            style={{ color: '#E86D2C' }}><ArrowLeft size={13} />All Articles</Link>
                        <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-white font-bold rounded-xl text-sm"
                            style={{ background: '#0C2D1C' }}>Enrol Now <ArrowRight size={13} /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}
