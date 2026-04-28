'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '@/api/auth/auth'

export default function Authenticate() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe() as any)
  }, [dispatch])

  return null
}