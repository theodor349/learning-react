import React from 'react'
import Child from './Child'
import { useState } from 'react'


function Parent() {
  var [count, setCount] = useState(0)
  
  function onClick(value) {
    setCount(count + value)
  }

  return (
    <>
      <div>Parent</div>
      <p>{count}</p>
      <Child onClick={onClick} />
    </>
  )
}

export default Parent