'use client'

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

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { loading, error } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: { role: 'USER' },
  })

  const onSubmit = async (data: SignupForm) => {
    const res: any = await dispatch(signupUser(data))
    if (res.meta.requestStatus === 'fulfilled') {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-orange-500">GharKaDabba</span>
          <p className="text-sm text-gray-400 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 transition-colors"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 transition-colors"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 transition-colors"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-400 transition-colors bg-white"
              {...register('role')}
            >
              <option value="USER">User</option>
              <option value="SELLER">Seller</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}