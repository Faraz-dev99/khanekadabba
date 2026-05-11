import { Cooker } from "@/interfaces/cooker/cooker.interface"
import { useEffect, useRef, useState } from "react"

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

/* ─── HERO SLIDER ─────────────────────────────────────────── */
export const HeroCookerSlider: React.FC = () => {
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