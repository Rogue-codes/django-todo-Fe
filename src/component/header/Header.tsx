import React from 'react'

interface IHeader{
  setShowCreatetaskModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Header({setShowCreatetaskModal}:IHeader) {
  return (
    <div className='w-full flex justify-between items-center '>
        <div>
            <h1 className='text-2xl font-extrabold'>Good morning!</h1>
        <p className='text-[#475467]'>You got some task to do. </p>
        </div>
        
        <button className='p-3 px-6 border-2 cursor-pointer rounded-lg bg-[#3F5BF6] text-white' onClick={()=>setShowCreatetaskModal(true)}>Create New Task</button>
    </div>
  )
}
