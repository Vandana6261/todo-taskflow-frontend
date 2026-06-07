import React from 'react'
// import preview from '../data/preview'

function Preview() {
  return (
    <div className="flex-1 grid grid-cols-3 gap-4">
        {preview.map(item => (
            <div key={item.id} className="bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-100 h-full overflow-hidden">
                <img src={item.path} />
            </div>
        ))}
    </div>
  )
}

export default Preview