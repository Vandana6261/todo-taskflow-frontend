import React from 'react'

function UniLoader({text="loading..."}) {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className="w-10 h-10 border-4 border-gray/30 border-t-button rounded-full animate-spin"></div>
            <span className="mt-4 text-xs font-semibold tracking-wider uppercase text-muted">{text}</span>
    </div>
  )
}

export default UniLoader