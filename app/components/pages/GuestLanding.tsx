"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

/* ─── Types ──────────────────────────────────────────────── */
interface Cooker {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  location: string
  price: string
  tag: string
  from: string
  to: string
  initials: string
  subscribers: number
  meals: number
  plan: string
  planDetail: string
  bio: string
  foodImage: string
}

/* ─── Brand ──────────────────────────────────────────────── */
const Logo: React.FC = () => (
  <span className="handwritten italic text-orange-500 font-extralight text-2xl tracking-wider">
    GharKaDabba
  </span>
)

/* ─── Data ───────────────────────────────────────────────── */
const TOP_COOKERS: Cooker[] = [
  {
    id: 1, name: "Sunita Sharma", specialty: "Rajasthani Thali",
    rating: 4.9, reviews: 312, location: "Malviya Nagar, Jaipur",
    price: "₹80", tag: "🏆 Top Rated",
    from: "#78350f", to: "#c2410c",
    initials: "SS", subscribers: 89, meals: 1240,
    plan: "Monthly Subscription", planDetail: "26 meals/month · Lunch + Dinner",
    bio: "Authentic Rajasthani home food — dal baati, gatte ki sabzi, ker sangri. Pure ghee, no shortcuts.",
    foodImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 2, name: "Meena Gupta", specialty: "North Indian",
    rating: 4.8, reviews: 278, location: "Vaishali Nagar, Jaipur",
    price: "₹70", tag: "❤️ Most Loved",
    from: "#881337", to: "#be185d",
    initials: "MG", subscribers: 76, meals: 980,
    plan: "Monthly Subscription", planDetail: "22 meals/month · Lunch only",
    bio: "Classic roti-sabzi like your mom used to make. Seasonal veggies, fresh masala, zero oil.",
    foodImage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 3, name: "Priya Joshi", specialty: "Gujarati Thali",
    rating: 4.9, reviews: 195, location: "C-Scheme, Jaipur",
    price: "₹90", tag: "🌟 Premium",
    from: "#134e4a", to: "#047857",
    initials: "PJ", subscribers: 64, meals: 870,
    plan: "Monthly Subscription", planDetail: "30 meals/month · Thali, Lunch + Dinner",
    bio: "Full Gujarati thali with sweet, savory & farsan. Jain options available on request.",
    foodImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 4, name: "Kavita Verma", specialty: "South Indian",
    rating: 4.7, reviews: 234, location: "Mansarovar, Jaipur",
    price: "₹75", tag: "🔥 Trending",
    from: "#3b0764", to: "#6d28d9",
    initials: "KV", subscribers: 58, meals: 760,
    plan: "Monthly Subscription", planDetail: "26 meals/month · Breakfast + Lunch",
    bio: "Fresh dosas, idli, sambhar every morning. Homemade chutneys, no maida, traditional recipes.",
    foodImage: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 5, name: "Anita Rao", specialty: "Bengali Thali",
    rating: 4.8, reviews: 167, location: "Tonk Road, Jaipur",
    price: "₹85", tag: "✨ Rising Star",
    from: "#1e3a5f", to: "#1d4ed8",
    initials: "AR", subscribers: 41, meals: 520,
    plan: "Monthly Subscription", planDetail: "22 meals/month · Lunch only",
    bio: "Authentic Bengali dal, torkari and fish curries. Mustard oil, panch phoron, real flavours.",
    foodImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 6, name: "Rekha Patel", specialty: "Rajasthani Thali",
    rating: 4.6, reviews: 143, location: "Jagatpura, Jaipur",
    price: "₹75", tag: "🌿 Healthy",
    from: "#14532d", to: "#16a34a",
    initials: "RP", subscribers: 37, meals: 410,
    plan: "Monthly Subscription", planDetail: "22 meals/month · Lunch only",
    bio: "Low oil, high taste. Traditional Marwari recipes with fresh ingredients sourced daily.",
    foodImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 7, name: "Usha Mehta", specialty: "Gujarati Thali",
    rating: 4.7, reviews: 189, location: "Chitrakoot, Jaipur",
    price: "₹80", tag: "🎖️ Verified",
    from: "#78350f", to: "#d97706",
    initials: "UM", subscribers: 52, meals: 680,
    plan: "Monthly Subscription", planDetail: "26 meals/month · Lunch + Dinner",
    bio: "Warm, wholesome Gujarati meals with fresh roti, shaak and dal every single day.",
    foodImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=700&h=320&fit=crop&q=85",
  },
  {
    id: 8, name: "Lata Pandey", specialty: "North Indian",
    rating: 4.5, reviews: 112, location: "Pratap Nagar, Jaipur",
    price: "₹65", tag: "💰 Budget Pick",
    from: "#164e63", to: "#0891b2",
    initials: "LP", subscribers: 28, meals: 320,
    plan: "Monthly Subscription", planDetail: "20 meals/month · Lunch only",
    bio: "Simple, filling, home-style food at the most pocket-friendly price in Jaipur.",
    foodImage: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=700&h=320&fit=crop&q=85",
  },
]

