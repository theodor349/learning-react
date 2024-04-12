import React from 'react'
import { useContext } from 'react'
import { CountContext } from '../contexts/CountContext'

const Buttom = () => {
  const {count, setCount} = useContext(CountContext)
  return (
    <>
      <div>Buttom</div>
      <p>Value: {count}</p>
      <button onClick={() => setCount(count + 2)}>Increment</button>
    </>
  )
}

export default Buttom