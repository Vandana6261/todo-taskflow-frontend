import React, { useState } from 'react'

function DragTest() {
    const [one, setOne] = useState(["a","b","c","d"]);
    const [two, setTwo] = useState([1,2,3,4])
  return (
    <>
    {one.map(item => (
      <div
        draggable={true}
        onDragStart={e => {
            console.log('onDragStart')
            e.dataTransfer.setData("item", item)
        }}
        onDragEnd={e => {
            console.log('onDragEnd')
            // setOne(prev => prev.filter(data => data !== item))
        }}
        className='w-10 h-10 border-2 m-2'
      >
        <p>{item}</p>
      </div>
    ))}

      {two.map(item => (
        <div
            onDragEnter={e => console.log('onDragEnter')}
            onDragLeave={e => console.log('onDragLeave')}
            onDragOver={e => {
                e.preventDefault();
                console.log('onDrageOver')
            }}
            // onDrop={e => console.log('onDrop')}
            className='w-10 h-10 border-2 m-2'
            onDrop={ e => {
                e.preventDefault();
                console.log("onDrop")
                setTwo(prev => [...prev, e.dataTransfer.getData("item")])
                console.log(e.dataTransfer.getData("item"))
                setOne(prev => prev.filter(data => data !== e.dataTransfer.getData("item")))
            }}
        >
                <p>{item}</p>
            
        </div>
      ))}
    </>
  )
}

export default DragTest
