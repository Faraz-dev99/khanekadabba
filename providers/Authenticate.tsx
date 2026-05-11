'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '@/api/auth/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'

export default function Authenticate() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            dispatch(getMe())
        }
    }, [user,router])

    return null
}