const CUISINES: string[] = ['All', 'Rajasthani', 'North Indian', 'South Indian', 'Gujarati', 'Bengali']

/* ─── HERO SLIDER ─────────────────────────────────────────── */
const HeroCookerSlider: React.FC = () => {
  const [active, setActive] = useState<number>(0)
  const [animating, setAnimating] = useState<boolean>(false)
  const [dir, setDir] = useState<'next' | 'prev'>('next')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const len = TOP_COOKERS.length

  const goTo = (idx: number, direction: 'next' | 'prev' = 'next') => {
    if (animating) return
    setDir(direction)
    setAnimating(true)
    setTimeout(() => {
      setActive((idx + len) % len)
      setAnimating(false)
    }, 380)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(active + 1, 'next'), 3800)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const c = TOP_COOKERS[active]
  const nextC = TOP_COOKERS[(active + 1) % len]
  const prevC = TOP_COOKERS[(active - 1 + len) % len]

  return (
    <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>

      {/* ── Main card ── */}
      <div style={{
        borderRadius: 28, overflow: 'hidden',
        border: '1.5px solid rgba(255,255,255,0.16)',
        background: 'rgba(10,10,10,0.82)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: '0 48px 96px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        opacity: animating ? 0 : 1,
        transform: animating
          ? `translateX(${dir === 'next' ? '-28px' : '28px'}) scale(0.97)`
          : 'translateX(0) scale(1)',
        transition: 'opacity 0.36s ease, transform 0.36s ease',
      }}>

        {/* ── BIG FOOD IMAGE ── */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img
            src={c.foodImage}
            alt={c.specialty}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
              transition: 'transform 0.6s ease',
            }}
          />
          {/* Gradient overlay for text readability */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.75) 100%)',
          }} />

          {/* Tag — top left */}
          <span style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
            color: '#fff', fontSize: 11, fontWeight: 700,
            padding: '5px 13px', borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.18)',
          }}>{c.tag}</span>

          {/* Cuisine — top right */}
          <span style={{
            position: 'absolute', top: 14, right: 14,
            background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
            color: '#fff', fontSize: 10, fontWeight: 700,
            padding: '5px 12px', borderRadius: 99,
          }}>{c.specialty}</span>

          {/* Nav arrows — bottom right */}
          <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 8 }}>
            {(['prev', 'next'] as const).map((d) => (
              <button key={d}
                onClick={() => goTo(d === 'next' ? active + 1 : active - 1, d)}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, backdropFilter: 'blur(8px)', transition: 'background 0.2s',
                }}>
                {d === 'prev' ? '←' : '→'}
              </button>
            ))}
          </div>

          {/* Chef name overlay — bottom left */}
          <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 17, lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
              {c.name}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 1, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              📍 {c.location}
            </div>
          </div>
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: '18px 20px 20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, lineHeight: 1.7, margin: '0 0 16px' }}>
            {c.bio}
          </p>

          {/* Plan box */}
          <div style={{
            background: 'rgba(249,115,22,0.12)',
            border: '1px solid rgba(249,115,22,0.28)',
            borderRadius: 14, padding: '12px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <div>
              <div style={{ color: '#fdba74', fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                📦 {c.plan}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 12, marginTop: 3 }}>{c.planDetail}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fb923c', fontWeight: 800, fontSize: 22 }}>{c.price}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>per meal</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[
              { val: `★ ${c.rating}`, label: `${c.reviews} reviews`, color: '#fb923c' },
              { val: `${c.subscribers}`, label: 'subscribers', color: '#a78bfa' },
              { val: c.meals.toLocaleString(), label: 'meals served', color: '#34d399' },
            ].map((s) => (
              <div key={s.label} style={{
                flex: 1, textAlign: 'center', padding: '8px 4px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ color: s.color, fontWeight: 700, fontSize: 14 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 10, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            border: 'none', borderRadius: 14,
            color: '#fff', fontWeight: 800, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 6px 20px rgba(249,115,22,0.45)',
          }}>
            Subscribe to {c.name.split(' ')[0]}'s Dabba →
          </button>
        </div>
      </div>

      {/* ── Peek strip ── */}
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {[prevC, nextC].map((ch, i) => (
          <button key={ch.id}
            onClick={() => goTo(i === 0 ? active - 1 : active + 1, i === 0 ? 'prev' : 'next')}
            style={{
              flex: 1, borderRadius: 14, overflow: 'hidden',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center',
              transition: 'background 0.2s',
            }}>
            {/* Mini food image thumbnail */}
            <div style={{ width: 52, height: 52, flexShrink: 0, overflow: 'hidden' }}>
              <img src={ch.foodImage} alt={ch.specialty}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '8px 10px', minWidth: 0, textAlign: 'left' }}>
              <div style={{ color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 2 }}>{ch.specialty}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Dots ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {TOP_COOKERS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{
              border: 'none', cursor: 'pointer', padding: 0, borderRadius: 99,
              background: i === active ? '#f97316' : 'rgba(255,255,255,0.22)',
              width: i === active ? 22 : 6, height: 6,
              transition: 'all 0.3s ease',
            }} />
        ))}
      </div>
    </div>
  )
}

