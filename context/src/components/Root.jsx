import React from 'react'
import Middle from './Middle'
import { useState } from 'react'
import { CountContext } from '../contexts/CountContext'

const Root = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <CountContext.Provider value={{count, setCount}}>
        <div>Root</div>
        <Middle/>
      </CountContext.Provider>
    </>
  )
}

export default Root