'use client'

import { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signupUser } from '@/api/auth/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Link from 'next/link'

type Role = 'USER' | 'SELLER' | 'DELIVERY'

interface SignupForm {
  name: string
  email: string
  password: string
  role: Role
}

const roles: {
  value: Role
  label: string
  tagline: string
  icon: React.ReactNode
  perks: string[]
}[] = [
  {
    value: 'USER',
    label: 'Customer',
    tagline: 'Browse & order home-cooked meals near you',
    perks: ['Browse daily menus', 'Track live orders', 'Rate & review chefs'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    value: 'SELLER',
    label: 'Home Chef',
    tagline: 'List your kitchen & earn from your cooking',
    perks: ['Publish daily menu', 'Manage all orders', 'Grow your brand'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2C7 2 4 6 4 10c0 3 2 5 8 6v6" />
        <path d="M12 2c5 0 8 4 8 8 0 3-2 5-8 6" />
        <line x1="12" y1="16" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    value: 'DELIVERY',
    label: 'Delivery Partner',
    tagline: 'Deliver meals on your schedule & earn daily',
    perks: ['Flexible hours', 'Daily payouts', 'Route optimized'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 60 42" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="32" r="7" />
        <circle cx="46" cy="32" r="7" />
        <path d="M12 32 L20 18 L33 18 L40 12 L50 12" />
        <path d="M33 18 L40 23 L46 32" />
        <path d="M20 18 L27 12 L40 12" />
        <rect x="26" y="5" width="15" height="9" rx="2" />
      </svg>
    ),
  },
]

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
    {children}
  </span>
)

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="flex items-center gap-1 mt-1.5 text-[11px] text-red-400/90 font-light">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  ) : null