/* ─── COOKER CARD (white + food photo) ──────────────────────── */
interface CookerCardProps {
  cooker: Cooker
  onView: () => void
  onSubscribe: () => void
}

const CookerCard: React.FC<CookerCardProps> = ({ cooker, onView, onSubscribe }) => {
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
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
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
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 36px' }}>
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

/* ─── MOBILE DRAWER ──────────────────────────────────────────
   CRITICAL: This is rendered at the ROOT of GuestLanding,
   NOT inside the <nav>. The nav has CSS transform which creates
   a new stacking context — any `position:fixed` child of a
   transformed element is trapped within that element's bounds.
   By placing the drawer here (no transformed ancestor), it
   correctly covers the full viewport.
────────────────────────────────────────────────────────────── */
interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  onLogin: () => void
  onSignup: () => void
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose, onLogin, onSignup }) => (
  <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.32s ease',
      }}
    />

    {/* Drawer panel */}
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
      width: '78vw', maxWidth: 300,
      background: '#0d0d0d',
      borderLeft: '1px solid rgba(255,255,255,0.10)',
      transform: open ? 'translateX(0)' : 'translateX(110%)',
      transition: 'transform 0.36s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', flexDirection: 'column',
      padding: '24px 22px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <Logo />
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.08)', border: 'none',
          color: 'rgba(255,255,255,0.8)', width: 34, height: 34,
          borderRadius: '50%', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, margin: '0 0 28px', lineHeight: 1.6 }}>
        Home food delivery in Jaipur
      </p>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {[
          { label: '🍱  Browse Chefs', href: '/chefs' },
          { label: '⚡  How it works', href: '#how' },
          { label: '👩‍🍳  Become a Chef', href: '/signup?role=SELLER' },
          { label: 'ℹ️  About GharKaDabba', href: '/about' },
        ].map((item) => (
          <a key={item.label} href={item.href} onClick={onClose} style={{
            color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
            fontSize: 15, fontWeight: 600,
            padding: '13px 14px', borderRadius: 12, display: 'block',
          }}>{item.label}</a>
        ))}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => { onClose(); onLogin() }} style={{
          padding: '13px', borderRadius: 99,
          border: '1.5px solid rgba(255,255,255,0.2)',
          background: 'transparent', color: '#fff',
          fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}>Login</button>
        <button onClick={() => { onClose(); onSignup() }} style={{
          padding: '13px', borderRadius: 99, border: 'none',
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
        }}>Get Started</button>
      </div>
    </div>
  </>
)

