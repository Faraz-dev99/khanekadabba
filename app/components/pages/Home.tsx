'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/api/auth/auth';
import { useAppDispatch } from '@/store/hooks';


// ─── Role badge colours ───────────────────────────────────────────────────────
const roleMeta: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  USER:     { label: 'Food Lover',     color: 'text-amber-700',  bg: 'bg-amber-50',  icon: '🍱' },
  SELLER:   { label: 'Home Chef',      color: 'text-green-700',  bg: 'bg-green-50',  icon: '👩‍🍳' },
  DELIVERY: { label: 'Delivery Hero',  color: 'text-blue-700',   bg: 'bg-blue-50',   icon: '🛵' },
}

// ─── Role-specific quick-action cards ────────────────────────────────────────
const roleCards: Record<string, { title: string; desc: string; cta: string; icon: string; href: string }[]> = {
  USER: [
    { title: 'Browse Dabbas',   desc: 'Explore today\'s homemade menus from local chefs',        cta: 'Explore',   icon: '🔍', href: '/explore'  },
    { title: 'My Orders',       desc: 'Track current deliveries and view past tiffins',           cta: 'View',      icon: '📦', href: '/orders'   },
    { title: 'Saved Addresses', desc: 'Manage your delivery locations',                           cta: 'Manage',    icon: '📍', href: '/address'  },
    { title: 'Favourites',      desc: 'Quick reorder from your go-to home chefs',                 cta: 'Reorder',   icon: '❤️', href: '/saved'    },
  ],
  SELLER: [
    { title: 'Today\'s Menu',  desc: 'Add or update what you\'re cooking today',                  cta: 'Update',    icon: '📋', href: '/menu'     },
    { title: 'Incoming Orders', desc: 'View and accept orders from hungry customers',             cta: 'Open',      icon: '🔔', href: '/orders'   },
    { title: 'Earnings',        desc: 'Track your weekly earnings and payouts',                   cta: 'View',      icon: '💰', href: '/earnings' },
    { title: 'My Kitchen',      desc: 'Update your profile, photos and story',                    cta: 'Edit',      icon: '🏠', href: '/profile'  },
  ],
  DELIVERY: [
    { title: 'Available Runs',  desc: 'Accept nearby delivery assignments now',                   cta: 'Browse',    icon: '🗺️', href: '/runs'     },
    { title: 'Active Delivery', desc: 'Navigate to your current pick-up or drop-off',            cta: 'Navigate',  icon: '🛵', href: '/active'   },
    { title: 'Earnings',        desc: 'Today\'s trips, tips and payout status',                   cta: 'View',      icon: '💳', href: '/earnings' },
    { title: 'My Ratings',      desc: 'See customer reviews and delivery score',                  cta: 'View',      icon: '⭐', href: '/ratings'  },
  ],
}

// ─── Greeting helper ──────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100">
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

// ─── Action card ─────────────────────────────────────────────────────────────
function ActionCard({ title, desc, cta, icon, href }: { title: string; desc: string; cta: string; icon: string; href: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(href)}
      className="group text-left bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(234,88,12,0.12)] hover:border-orange-200 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
          {cta} →
        </span>
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </button>
  )
}



// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const role = user?.role ?? 'USER'
  const meta = roleMeta[role] ?? roleMeta.USER
  const cards = roleCards[role] ?? roleCards.USER

  const handleLogout =async () => {
    const res: any = await dispatch(logoutUser())
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <span className="text-xl font-black tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="text-orange-500">Ghar</span>
            <span className="text-gray-900">KaDabba</span>
          </span>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Role badge */}
            <div className={`hidden sm:flex items-center gap-2 ${meta.bg} ${meta.color} text-xs font-semibold px-3 py-1.5 rounded-full`}>
              <span>{meta.icon}</span>
              {meta.label}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-full transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Hero greeting ── */}
        <section className="mb-10">
          <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_32px_rgba(0,0,0,0.06)] px-8 md:px-12 py-10">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-orange-500 mb-2">{greeting()}, {user?.name?.split(' ')[0]} 👋</p>
                <h1
                  className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Your <span className="text-orange-500">Dashboard</span>
                </h1>
                <p className="text-gray-400 text-sm mt-2">{user?.email}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                {role === 'USER'     && <><StatPill emoji="🍱" value="12"   label="Orders placed"   /><StatPill emoji="❤️" value="5"    label="Saved chefs"     /></>}
                {role === 'SELLER'   && <><StatPill emoji="📦" value="8"    label="Orders today"    /><StatPill emoji="⭐" value="4.9"  label="Avg. rating"     /></>}
                {role === 'DELIVERY' && <><StatPill emoji="🛵" value="3"    label="Active deliveries"/><StatPill emoji="💰" value="₹640" label="Earned today"    /></>}
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick actions ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
            <span className={`text-xs font-semibold ${meta.bg} ${meta.color} px-3 py-1.5 rounded-full`}>
              {meta.icon} {meta.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <ActionCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* ── Recent activity placeholder ── */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] divide-y divide-gray-50">
            {[
              { label: 'Dal Makhani + Roti',   sub: 'from Sunita\'s Kitchen',  time: '12:30 PM',  status: 'Delivered',  dot: 'bg-green-400'  },
              { label: 'Rajma Chawal Combo',   sub: 'from Mrs. Sharma\'s Home', time: 'Yesterday', status: 'Delivered',  dot: 'bg-green-400'  },
              { label: 'South Indian Thali',   sub: 'from Lakshmi Home Foods',  time: '2 days ago', status: 'Delivered', dot: 'bg-green-400'  },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors first:rounded-t-3xl last:rounded-b-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-lg">🍱</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
                    <span className="text-xs font-medium text-gray-500">{item.status}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}