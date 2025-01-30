import React from 'react'

function SectionTitle({
    title,
}) {
  return (
    <>
    <div className='flex items-center gap-6 py-10 sm:py-16'>
    <h1 className=' text-3xl text-secondary font-semibold'>{title}</h1>
    <div className=' w-40 h-[1px] bg-tertiry '>

    </div>
    </div>
    </>
  )
}

export default SectionTitle