/* ─── COOKERS SECTION ────────────────────────────────────── */
const CookersSection: React.FC = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = activeFilter === 'All'
    ? TOP_COOKERS
    : TOP_COOKERS.filter((c) => c.specialty.includes(activeFilter))

  return (
    <section style={{ padding: '80px 20px 60px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block', color: '#f97316', fontSize: 11, fontWeight: 800,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            background: '#fff7ed', padding: '5px 16px',
            borderRadius: 99, border: '1px solid #fed7aa', marginBottom: 14,
          }}>Home Chefs in Jaipur</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900,
            color: '#111', margin: '0 0 14px', lineHeight: 1.1,
          }}>
            Real moms, <em style={{ color: '#f97316' }}>real food.</em>
          </h2>
          <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Every chef is personally verified, trained in food safety, and brings their family recipes straight to your dabba.
          </p>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {CUISINES.map((c) => (
            <button key={c} onClick={() => setActiveFilter(c)} style={{
              padding: '8px 22px', borderRadius: 99, cursor: 'pointer',
              fontWeight: 700, fontSize: 13,
              border: activeFilter === c ? 'none' : '1.5px solid #e5e7eb',
              background: activeFilter === c ? '#f97316' : '#fff',
              color: activeFilter === c ? '#fff' : '#374151',
              boxShadow: activeFilter === c ? '0 4px 14px rgba(249,115,22,0.32)' : 'none',
              transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 26 }}>
          {filtered.map((cooker) => (
            <CookerCard key={cooker.id} cooker={cooker}
              onView={() => router.push(`/chef/${cooker.id}`)}
              onSubscribe={() => router.push('/signup')} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <button onClick={() => router.push('/chefs')} style={{
            padding: '14px 38px', borderRadius: 99,
            border: '2px solid #f97316', background: 'transparent',
            color: '#f97316', fontWeight: 800, fontSize: 14,
            cursor: 'pointer', transition: 'all 0.2s',
          }}>Browse all chefs in Jaipur →</button>
        </div>

        {/* Become a chef CTA */}
        <div style={{
          marginTop: 60,
          background: 'linear-gradient(135deg, #1a0a00, #2d1200)',
          borderRadius: 28, padding: '44px 36px',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ color: '#fdba74', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Cook with us</div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.2 }}>
              Turn your kitchen into<br /><span style={{ color: '#fb923c' }}>a thriving business.</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 14, marginTop: 12, maxWidth: 380, lineHeight: 1.65 }}>
              Join 50+ home chefs already earning in Jaipur. We handle delivery & payments — you just cook.
            </p>
          </div>
          <button onClick={() => router.push('/signup?role=SELLER')} style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: '#fff', border: 'none', borderRadius: 99, padding: '16px 34px',
            fontWeight: 800, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: '0 8px 28px rgba(249,115,22,0.52)',
          }}>Start cooking on GharKaDabba 👩‍🍳</button>
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ───────────────────────────────────────── */
const HowItWorks: React.FC = () => (
  <section id="how" style={{ padding: '72px 20px', background: '#fff' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span style={{ color: '#f97316', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>Simple process</span>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#111', margin: 0 }}>Your dabba in 3 steps</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {[
          { num: '01', icon: '🔍', title: 'Find your chef', desc: 'Browse verified home cooks near you in Jaipur. Filter by cuisine, price and location.' },
          { num: '02', icon: '📦', title: 'Subscribe to a plan', desc: 'Pick a monthly dabba plan — lunch, dinner, or both. Flexible and affordable.' },
          { num: '03', icon: '🍱', title: 'Receive fresh food', desc: 'Your dabba arrives hot and fresh every day, packed with love and real ingredients.' },
        ].map((step, i) => (
          <div key={step.num} style={{
            background: i === 1 ? 'linear-gradient(145deg, #f97316, #ef4444)' : '#f9fafb',
            borderRadius: 24, padding: '32px 28px',
            border: i === 1 ? 'none' : '1.5px solid #f0f0f0',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -12, right: -6, fontWeight: 900, fontSize: 84, color: i === 1 ? 'rgba(255,255,255,0.1)' : '#efefef', lineHeight: 1, userSelect: 'none', fontFamily: 'Georgia, serif' }}>{step.num}</div>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: i === 1 ? '#fff' : '#111', margin: '0 0 10px' }}>{step.title}</h3>
            <p style={{ color: i === 1 ? 'rgba(255,255,255,0.8)' : '#6b7280', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ─── MAIN ───────────────────────────────────────────────── */
const GuestLanding: React.FC = () => {
  const router = useRouter()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  // Drawer state lives HERE — not inside the nav — to avoid stacking context trap
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.08)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'DM Sans', sans-serif" }}>

      {/*
        MobileDrawer rendered at ROOT level — not inside <nav>.
        The nav's `transform: translateX(-50%)` creates a stacking context
        that traps position:fixed children inside it. Rendering here avoids that entirely.
      */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLogin={() => router.push('/login')}
        onSignup={() => router.push('/signup')}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
        <Image src="/images/herobg.jpg" alt="Hero background" fill priority quality={100}
          style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.08) 55%, transparent 75%)' }} />

        {/* Watermark */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, zIndex: 2,
          pointerEvents: 'none', userSelect: 'none', lineHeight: 0.85,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'min(50vh, 50vw)', fontWeight: 900,
          color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.16)',
          letterSpacing: -8,
        }}>GKD</div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>

          {/* ── NAVBAR ── */}
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'fixed', zIndex: 40,
            top: scrolled ? 12 : 0,
            left: scrolled ? '50%' : 0,
            transform: scrolled ? 'translateX(-50%)' : 'none',
            width: scrolled ? (isMobile ? '94%' : '90%') : '100%',
            maxWidth: scrolled ? 940 : undefined,
            padding: scrolled ? '10px 20px' : '18px 24px',
            borderRadius: scrolled ? 16 : 0,
            backdropFilter: scrolled ? 'blur(22px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(22px)' : 'none',
            background: scrolled ? 'rgba(255,255,255,0.07)' : 'transparent',
            border: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
            transition: 'all 0.4s ease',
          }}>
            <Logo />

            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                {['Browse Chefs', 'How it works'].map((item) => (
                  <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>{item}</a>
                ))}
              </div>
            )}

            {!isMobile ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => router.push('/login')}
                  style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px' }}>
                  Login
                </button>
                <button onClick={() => router.push('/signup')}
                  style={{ fontSize: 13, fontWeight: 700, background: '#f97316', color: '#fff', border: 'none', borderRadius: 99, padding: '9px 20px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(249,115,22,0.42)' }}>
                  Get Started
                </button>
              </div>
            ) : (
              /* Hamburger — clicking this opens the drawer that lives at root */
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 10, width: 40, height: 40,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 5, cursor: 'pointer',
                }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ display: 'block', width: 18, height: 1.5, background: '#fff', borderRadius: 99 }} />
                ))}
              </button>
            )}
          </nav>

          {/* ── HERO BODY ── */}
          <div style={{
            flex: 1, display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between', gap: 32,
            padding: isMobile
              ? 'clamp(90px,12vh,110px) 20px 32px'
              : 'clamp(90px,12vh,120px) clamp(20px,5vw,64px) 40px',
          }}>
            {/* Left */}
            <section style={{ flex: 1, position: 'relative', paddingLeft: 16, maxWidth: 600 }}>
              <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 3, background: '#fff', borderRadius: 99 }} />

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
                color: '#fdba74', fontSize: 11, fontWeight: 700,
                padding: '6px 16px', borderRadius: 99, marginBottom: 20,
              }}>
                <span style={{ width: 7, height: 7, background: '#fb923c', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #f97316' }} />
                Fresh dabbas available in Jaipur today
              </div>

              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.05, letterSpacing: -1, margin: '0 0 18px' }}>
                <span style={{ fontSize: 'clamp(18px, 3.5vw, 36px)', fontWeight: 900, color: 'rgba(209,213,219,0.9)', fontStyle: 'italic', display: 'block' }}>
                  Home food delivered with
                </span>
                <span className="handwritten" style={{ fontSize: 'clamp(60px, 12vw, 140px)', color: '#fff', display: 'block', lineHeight: 0.9 }}>
                  Love
                </span>
              </h1>

              <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(209,213,219,0.85)', maxWidth: 400, marginBottom: 28, lineHeight: 1.7 }}>
                Real home-cooked meals by local chefs in Jaipur, packed fresh in tiffins and delivered to your door. Just like ghar ka khana.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <button onClick={() => router.push('/signup')}
                  style={{ background: '#f97316', color: '#fff', fontWeight: 800, fontSize: 14, border: 'none', borderRadius: 99, padding: '14px 28px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(249,115,22,0.5)' }}>
                  Order your first dabba
                </button>
                <button onClick={() => router.push('/signup?role=SELLER')}
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', color: '#fff', fontWeight: 700, fontSize: 14, borderRadius: 99, padding: '14px 28px', cursor: 'pointer' }}>
                  Become a home chef 👩‍🍳
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
                {([
                  { href: 'https://instagram.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
                  { href: 'https://facebook.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                  { href: 'https://twitter.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                ] as { href: string; icon: React.ReactNode }[]).map(({ href, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                    {icon}
                  </a>
                ))}
              </div>
            </section>

            {/* Right slider (desktop) */}
            {!isMobile && (
              <div style={{ flexShrink: 0, width: 480 }}>
                <HeroCookerSlider />
              </div>
            )}
          </div>

          {/* Mobile slider */}
          {isMobile && (
            <div style={{ padding: '0 20px 36px' }}>
              <HeroCookerSlider />
            </div>
          )}
        </div>
      </div>

      {/* ── FEATURE STRIP ─────────────────────────────── */}
      <section style={{ padding: '56px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {([
            { icon: "🏠", title: "Real home cooking", desc: "Every meal cooked fresh by a verified home chef in Jaipur." },
            { icon: "⚡", title: "Fast delivery", desc: "Your dabba arrives hot and on time — usually within 45 minutes." },
            { icon: "🤝", title: "Support local chefs", desc: "Every order directly supports a home cook's livelihood in our city." },
          ] as { icon: string; title: string; desc: string }[]).map((f) => (
            <div key={f.title} style={{ background: 'linear-gradient(145deg, #fff7ed, #fef9f5)', borderRadius: 20, padding: '26px 22px', border: '1.5px solid #fed7aa', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <h3 style={{ fontWeight: 800, color: '#111', marginTop: 0, marginBottom: 6, fontSize: 14 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />
      <CookersSection />

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ background: '#0d0d0d', padding: '36px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: 14 }}><Logo /></div>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 13, margin: '0 0 6px' }}>Home food delivered with love across Jaipur.</p>
        <p style={{ color: 'rgba(255,255,255,0.16)', fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} GharKaDabba · Made in Jaipur 🏰</p>
      </footer>
    </div>
  )
}

export default GuestLanding