// ─── Avatar Upload Zone ───────────────────────────────────────────────────────
function AvatarUpload({
  preview,
  onChange,
  onRemove,
}: {
  preview: string | null
  onChange: (file: File) => void
  onRemove: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      onChange(file)
    },
    [onChange]
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Avatar circle */}
      <div className="relative shrink-0">
        <div
          className={`w-[68px] h-[68px] rounded-2xl overflow-hidden flex items-center justify-center
            transition-all duration-300 border-2
            ${preview
              ? 'border-orange-400/50 shadow-[0_0_0_4px_rgba(249,115,22,0.08)]'
              : 'border-dashed border-white/[0.13] bg-white/[0.03]'}`}
        >
          {preview ? (
            <img src={preview} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-white/18">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}
        </div>
        {/* remove badge */}
        {preview && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1a1109] border border-white/[0.12] flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/30 transition-colors duration-200"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-3.5 rounded-xl border cursor-pointer
          transition-all duration-200 overflow-hidden select-none
          ${dragging
            ? 'border-orange-400/55 bg-orange-500/10 shadow-[0_0_0_3px_rgba(249,115,22,0.08)]'
            : 'border-dashed border-white/[0.1] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/[0.18]'}`}
      >
        {/* shimmer */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2.4s_infinite]" />

        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className={`transition-colors duration-200 ${dragging ? 'text-orange-400' : 'text-white/22'}`}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className={`text-[11.5px] font-light transition-colors duration-200 ${dragging ? 'text-orange-300/80' : 'text-white/28'}`}>
          {preview ? 'Click to change photo' : 'Upload profile photo'}
        </p>
        <p className="text-[10px] text-white/16 font-light">PNG, JPG, WEBP · optional</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>('USER')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const { loading, error } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignupForm>({ defaultValues: { role: 'USER' } })

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleAvatarRemove = () => {
    setAvatarFile(null)
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(null)
  }

  const handleNextStep = async () => {
    const valid = await trigger(['name', 'email', 'password'])
    if (valid) setStep(2)
  }

  const onSubmit = async (data: SignupForm) => {
    const res: any = await dispatch(
      signupUser({ ...data, role: selectedRole, userImage: avatarFile })
    )
    if (res.meta.requestStatus === 'fulfilled') router.push('/')
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-[#0b0806]">

      {/* ════ LEFT — Brand Panel ════ */}
      <div className="hidden lg:flex lg:w-[54%] xl:w-[58%] relative flex-col justify-between overflow-hidden shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.04]"
          style={{ backgroundImage: "url('/images/loginbg.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/72 via-black/44 to-black/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0806]/45" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[450px] h-[320px] bg-[radial-gradient(ellipse,rgba(196,98,45,0.16),transparent_65%)] blur-[80px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Logo */}
        <div className="relative z-10 px-10 pt-10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500/18 border border-orange-400/28">
              <svg width="18" height="18" viewBox="0 0 38 38" fill="none">
                <rect x="8" y="9" width="22" height="6" rx="2" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.12)" />
                <rect x="8" y="17" width="22" height="6" rx="2" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.12)" />
                <rect x="8" y="25" width="22" height="5" rx="2" stroke="#c4622d" strokeWidth="1.5" fill="rgba(196,98,45,0.12)" />
                <rect x="6" y="6" width="26" height="5" rx="2" stroke="#e8a44a" strokeWidth="1.2" fill="rgba(232,164,74,0.08)" />
                <line x1="19" y1="2" x2="19" y2="6" stroke="#e8a44a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="19" cy="2" r="1.8" fill="#e8a44a" />
              </svg>
            </div>
            <span className="text-[17px] font-light tracking-tight text-white/85">
              Ghar<span className="font-bold text-orange-400">Ka</span>Dabba
            </span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/12 border border-orange-400/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
            <span className="text-[10.5px] text-orange-300/75 tracking-[1.5px] uppercase font-medium">Now live in Jaipur</span>
          </div>
          <h2 className="text-[38px] xl:text-[44px] font-bold text-white/90 leading-[1.1] tracking-tight mb-4">
            Home-cooked meals,<br />
            <span className="text-amber-400">delivered</span> with love.
          </h2>
          <p className="text-[15px] text-white/42 font-light leading-relaxed max-w-[300px]">
            Connect with talented home chefs in your neighbourhood and enjoy fresh, authentic meals every single day.
          </p>
          <div className="flex items-center gap-6 mt-8">
            {[
              { val: '2,400+', label: 'Home Chefs' },
              { val: '50k+', label: 'Customers' },
              { val: '4.8 ★', label: 'Avg. Rating' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                <div>
                  <p className="text-[22px] font-bold text-amber-400 leading-none">{s.val}</p>
                  <p className="text-[11px] text-white/32 mt-0.5 font-light">{s.label}</p>
                </div>
                {i < 2 && <div className="w-px h-8 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 px-10 pb-10">
          <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#e8a44a">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-[13px] text-white/50 font-light italic leading-relaxed mb-4">
              "Finally found a service that feels like eating at a friend's place. The dal makhani from Chef Priya is absolutely incredible."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">R</div>
              <div>
                <p className="text-[12.5px] font-semibold text-white/65">Rahul Mehta</p>
                <p className="text-[10.5px] text-white/28 font-light">Customer · Jaipur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent shrink-0" />

      {/* ════ RIGHT — Form Panel ════ */}
      <div className="flex-1 bg-[#0e0907] flex flex-col h-dvh overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-12 xl:px-16 py-8 w-full max-w-[460px] mx-auto">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-7 lg:hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/18 border border-orange-400/25">
              <svg width="15" height="15" viewBox="0 0 38 38" fill="none">
                <rect x="8" y="9" width="22" height="6" rx="2" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.12)" />
                <rect x="8" y="17" width="22" height="6" rx="2" stroke="#e8a44a" strokeWidth="1.5" fill="rgba(232,164,74,0.12)" />
                <rect x="8" y="25" width="22" height="5" rx="2" stroke="#c4622d" strokeWidth="1.5" fill="rgba(196,98,45,0.12)" />
                <rect x="6" y="6" width="26" height="5" rx="2" stroke="#e8a44a" strokeWidth="1.2" fill="rgba(232,164,74,0.08)" />
              </svg>
            </div>
            <span className="text-[16px] font-light tracking-tight text-white/85">
              Ghar<span className="font-bold text-orange-400">Ka</span>Dabba
            </span>
          </div>

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-[22px] sm:text-[24px] font-bold text-white/90 tracking-tight leading-tight">
              {step === 1 ? 'Create your account' : 'Choose your role'}
            </h2>
            <p className="text-[13px] text-white/32 font-light mt-1 leading-relaxed">
              {step === 1
                ? 'Join thousands enjoying fresh home-cooked meals.'
                : "Pick the role that best describes how you'll use the platform."}
            </p>
          </div>

          {/* Step pills */}
          <div className="flex items-center gap-2 mb-5">
            {(['Your Details', 'Your Role'] as const).map((label, i) => {
              const idx = i + 1
              const done = step > idx
              const active = step === idx
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 text-[11px] font-semibold
                    ${active ? 'bg-orange-500/18 border border-orange-400/35 text-orange-300'
                    : done ? 'bg-emerald-500/12 border border-emerald-400/28 text-emerald-400'
                    : 'bg-white/[0.03] border border-white/[0.07] text-white/22'}`}
                  >
                    <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0
                      ${active ? 'bg-orange-500 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-white/8 text-white/28'}`}
                    >
                      {done
                        ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg>
                        : idx}
                    </span>
                    {label}
                  </div>
                  {i === 0 && <div className="w-5 h-px bg-white/8" />}
                </div>
              )
            })}
          </div>

          {/* ─── STEP 1 ─── */}
          {step === 1 && (
            <div className="space-y-3">

              {/* Avatar upload — optional */}
              <div>
                <label className="block text-[10.5px] font-semibold text-white/35 mb-2 tracking-[1.2px] uppercase">
                  Profile Photo <span className="text-white/18 normal-case tracking-normal font-light">· optional</span>
                </label>
                <AvatarUpload
                  preview={avatarPreview}
                  onChange={handleAvatarChange}
                  onRemove={handleAvatarRemove}
                />
              </div>

              {/* Thin divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Name */}
              <div>
                <label className="block text-[10.5px] font-semibold text-white/35 mb-1.5 tracking-[1.2px] uppercase">Full Name</label>
                <div className="relative">
                  <InputIcon>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </InputIcon>
                  <input
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/85 placeholder-white/18 text-[13.5px] font-light outline-none transition-all duration-200 focus:bg-white/[0.07] focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.07)] hover:border-white/14"
                    {...register('name', { required: 'Name is required' })}
                  />
                </div>
                <FieldError message={errors.name?.message} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10.5px] font-semibold text-white/35 mb-1.5 tracking-[1.2px] uppercase">Email Address</label>
                <div className="relative">
                  <InputIcon>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </InputIcon>
                  <input
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/85 placeholder-white/18 text-[13.5px] font-light outline-none transition-all duration-200 focus:bg-white/[0.07] focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.07)] hover:border-white/14"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                    })}
                  />
                </div>
                <FieldError message={errors.email?.message} />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10.5px] font-semibold text-white/35 mb-1.5 tracking-[1.2px] uppercase">Password</label>
                <div className="relative">
                  <InputIcon>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </InputIcon>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/85 placeholder-white/18 text-[13.5px] font-light outline-none transition-all duration-200 focus:bg-white/[0.07] focus:border-orange-400/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.07)] hover:border-white/14"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/22 hover:text-white/50 transition-colors duration-200"
                  >
                    {showPassword
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
                <FieldError message={errors.password?.message} />
              </div>

              {/* Continue */}
              <button
                type="button"
                onClick={handleNextStep}
                className="relative w-full py-3.5 mt-1 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[13px] font-semibold tracking-[1px] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(234,88,12,0.42)] hover:-translate-y-px active:translate-y-0 cursor-pointer group"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </button>
            </div>
          )}

          {/* ─── STEP 2 ─── */}
          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {roles.map((role) => {
                const isSelected = selectedRole === role.value
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group overflow-hidden
                      ${isSelected
                        ? 'bg-orange-500/10 border-orange-400/40 shadow-[0_0_0_1px_rgba(249,115,22,0.18),0_4px_20px_rgba(234,88,12,0.10)]'
                        : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.055] hover:border-white/[0.12]'}`}
                  >
                    {isSelected && (
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(249,115,22,0.07),transparent_60%)]" />
                    )}
                    <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-200
                      ${isSelected ? 'bg-orange-500/18 text-orange-400 border border-orange-400/28' : 'bg-white/[0.045] text-white/28 border border-white/[0.07] group-hover:text-white/42'}`}
                    >
                      {role.icon}
                    </div>
                    <div className="relative z-10 flex-1 min-w-0">
                      <p className={`text-[13.5px] font-semibold leading-tight transition-colors duration-200 ${isSelected ? 'text-orange-300' : 'text-white/68'}`}>
                        {role.label}
                      </p>
                      <p className={`text-[11.5px] font-light mt-0.5 leading-snug transition-colors duration-200 ${isSelected ? 'text-white/42' : 'text-white/26'}`}>
                        {role.tagline}
                      </p>
                      {isSelected && (
                        <div className="flex flex-wrap gap-x-3 gap-y-0 mt-1.5">
                          {role.perks.map((perk) => (
                            <span key={perk} className="flex items-center gap-1 text-[10.5px] text-orange-300/55 font-light">
                              <span className="w-1 h-1 rounded-full bg-orange-400/45 shrink-0" />
                              {perk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`relative z-10 w-5 h-5 rounded-full shrink-0 flex items-center justify-center border-2 transition-all duration-200
                      ${isSelected ? 'border-orange-400 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.35)]' : 'border-white/14 bg-transparent group-hover:border-white/22'}`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                )
              })}

              {/* API Error */}
              {error && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/8 border border-red-400/18">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" className="shrink-0">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-red-400/88 text-[12px] font-light">{error}</p>
                </div>
              )}

              {/* Back + Submit */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/42 text-[13px] hover:bg-white/[0.07] hover:text-white/65 hover:border-white/[0.14] transition-all duration-200 cursor-pointer shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex-1 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[13px] font-semibold tracking-[1px] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(234,88,12,0.42)] hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading
                      ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating…</>
                      : <>Create Account <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-white/18 tracking-[2px] uppercase">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <p className="text-center text-[13px] text-white/32 font-light">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-amber-400/75 font-semibold hover:text-amber-400 transition-colors duration-200 underline underline-offset-2 decoration-amber-400/25 hover:decoration-amber-400/60"
              >
                Sign in
              </Link>
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/7 border border-emerald-400/13">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[10.5px] text-emerald-400/55 font-light tracking-wide">
                  Fresh & home-cooked, delivered daily
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}