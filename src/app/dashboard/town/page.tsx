// @ts-nocheck
'use client'
import { useState } from 'react'
import { Heart, MessageCircle, Share2, Send } from 'lucide-react'

const POSTS = [
  {
    id: '1', author: 'Topraq Basyurt', username: 'topraq', initials: 'T',
    color: 'linear-gradient(135deg,#f4732a,#fbbf24)', time: '2m ago',
    content: 'Just dropped a new post about content strategy! Check it out 🚀 Really excited about this one — took me 3 weeks to write.',
    likes: 24, comments: 8, isCreator: true,
    replies: [
      { id: 'r1', author: 'Jenna Loves', initials: 'JL', color: 'linear-gradient(135deg,#60a5fa,#a78bfa)', text: 'Can\'t wait to read it! 🔥', time: '1m ago' },
      { id: 'r2', author: 'Mike K', initials: 'MK', color: 'linear-gradient(135deg,#34d399,#60a5fa)', text: 'Always great content from you!', time: '30s ago' },
    ]
  },
  {
    id: '2', author: 'Jenna Loves', username: 'jenna_loves', initials: 'JL',
    color: 'linear-gradient(135deg,#60a5fa,#a78bfa)', time: '15m ago',
    content: 'Who else is excited for the Q&A next week? Leave your questions below! 👇',
    likes: 31, comments: 12, isCreator: false,
    replies: [
      { id: 'r3', author: 'Sara Reads', initials: 'SR', color: 'linear-gradient(135deg,#34d399,#60a5fa)', text: 'Will you talk about your camera setup?', time: '10m ago' },
    ]
  },
  {
    id: '3', author: 'Tom Nova', username: 'tomnova', initials: 'TN',
    color: 'linear-gradient(135deg,#f472b6,#f4732a)', time: '1h ago',
    content: 'Just joined Kreatown as a gold member! This community is amazing 🏡',
    likes: 18, comments: 5, isCreator: false,
    replies: []
  },
]

export default function TownSquarePage() {
  const [posts, setPosts] = useState(POSTS)
  const [newPost, setNewPost] = useState('')
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const card: React.CSSProperties = {
    background: '#fff', borderRadius: '20px',
    border: '1px solid rgba(244,115,42,0.12)',
    boxShadow: '0 4px 24px rgba(244,115,42,0.07)',
  }

  const handleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, likes: likedPosts.includes(postId) ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const handlePost = () => {
    if (!newPost.trim()) return
    setPosts(prev => [{
      id: Date.now().toString(),
      author: 'Topraq Basyurt', username: 'topraq', initials: 'T',
      color: 'linear-gradient(135deg,#f4732a,#fbbf24)', time: 'just now',
      content: newPost.trim(), likes: 0, comments: 0, isCreator: true, replies: []
    }, ...prev])
    setNewPost('')
  }

  const handleReply = (postId: string) => {
    if (!replyText.trim()) return
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p, comments: p.comments + 1,
        replies: [...p.replies, {
          id: Date.now().toString(), author: 'Topraq Basyurt', initials: 'T',
          color: 'linear-gradient(135deg,#f4732a,#fbbf24)', text: replyText.trim(), time: 'just now'
        }]
      } : p
    ))
    setReplyText('')
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '680px', fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#1a1612', margin: '0 0 0.3rem' }}>Town Square 🏡</h1>
        <p style={{ color: '#9c8878', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>
          Share updates with your community
        </p>
      </div>

      {/* New Post Box */}
      <div style={{ ...card, padding: '1.2rem', marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#f4732a,#fbbf24)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: '0.85rem'
          }}>T</div>
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share something with your community..."
            style={{
              flex: 1, border: 'none', outline: 'none', resize: 'none' as const,
              fontFamily: 'Nunito, sans-serif', fontSize: '0.9rem', fontWeight: 600,
              color: '#1a1612', background: 'transparent', minHeight: '60px', lineHeight: 1.6
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', borderTop: '1px solid rgba(244,115,42,0.08)', paddingTop: '0.75rem' }}>
          <button onClick={handlePost} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: '#f4732a', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '0.5rem 1.2rem', borderRadius: '100px', fontWeight: 900,
            fontSize: '0.82rem', fontFamily: 'Nunito, sans-serif',
            boxShadow: '0 4px 14px rgba(244,115,42,0.3)'
          }}>
            <Send size={13} /> Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {posts.map(post => (
          <div key={post.id} style={card}>
            <div style={{ padding: '1.2rem 1.4rem' }}>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%', background: post.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 900, fontSize: '0.78rem', flexShrink: 0
                }}>{post.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 900, fontSize: '0.88rem', color: '#1a1612' }}>{post.author}</span>
                    {post.isCreator && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '100px', background: '#fff0e6', color: '#f4732a' }}>
                        Creator
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9c8878', fontWeight: 600 }}>{post.time}</div>
                </div>
              </div>

              {/* Content */}
              <p style={{ fontWeight: 600, fontSize: '0.92rem', color: '#1a1612', lineHeight: 1.65, margin: '0 0 1rem' }}>
                {post.content}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <button onClick={() => handleLike(post.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none',
                  border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                  fontSize: '0.8rem', fontWeight: 800,
                  color: likedPosts.includes(post.id) ? '#f4732a' : '#9c8878'
                }}>
                  <Heart size={15} fill={likedPosts.includes(post.id) ? '#f4732a' : 'none'} /> {post.likes}
                </button>
                <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none',
                  border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                  fontSize: '0.8rem', fontWeight: 800, color: '#9c8878'
                }}>
                  <MessageCircle size={15} /> {post.comments}
                </button>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none',
                  border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                  fontSize: '0.8rem', fontWeight: 800, color: '#9c8878'
                }}>
                  <Share2 size={15} /> Share
                </button>
              </div>
            </div>

            {/* Replies */}
            {expandedPost === post.id && (
              <div style={{ borderTop: '1px solid rgba(244,115,42,0.08)', padding: '1rem 1.4rem' }}>
                {post.replies.map(reply => (
                  <div key={reply.id} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', background: reply.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 900, fontSize: '0.65rem', flexShrink: 0
                    }}>{reply.initials}</div>
                    <div style={{ background: '#fffbf5', borderRadius: '12px', padding: '0.5rem 0.8rem', flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#1a1612', marginBottom: '0.2rem' }}>{reply.author}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1a1612' }}>{reply.text}</div>
                    </div>
                  </div>
                ))}

                {/* Reply Input */}
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#f4732a,#fbbf24)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: '0.65rem'
                  }}>T</div>
                  <input
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleReply(post.id)}
                    placeholder="Write a reply..."
                    style={{
                      flex: 1, padding: '0.5rem 0.9rem', borderRadius: '100px',
                      border: '1px solid rgba(244,115,42,0.2)', background: '#fffbf5',
                      fontFamily: 'Nunito, sans-serif', fontSize: '0.82rem',
                      fontWeight: 600, outline: 'none', color: '#1a1612'
                    }}
                  />
                  <button onClick={() => handleReply(post.id)} style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: '#f4732a', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(244,115,42,0.3)', flexShrink: 0
                  }}>
                    <Send size={13} color="#fff" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}