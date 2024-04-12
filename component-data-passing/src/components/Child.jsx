import React from 'react'
import { useState } from 'react'

function Child({onClick}) {
  const [value, setValue] = useState(1)
  return (
    <>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increase Value</button>
      <button onClick={(e) => onClick(value)}>Increase Count</button>
    </>
  )
}

export default Child