'use client'
import { increment } from '@/features/counter/counterSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const {value}=useSelector((state:any)=>state.counter);
    const dispatch = useDispatch();
    const handleIncreament = ()=>{
        dispatch(increment());
    }
  return (
    <div>
      <div>
        <p> {value}</p>
        <button onClick={handleIncreament}>+</button>
        <button>-</button>
      </div>
    </div>
  )
}

export default page
