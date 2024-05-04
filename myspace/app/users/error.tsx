'use client'

import { useEffect } from 'react';

interface ErrorProps { 
  error: Error, 
  reset: () => void 
}

export default function Error({ error, reset}: ErrorProps){
  useEffect(() => {
    console.error(error)
  }, [error]);

  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={reset}>Try again</button>
    </div>
  )
}