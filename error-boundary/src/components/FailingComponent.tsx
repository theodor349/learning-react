import React from 'react'
import { useState } from 'react';

type Props = {}
const list: number[] = []

function FailingComponent({}: Props) {
  const [fail, setFail] = useState(false)

  console.log(list[1]);
  if(fail)
    throw new Error('Failed');
  return (
    <>
      <div>FailingComponent</div>
      <div>{list[1] * 2}</div>
      <button onClick={() => setFail(true)}>Failed</button>
    </>
  )
}

export default FailingComponent