'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { loginUser } from '@/api/auth/auth'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import Link from 'next/link'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { loading, error } = useSelector((state: any) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    const res: any = await dispatch(loginUser(data))
    if (res.meta.requestStatus === 'fulfilled') {
      router.push('/')
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">

      {/* ── Background Image ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/loginbg.jpeg')" }}
      />

      {/* ── Dark overlay ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f0804]/58 via-[#1a0d05]/52 to-[#0a0603]/62" />

      {/* ── Warm radial glow top-left ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(196,98,45,0.22),transparent_65%)] blur-[70px] sm:blur-[90px]" />

      {/* ── Amber radial glow bottom-right ── */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,164,74,0.15),transparent_65%)] blur-[70px] sm:blur-[90px]" />

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Floating kitchen icons — desktop only ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden lg:block select-none">
        <svg className="absolute top-[13%] left-[7%] w-8 h-8 opacity-[0.13] text-amber-400 animate-bounce [animation-duration:5s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="5" y="3" width="14" height="3" rx="1" />
          <path d="M3 6h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="3" y1="14" x2="21" y2="14" />
        </svg>
        <svg className="absolute top-[40%] left-[5%] w-7 h-7 opacity-[0.10] text-amber-400 animate-bounce [animation-duration:6s] [animation-delay:1s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2a5 5 0 0 1 0 10M12 12v10" />
        </svg>
        <svg className="absolute top-[72%] left-[6%] w-9 h-9 opacity-[0.12] text-amber-400 animate-bounce [animation-duration:4.5s] [animation-delay:0.5s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M4 11h16M4 11a8 8 0 0 0 16 0" />
          <line x1="8" y1="19" x2="16" y2="19" />
        </svg>
        <svg className="absolute top-[86%] left-[9%] w-7 h-7 opacity-[0.10] text-amber-400 animate-bounce [animation-duration:5.5s] [animation-delay:2s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M12 22V12M12 12C12 7 17 3 22 2c0 5-3 10-10 10zM12 12C12 7 7 3 2 2c0 5 3 10 10 10z" />
        </svg>
        <svg className="absolute top-[10%] right-[6%] opacity-[0.12] animate-bounce [animation-duration:4s] [animation-delay:1.5s]" width="90" height="65" viewBox="0 0 140 100" fill="none" stroke="#e8a44a" strokeWidth="1.5">
          <circle cx="30" cy="75" r="18" /><circle cx="110" cy="75" r="18" />
          <path d="M30 75 L50 45 L80 45 L95 30 L115 30" />
          <path d="M80 45 L95 55 L110 75" />
          <path d="M50 45 L65 30 L95 30" />
          <rect x="62" y="15" width="35" height="20" rx="4" />
        </svg>
        <svg className="absolute top-[42%] right-[5%] w-8 h-8 opacity-[0.11] text-amber-400 animate-bounce [animation-duration:5s] [animation-delay:0.8s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2C7 2 4 6 4 10c0 3 2 5 8 6v6M12 2c5 0 8 4 8 8 0 3-2 5-8 6" />
          <line x1="12" y1="16" x2="12" y2="22" />
        </svg>
        <svg className="absolute top-[74%] right-[7%] w-7 h-7 opacity-[0.10] text-amber-400 animate-bounce [animation-duration:6.5s] [animation-delay:2.5s]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M7 2v4a4 4 0 0 0 4 4v12" />
          <path d="M7 2v4" /><path d="M11 2v4" /><path d="M9 2v4" />
        </svg>
        <svg className="absolute bottom-[7%] right-[5%] opacity-[0.09] animate-bounce [animation-duration:5s] [animation-delay:1s]" width="75" height="105" viewBox="0 0 120 160" fill="none" stroke="#e8a44a" strokeWidth="1.5">
          <rect x="25" y="40" width="70" height="28" rx="4" />
          <rect x="25" y="72" width="70" height="28" rx="4" />
          <rect x="25" y="104" width="70" height="28" rx="4" />
          <rect x="20" y="36" width="80" height="8" rx="4" />
          <line x1="60" y1="8" x2="60" y2="36" />
          <circle cx="60" cy="8" r="5" />
        </svg>
      </div>

      {/* ══════════════════════════════
           LOGIN CARD
         ══════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[460px] mx-3 sm:mx-4 my-4 sm:my-8 rounded-2xl sm:rounded-[30px] border border-white/[0.10] bg-white/[0.08] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.50),0_0_0_1px_rgba(196,98,45,0.12),inset_0_1px_0_rgba(255,255,255,0.09)]">

        {/* Top amber glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full" />

        {/* ── Card inner padding: tight on mobile, generous on sm+ ── */}
        <div className="px-5 pt-8 pb-6 sm:px-9 sm:pt-11 sm:pb-9">

          {/* ── Logo & heading ── */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">

            {/* Icon badge — smaller on mobile */}
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-2xl sm:rounded-[20px] bg-gradient-to-br from-orange-700/35 to-amber-500/25 border border-amber-400/25 shadow-[0_8px_24px_rgba(196,98,45,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] mb-3 sm:mb-4">
              <svg width="30" height="30" className="sm:w-[38px] sm:h-[38px]" viewBox="0 0 38 38" fill="none">
                <rect x="8" y="8" width="22" height="7" rx="2.5" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.10)" />
                <rect x="8" y="17" width="22" height="7" rx="2.5" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.10)" />
                <rect x="8" y="26" width="22" height="4" rx="2" stroke="#c4622d" strokeWidth="1.5" fill="rgba(196,98,45,0.12)" />
                <rect x="6" y="6" width="26" height="4" rx="2" stroke="#e8a44a" strokeWidth="1.2" fill="rgba(232,164,74,0.08)" />
                <line x1="19" y1="2" x2="19" y2="6" stroke="#e8a44a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="19" cy="2" r="1.8" fill="#e8a44a" />
              </svg>
            </div>

            <h1 className="text-[22px] sm:text-[28px] font-light tracking-tight text-amber-50/90 leading-none">
              Ghar<span className="font-bold text-orange-400">Ka</span>Dabba
            </h1>
            <p className="mt-2 text-[12px] sm:text-[13px] text-amber-50/42 font-light leading-relaxed">
              Welcome back to your home-cooked experience 🍱
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            {/* Email */}
            <div>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 text-amber-50/35">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.10] text-amber-50/85 placeholder-amber-50/25 text-sm font-light outline-none transition-all duration-200 focus:bg-white/[0.11] focus:border-amber-400/40 focus:shadow-[0_0_0_3px_rgba(232,164,74,0.08)] shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400/80 text-[11px] mt-1.5 ml-0.5 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 text-amber-50/35">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 sm:py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.10] text-amber-50/85 placeholder-amber-50/25 text-sm font-light outline-none transition-all duration-200 focus:bg-white/[0.11] focus:border-amber-400/40 focus:shadow-[0_0_0_3px_rgba(232,164,74,0.08)] shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-amber-50/30 hover:text-amber-50/65 transition-colors duration-200 p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400/80 text-[11px] mt-1.5 ml-0.5 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.password.message}
                </p>
              )}

              {/* Forgot password */}
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-[11.5px] sm:text-[12px] text-amber-400/75 font-medium hover:text-amber-400 hover:underline transition-all duration-200">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* API Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" className="shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-red-400/90 text-[12px] font-light">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 sm:py-3.5 mt-1 rounded-xl bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 text-white text-[13px] sm:text-sm font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(196,98,45,0.55)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_6px_24px_rgba(196,98,45,0.42)] cursor-pointer group"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 my-4 sm:my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] sm:text-[10.5px] text-amber-50/25 tracking-[1.8px] uppercase font-medium">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* ── Sign up link ── */}
          <p className="text-center text-[12.5px] sm:text-[13px] text-amber-50/35 font-light">
            New to GharKaDabba?{' '}
            <Link href="/signup" className="text-amber-400/85 font-semibold hover:text-amber-400 hover:underline transition-all duration-200">
              Create an account
            </Link>
          </p>

          {/* ── Trust badge ── */}
          <div className="flex justify-center mt-3 sm:mt-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 rounded-full bg-[#7a9e6e]/10 border border-[#7a9e6e]/20">
              <span className="size-1.5 rounded-full bg-[#8ab878] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[10.5px] text-[#8ab878]/75 tracking-wide font-light">
                Fresh & home-cooked, delivered daily
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}