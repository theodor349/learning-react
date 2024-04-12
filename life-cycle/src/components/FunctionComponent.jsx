import React from 'react'
import { useState, useEffect } from 'react'

const FunctionComponent = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('FunctionComponent did update')
  });

  useEffect(() => {
    console.log('FunctionComponent did mount')
    return () => {
      console.log('FunctionComponent will unmount')
    }
  }, [count])

  return (
    <>
      <div>FunctionComponent</div>
      <button onClick={() => setCount(count + 1)}>Button</button>
    </>
  )
}

export default FunctionComponent
