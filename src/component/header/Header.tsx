import React from 'react'

export default function Header() {
  return (
    <div className='w-full flex justify-between items-center '>
        <div>
            <h1 className='text-2xl font-extrabold'>Good morning!</h1>
        <p className='text-[#475467]'>You got some task to do. </p>
        </div>
        
        <button className='p-3 px-6 border-2 rounded-lg bg-[#3F5BF6] text-white'>Create New Task</button>
    </div>
  )
}
