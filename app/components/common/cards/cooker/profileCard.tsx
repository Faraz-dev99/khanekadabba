import { Cooker } from "@/interfaces/cooker/cooker.interface"
import { useState } from "react"

/* ─── COOKER CARD (white + food photo) ──────────────────────── */
interface CookerCardProps {
  cooker: Cooker
  onView: () => void
  onSubscribe: () => void
}

export const CookerCard: React.FC<CookerCardProps> = ({ cooker, onView, onSubscribe }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        boxShadow: hovered
          ? '0 28px 64px rgba(0,0,0,0.16), 0 4px 16px rgba(249,115,22,0.10)'
          : '0 2px 18px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'all 0.32s ease',
        border: '1px solid #f0f0f0',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* ── Food photo header ── */}
      <div style={{ position: 'relative', height: 200,  }}>
        <img
          src={cooker.foodImage}
          alt={cooker.specialty}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.62) 100%)',
        }} />

        {/* Tag */}
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,0,0,0.46)', backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '4px 11px', borderRadius: 99,
          border: '1px solid rgba(255,255,255,0.2)',
        }}>{cooker.tag}</span>

        {/* Rating */}
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(255,255,255,0.96)',
          color: '#111', fontSize: 12, fontWeight: 800,
          padding: '4px 10px', borderRadius: 99,
          display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
        }}>
          <span style={{ color: '#f97316' }}>★</span> {cooker.rating}
        </span>

        {/* Chef name over image bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 36px', zIndex:10 }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, textShadow: '0 2px 8px rgba(0,0,0,0.65)' }}>
            {cooker.name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 12, marginTop: 2, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {cooker.specialty}
          </div>
        </div>

        {/* Avatar — overlaps bottom edge */}
        <div style={{
          position: 'absolute', bottom: -22, right: 16,
          width: 52, height: 52, borderRadius: 14,
          background: `linear-gradient(135deg, ${cooker.from}, ${cooker.to})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 16,
          border: '3px solid #fff',
          boxShadow: `0 6px 20px ${cooker.from}60`,
        }}>{cooker.initials}</div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '32px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Price + location row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ color: '#9ca3af', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            📍 {cooker.location}
          </div>
          <div>
            <span style={{ fontWeight: 800, color: '#111', fontSize: 18 }}>{cooker.price}</span>
            <span style={{ color: '#9ca3af', fontSize: 10 }}>/meal</span>
          </div>
        </div>

        {/* Bio */}
        <p style={{ color: '#6b7280', fontSize: 12.5, lineHeight: 1.6, margin: '0 0 14px' }}>
          {cooker.bio}
        </p>

        {/* Subscription plan box */}
        <div style={{
          padding: '12px 14px',
          background: 'linear-gradient(135deg, #fff7ed, #fef3c7)',
          borderRadius: 14, border: '1px solid #fed7aa', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#92400e', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                📦 {cooker.plan}
              </div>
              <div style={{ color: '#b45309', fontSize: 12, marginTop: 3 }}>{cooker.planDetail}</div>
            </div>
            <span style={{
              background: '#f97316', color: '#fff',
              fontSize: 9, fontWeight: 800,
              padding: '3px 9px', borderRadius: 99, letterSpacing: '0.06em',
            }}>ACTIVE</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', borderTop: '1px solid #f3f3f3', paddingTop: 12, marginBottom: 16 }}>
          {[
            { val: `${cooker.subscribers}`, label: 'Subscribers' },
            { val: cooker.meals.toLocaleString(), label: 'Meals made' },
            { val: `${cooker.reviews}`, label: 'Reviews' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < 2 ? '1px solid #f0f0f0' : undefined,
            }}>
              <div style={{ fontWeight: 800, color: '#111', fontSize: 14 }}>{s.val}</div>
              <div style={{ color: '#9ca3af', fontSize: 10, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <button onClick={onView} style={{
            flex: 1, padding: '11px 0',
            background: '#f9fafb', border: '1.5px solid #e5e7eb',
            color: '#374151', fontWeight: 700, fontSize: 13,
            borderRadius: 99, cursor: 'pointer', transition: 'all 0.2s',
          }}>
            View Menu
          </button>
          <button onClick={onSubscribe} style={{
            flex: 1, padding: '11px 0',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            border: 'none', color: '#fff',
            fontWeight: 700, fontSize: 13,
            borderRadius: 99, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(249,115,22,0.38)',
            transition: 'all 0.2s',
          }}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}